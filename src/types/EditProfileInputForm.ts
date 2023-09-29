import z from 'zod'

export const schema = z.object({
  name: z.string().min(1, 'required'),
  username: z.string().min(8, 'please enter at least 8 characters'),
  bio: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
})

export type EditProfileForm = z.infer<typeof schema>
