import {DOMAttributes} from 'react'

export interface Blog{
    _id:string,
    title:string,
    description:string,
    Image:string,
    imageDescription:string,
    article:DOMAttributes<HTMLParagraphElement>
    created_at:Date,
    category:string
}

export interface Gallary{
    _id?:string,
    title:string,
    Image:string|undefined,
     created_at:Date,
    category:string
}