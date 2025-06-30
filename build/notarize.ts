import { notarize } from '@electron/notarize'
import type { AfterPackContext } from 'electron-builder'

export default async function notarizeApp(context: AfterPackContext): Promise<void> {
  const { electronPlatformName, appOutDir } = context

  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = context.packager.appInfo.productFilename
  const appPath = `${appOutDir}/${appName}.app`

  // Check if we have the required environment variables for notarizing
  const appleId = process.env.APPLE_ID
  const appleIdPassword = process.env.APPLE_ID_PASSWORD
  const teamId = process.env.APPLE_TEAM_ID

  if (!appleId || !appleIdPassword || !teamId) {
    console.log('Skipping notarization: APPLE_ID, APPLE_ID_PASSWORD, or APPLE_TEAM_ID not set')
    return
  }

  console.log(`Notarizing ${appPath}...`)

  try {
    await notarize({
      appBundleId: context.packager.appInfo.id,
      appPath,
      appleId,
      appleIdPassword,
      teamId,
    })
    console.log('Notarization completed successfully!')
  } catch (error) {
    console.error('Notarization failed:', error)
    // Don't throw error to prevent build failure if notarization fails
  }
}
