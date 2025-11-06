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
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'localEvento',
      title: 'Local do Evento',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'dataInicio',
      title: 'Data de Início',
      type: 'date',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'dataFinal',
      title: 'Data de Término',
      type: 'date',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'horarioInicio',
      title: 'Horário de Início',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { name: 'HH:mm' }),
      description: 'Informe no formato HH:mm (ex: 08:30)',
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
