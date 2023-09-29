import z from 'zod'

const IMAGE_TYPES = ['image/jpeg', 'image/png']

export const schema = z.object({
  name: z.string().min(1, 'required'),
  username: z.string().min(8, 'please enter at least 8 characters'),
  bio: z.string().optional().nullable(),
  profileImage: z
    .custom<File>()
    .optional()
    .nullable()
    .refine((file) => file == null || (file instanceof File && file.size < 500000), 'file size is max 5MB')
    .refine(
      (file) => file == null || (file instanceof File && IMAGE_TYPES.includes(file.type)),
      'Only JPEG or PNG allowed',
    ),
  coverImage: z
    .custom<File>()
    .optional()
    .nullable()
    .refine((file) => file == null || (file instanceof File && file.size < 500000), 'file size is max 5MB')
    .refine(
      (file) => file == null || (file instanceof File && IMAGE_TYPES.includes(file.type)),
      'Only JPEG or PNG allowed',
    ),
})

export type EditProfileForm = z.infer<typeof schema>
