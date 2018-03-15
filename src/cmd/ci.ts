import headless from '@pnpm/headless'
import createStoreController from '../createStoreController'
import {PnpmOptions} from '../types'

const DEFAULT_OPTS = {
  childConcurrency: 4,
  development: true,
  optional: true,
  production: true,
  ignoreScripts: false,
  independentLeaves: false,
  verifyStoreIntegrity: true,
  sideEffectsCache: false,
  sideEffectsCacheReadonly: false,
  force: false,
  unsafePerm: process.platform === 'win32' ||
    process.platform === 'cygwin' ||
    !(process.getuid && process.setuid &&
      process.getgid && process.setgid) ||
    process.getuid() !== 0,
}

export default async (input: string[], opts: PnpmOptions) => {
  const store = await createStoreController(opts)
  const headlessOpts = {
    ...DEFAULT_OPTS,
    ...opts,
    storePath: store.path,
    storeController: store.ctrl,
  }

  await headless(headlessOpts)
}
