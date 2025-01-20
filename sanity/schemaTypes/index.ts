import { type SchemaTypeDefinition } from 'sanity'
import { authorSchema } from './authorSchema'
import { startupSchema } from './startupSchema'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorSchema , startupSchema],
}
