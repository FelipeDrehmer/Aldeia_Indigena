import { defineType, defineField } from 'sanity'

export const semanaCultural = defineType({
  name: 'semanaCultural',
  title: 'Semana da Cultura',
  type: 'document',
  fields: [
    defineField({
      name: 'tituloGeral',
      title: 'Título Geral',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descricaoGeral',
      title: 'Descrição Geral',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocos',
      title: 'Blocos de Imagem e Texto',
      type: 'array',
      of: [{ type: 'blocoImagem' }],
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
})
