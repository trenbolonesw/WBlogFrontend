import {z} from 'zod'
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const userSchema = z.object({

   email: z.string().email({ message: "must be a valid email" }),
     password:z.string().trim().min(2,{message:'this field must be filled out!'})
})


export const SignInSchema = z.object({
  userName:z.string().trim().min(5,{message:'must have at least 5 or more characters!'}),
    email: z.string().email({ message: "must be a valid email" }),
     password:z.string().trim().min(2,{message:'this field must be filled out!'}),
     image: z.instanceof(Blob,{message:'Please Select a Valid Image'})
         .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
         "Only .jpg, .jpeg, .png and .webp formats are supported.")
         .nullable()
})

export default userSchema
