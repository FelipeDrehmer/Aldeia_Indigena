import { defineType, defineField } from 'sanity'

export const dicionario = defineType({
  name: 'dicionario',
  title: 'Dicionário',
  type: 'document',
  fields: [
    defineField({
      name: 'entradas',
      title: 'Palavras do Dicionário',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          title: 'Palavra',
          fields: [
            defineField({ name: 'palavra', title: 'Palavra', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'significado', title: 'Significado', type: 'text', validation: (rule) => rule.required() }),
            defineField({ name: 'traducao', title: 'Tradução', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.max(20),
    }),
  ],
})
