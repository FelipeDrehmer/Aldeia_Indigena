import { defineType, defineField } from 'sanity'

export const blocoImagem = defineType({
  name: 'blocoImagem',
  title: 'Bloco de Imagem e Texto',
  type: 'object',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'descricao', title: 'Descrição', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
  ],
})
