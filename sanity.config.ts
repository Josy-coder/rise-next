import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'rise-next',

  projectId: 'gv4wwtz0',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
