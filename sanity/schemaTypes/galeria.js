import { defineType, defineField } from 'sanity'

export const galeria = defineType({
  name: 'galeria',
  title: 'Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'tituloGeral',
      title: 'Título Geral',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fotoGeral',
      title: 'Foto Geral',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'textoGeral',
      title: 'Texto Geral',
      type: 'text',
    }),
    defineField({
      name: 'cards',
      title: 'Cards (3 itens)',
      type: 'array',
      of: [{ type: 'cardGaleria' }],
      validation: (rule) => rule.min(3).max(3),
    }),
    defineField({
      name: 'gruposDeFotos',
      title: 'Grupos de Fotos (repetíveis)',
      type: 'array',
      of: [{ type: 'grupoFotos' }],
      validation: (rule) => rule.min(1).max(3),
    }),
  ],
})
