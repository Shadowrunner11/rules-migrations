import 'dotenv/config'

/**
 * Tries to get an environment variable value by its name, if it does not exists,
 * throws error
 *
 * @param envName environment variable name
 */
export function getOrThrow(envName: string){
  const data = process.env[envName]

  if(!data)
    throw ReferenceError('not found')

  return data
}
