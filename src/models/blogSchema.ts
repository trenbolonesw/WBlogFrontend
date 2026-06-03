import {z} from 'zod'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const BlogSchema = z.object({
    title:z.string().trim().min(2,{message:'title must have 5 or more characters'}),
    image:z.instanceof(Blob,{message:'Please Select a Valid Image'})
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .nullable()
    ,
     imageDescription:z.string().min(2,{message:'image description must have 5 or more characters'}),
     article:z.string().min(150,{message:'article must have 150 characters or more'}),
     category:z.string().trim().min(1,{message:'category must be filled'})
})

