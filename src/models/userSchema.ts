import {z} from 'zod'


const userSchema = z.object({
    name:z.string().trim().min(2,{message:'title must have 5 or more characters'}),
     userName:z.string().trim().min(5,{message:'username must have 5 or more characters'}),
     email:z.email().trim().toLowerCase(),
     article:z.string().min(150,{message:'article must have 150 characters or more'})
})

export default userSchema