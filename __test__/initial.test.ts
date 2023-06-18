import 'dotenv/config'
import { Model } from 'objection'
import Knex from 'knex'
import { describe, expect, test, afterAll } from '@jest/globals';
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

describe('initial migration', () => {
  test('adds 1 + 2 to equal 3', async () => {
    const languageInstance = await Language.query().insertAndFetch({
      alias: 'asddtest',
      name: 'asdasdtest'
    })

    expect(languageInstance).toHaveProperty('alias', 'asddtest');
    expect(languageInstance).toHaveProperty('name', 'asdasdtest');
  });

});
