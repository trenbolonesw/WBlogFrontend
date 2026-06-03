import {  InputHTMLAttributes, TextareaHTMLAttributes } from "react"

 interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder:string,
   error:string|undefined,
   register:Object
    
}
interface TextArea extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  placeHolder:string,
 register:Object,  
error:string|undefined
}
export function Input({className,register,error,type,placeHolder}:InputProps){
    
  
    
    
          return(
            <>
          <input placeholder={placeHolder} type={type} className={className} {...register} />
         {error && <p>{error}</p>}
          </>
    )
    
   
}

export function TextArea({className,placeHolder,error,register,rows}:TextArea){
      return (
        <>
        <textarea rows={rows} className={className} placeholder={placeHolder} {...register}/>
        {error && <p>{error}</p>}
        </>
      )
}