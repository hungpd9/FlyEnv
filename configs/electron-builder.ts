import type { Configuration } from 'electron-builder'
import PublishConfig from './publish'
import AfterPack from '../build/afterPack'
// import Notarize from '../build/notarize'
/**
 * one environment
 * envlab
 * Devenvs
 * XDevenvs
 * DevEnvs
 * Onevns
 * DeployLab
 * One Environ
 */
const conf: Configuration = {
  productName: 'FlyEnv',
  executableName: 'FlyEnv',
  buildVersion: '4.9.12',
  electronVersion: '35.5.1',
  appId: 'phpstudy.xpfme.com',
  asar: true,
  directories: {
    output: 'release'
  },
  files: [
    'dist/electron/**/*',
    'dist/render/**/*',
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme,LICENSE}',
    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
    '!**/node_modules/*.d.ts',
    '!**/node_modules/.bin',
    '!**/node_modules/node-pty/build/node_gyp_bins',
    '!**/node_modules/nodejieba/dict'
  ],
  dmg: {
    sign: false,
    window: {
      width: 540,
      height: 380
    },
    contents: [
      {
        x: 410,
        y: 230,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 230,
        type: 'file'
      }
    ]
  },
  mac: {
    icon: 'build/Icon.icns',
    target: {
      target: 'default',
      // target: 'pkg',
      arch: ['x64', 'arm64'] // Build cho cả Intel và Apple Silicon
    },
    asarUnpack: ['**/*.node'],
    extendInfo: {
      'Icon file': 'icon.icns',
      CFBundleDisplayName: 'FlyEnv',
      CFBundleExecutable: 'PhpWebStudy'
    },
    type: 'development', // Đổi từ distribution sang development
    darkModeSupport: true,
    category: 'public.app-category.developer-tools',
    // Vô hiệu hóa các tính năng bảo mật cho bản build local
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist',
    hardenedRuntime: false, // Tắt hardened runtime
    gatekeeperAssess: false
  },
  afterPack: (...args) => {
    return AfterPack(...args) as any
  },
  // Tạm thời bỏ qua bước notarize cho bản build local
  // afterSign: (...args) => {
  //   return Notarize(...args)
  // },
  publish: [PublishConfig]
}

export default conf
