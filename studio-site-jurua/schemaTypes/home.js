import { defineField, defineType } from 'sanity'

export const home = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
        defineField({
            name: 'bannerVerde',
            title: 'banner verde',
            type: 'array',
            description: 'Esse campo deve ter duas imagens',
            of: [{type: 'image'}],
            validation: rule => rule.min(2).max(2),
        }),
        defineField({
            name: 'bannerMarrom',
            title: 'banner marrom',
            type: 'array',
            description: 'Esse campo deve ter três imagens',
            of: [{type: 'image'}],
            validation: rule => rule.min(3).max(3),
        }),
    ],
})