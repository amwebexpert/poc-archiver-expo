import { writeFileSync } from 'node:fs'
import packageMetadata from '../package.json' with { type: 'json' }

const constantsFilename = './src/constants.ts'
const { name, description, version, author, repository } = packageMetadata
const date = new Date().toISOString().split('T')[0]
const data = `/* eslint-disable */
// ----------------------------------------------------------------------------------------
// Do not edit this file, it is auto-generated by scripts/generate-version.js
// ----------------------------------------------------------------------------------------
export const APP_VERSION_INFO = Object.freeze({
  NAME: '${name}',
  DISPLAY_NAME: 'ExpoPOC',
  DESCRIPTION: '${description}',
  REPOSITORY: '${repository}',
  AUTHOR: '${author}',
  VERSION: '${version}',
  VERSION_DATE: '${date}',
})

export const LONG_VERSION_DATE = '${version} (${date})'
`

const main = () => {
  console.info('\t[Version generator script]')

  try {
    console.info(`\t- writing file "${constantsFilename}"...`, version)
    writeFileSync(constantsFilename, data, { encoding: 'utf8' })
    console.info(`\t- file "${constantsFilename}" written successfully.`)
  } catch (err) {
    console.error(`\t- error while writing file "${constantsFilename}": ${err.message}`, err)
  }
}

main()
