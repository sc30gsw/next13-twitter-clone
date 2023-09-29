import z from 'zod'

export const schema = z.object({
  body: z.string().min(1, 'required'),
})

export type PostInputForm = z.infer<typeof schema>
