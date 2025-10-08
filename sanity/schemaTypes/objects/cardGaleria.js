import { defineType, defineField } from 'sanity'

export const cardGaleria = defineType({
  name: 'cardGaleria',
  title: 'Card da Galeria',
  type: 'object',
  fields: [
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'descricao', title: 'Descrição', type: 'text', validation: (rule) => rule.required() }),
  ],
})
