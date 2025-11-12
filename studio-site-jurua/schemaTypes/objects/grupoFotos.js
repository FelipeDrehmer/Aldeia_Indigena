import { defineType, defineField } from 'sanity'

export const grupoFotos = defineType({
  name: 'grupoFotos',
  title: 'Grupo de Mídias',
  type: 'object',
  fields: [
    defineField({
      name: 'midias',
      title: 'Mídias (até 6 arquivos)',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Imagem',
          options: { hotspot: true },
        },
        {
          type: 'file',
          title: 'Vídeo (upload)',
          options: { accept: 'video/*' },
        },
        {
          type: 'object',
          title: 'Vídeo (URL)',
          fields: [
            defineField({
              name: 'url',
              title: 'URL do vídeo',
              type: 'url',
              validation: (rule) => rule.uri({
                scheme: ['http', 'https'],
              }),
            }),
            defineField({
              name: 'plataforma',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'Outros', value: 'outros' },
                ],
              },
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição das Mídias',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
