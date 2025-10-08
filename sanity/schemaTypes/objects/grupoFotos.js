import { defineType, defineField } from 'sanity'

export const grupoFotos = defineType({
  name: 'grupoFotos',
  title: 'Grupo de Fotos',
  type: 'object',
  fields: [
    defineField({
      name: 'fotos',
      title: 'Fotos (até 6 imagens)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição das Fotos',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
