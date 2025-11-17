import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gv4wwtz0',
    dataset: 'production'
  },
  deployment: {
    appId: 'qhgdnwc12oh33vxvn237akuu',
    autoUpdates: true,
  }
})
