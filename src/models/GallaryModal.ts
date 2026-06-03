import {z} from 'zod'
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const GallarySchema = z.object({
    title:z.string().trim().min(5,{message:'Title must be at least 5 characters or more'}),
    image:z.instanceof(Blob,{message:'Please Select a Valid Image'})
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .nullable(),
    category:z.string().trim().min(2,{message:'category must be filled'})
})