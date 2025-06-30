import { join, resolve } from 'path'
import _fs from 'fs-extra'

const { mkdirp, writeFile, readFile, copy } = _fs

/**
 * Handle the app store node-pty Python library linking issue
 * @param {Object} pack - Pack object containing build information
 * @returns {Promise<boolean>}
 */
export default async function after(pack: any) {
  if (pack.arch === 1) {
    const fromBinDir = resolve(pack.appOutDir, '../../build/bin/x86')
    const toBinDir = join(pack.appOutDir, 'FlyEnv.app/Contents/Resources/helper/')
    await mkdirp(toBinDir)
    console.log('command: copying from', fromBinDir, 'to', toBinDir)
    await copy(fromBinDir, toBinDir)
  }
  // arm64
  else if (pack.arch === 3) {
    const fromBinDir = resolve(pack.appOutDir, '../../build/bin/arm')
    const toBinDir = join(pack.appOutDir, 'FlyEnv.app/Contents/Resources/helper/')
    await mkdirp(toBinDir)
    console.log('command: copying from', fromBinDir, 'to', toBinDir)
    await copy(fromBinDir, toBinDir)
  }

  let fromBinDir = resolve(pack.appOutDir, '../../build/plist')
  let toBinDir = join(pack.appOutDir, 'FlyEnv.app/Contents/Resources/plist/')
  await mkdirp(toBinDir)
  console.log('command: copying from', fromBinDir, 'to', toBinDir)
  await copy(fromBinDir, toBinDir)

  fromBinDir = resolve(pack.appOutDir, '../../dist/helper')
  toBinDir = join(pack.appOutDir, 'FlyEnv.app/Contents/Resources/helper/')
  await mkdirp(toBinDir)
  console.log('command: copying from', fromBinDir, 'to', toBinDir)
  await copy(fromBinDir, toBinDir)

  const shFile = join(pack.appOutDir, 'FlyEnv.app/Contents/Resources/helper/flyenv.sh')
  const tmplFile = resolve(pack.appOutDir, '../../static/sh/macOS/fly-env.sh')
  const content = await readFile(tmplFile, 'utf-8')
  await writeFile(shFile, content)

  console.log('afterPack handle end !!!!!!')
  return
}
