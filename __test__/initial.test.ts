import 'dotenv/config'
import { Model } from 'objection'
import Knex from 'knex'
import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { Language } from '../src/data/models/Language';
import config from '../knexfile'

const knexConfig = config[process.env.NODE_ENV_TEST ?? 'development'] ?? config.development
const KenexInstance = Knex(knexConfig)
Model.knex(KenexInstance)

afterAll(done =>{
  KenexInstance.destroy()
    .then(()=>done())
    .catch(()=>done())
})

beforeAll(async ()=>{
  await KenexInstance.migrate.up()
})

describe('initial migration', () => {
  test('inserting language data', async () => {
    const insertMockData = {
      alias: faker.system.commonFileExt(),
      name: faker.system.commonFileType()
    }
    const languageInstance = await Language.query().insertAndFetch(insertMockData)

    expect(languageInstance).toHaveProperty('alias', insertMockData.alias);
    expect(languageInstance).toHaveProperty('name', insertMockData.name);


    await Language.query().deleteById(languageInstance.$id())
  });

});
