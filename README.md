# Migration service

Este módulo tiene como funcionalidad el control y registro de migraciones que se
originan para el servicio serverless (actualmente Supabase) para el SPA de control
de reglas.

## Contenido

1. [Ejecutar migraciones y seed desde línea de comandos](#cli)
2. [Recetas, a.k.a. ejemplos de cómo hago esto](#recetas)
3. [Desarrollo local](#desarrollo-local)
4. [Como hacer migraciones]()
5. [Problemas frecuentes](#troubleshooting)
   1. [Pnpm no funciona](#pnpm-not-found)
   2. [Wsl en Windos](#wsl-on-windows)
6. [Cosas por hacer](#roadmap)

## CLI

Esta basado en [Knex](https://knexjs.org/guide/migrations.html), lo que significa
que se hace uso del CLI de este mismo

## Recetas

Objection.js, aunque no esta instalado (aun), en su [web](https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html) tiene recetas muy interesantes para trabajar con Knex

## Desarrollo local

Para el entorno local, se crea autoaticamente una db en el root de este proyecto.
Esta db es en sqlite, solo para pruebas o incluso para mocking data

El uso de esta base local es principalmente para testear los cambios de las migraciones

Se sugiere usar algun cliente como DBeaver para observar los cambios en la base local.sqlite3

## Migraciones

El flujo normal involucra permitir que Knex cree el archivo de migración.
Esto se consigue con el siguiente comando

```bash
pnpm knex migrate:make mi_migracion -x ts
```

Cabe recalcar que se debe cambiar el nombre de mi_migracion por algo mas significativo

A continuación, Knex creará un archivo con un timestamp y el nombre dado

```yml
- src/
  - migrations/
  - 202306783434_mi_migracion.ts
```

Adentro de este archivo encontrarás algo como esto

```ts
import { Knex } from 'knex';

/* Esta función se ejecutará cuando la migración use este archivo
  para actualziar la DB
*/
export function up(knex: Knex.CreateTableBuilder) {}

/* Esta función se ejecutará cuando la migración use este archivo
  para hacer un roolback (volver hacia atrás)
*/
export function down(knex: Knex.CreateTableBuilder) {
  // por lo general aca se hacen las operaciones contrarias que en up
}
```

puedes personalziar el archivo acorde a la necesidad, como por ejemplo

```bash
pnpm knex migrate:make initial -x ts
```

```ts 341421_initial.ts
import { Knex } from 'knex';

export function up(knex: Knex.CreateTableBuilder) {
  return knex.schema.createTable('cats', (table) => {
    table.bigIncrements('id').notNullable().primary();
    table.text('name').notNullable();
  });
}

export function down(knex: Knex.CreateTableBuilder) {
  // por lo general aca se hacen las operaciones contrarias que en up
  return knex.schema.dropTable('cats');
}
```

## Troubleshooting

### Pnpm not found

Es muy probable que la causa sea

- No tienes instalado pnpm, mira como hacerlo [aquí](https://pnpm.io/installation)
- El ejecutable de pnpm esta siendo referenciado en el PATH

Esto último es poco probable (al menos en POSIX alike) ya que le script de instalación de pnpm
lo hace automáticamente, menos que

- El archivo de configuración de tu terminal no tiene accesos de escritura.
- Hayas instalando, luego de la instalación, otra terminal (Zsh por ejemplo) si estas usando un POSIX alike.

Si cambiaste de terminal post instalación de pnpm, entonces copia y pega
las configuraciones necesarias. Por ejemplo si te cambiaste de Bash a Zsh,
bastaría con revisar el archivo .bashrc (~/.bashrc, en el root de tu usuario),
este debe tener una o mas veces algo como

```bash
export PATH=:PATH...
```

Puedes copiar estos "export PATH" a tu archivo .zshrc (~/.zshrc)

### WSL on Windows

Un cliente instalado adentro del SO q se escogio para WSL, no tiene problemas para mostrar la info,
supongamos el cliente de sqlite3 para Ubuntu para nuestro ejemplo.

Sin embargo algunos prefieren el uso de un cliente con [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface)
como [DBeaver](https://dbeaver.io/) o un cliente basado en web como [Adminer](https://www.adminer.org/); en
estos casos, la instancia de WSl no tiene interfaz gráfica y dependemos enteramente de la comunicación
de WSL con el propio SO host de Windows que si puede correr estos clientes con GUI.

A continuacion detallamos algunas propuestas

#### Sqlite3

Una solución sencilla es crear un symbolic (soft) link del archivo sqlite3.

En WSL podemos usar el siguiente comando, tener mucho cuidado de reemplazar
NombreDeUsuario con el verdadero nombre de tu usario de Windows antes de ejecutar
el comando.

También se recomienda cambiar la dirección, para que no apunte al escritorio de Windows,
sino a alguna carpeta dedicada.

```bash
ln -s /mnt/c/Users/NombreDeUsuario/Desktop/local.sqlite3 ./local.sqlite3
```

De esta manera tendremos una db de sqlite3 en el escritorio (si no modificaste el path),
que puede ser fácilmente accedida desde un cliente como DBeaver el propio cliente
de sqlite3 disponible en su web.

#### Postgres, MySql, MariaDB, MSSQL

Se recomienda el uso de servicios dockerizados, que fácilmente pueden ser
expuestos a la red local del computador (localhost) y acceder desde cualquier cliente desde Windows,
ya que WSL comparte esta red con el host.

## Roadmap

- [x] Añadir eslint
- [x] Añadir prettier
- [ ] Añadir en el knexfile.ts la lectura de credenciales por medio de un .env
- [ ] Añadir dot env de ser necesario
- [ ] Añadir los templates para los issues y prs
- [ ] Añadir ojection.js como ORM
- [ ] Contemplar el uso de Koa para exponer ciertas funcionalidades
- [ ] Contemplar el uso jest o mocha + chai para tests aprovechando Objection.js
