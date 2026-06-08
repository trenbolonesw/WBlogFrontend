import {  InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import styles from './Input.module.css'

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
export function Input({register,error,type,placeHolder}:InputProps){
    
  
    
    
          return(
            <>
          <input placeholder={placeHolder} type={type} className={styles.input} {...register} />
         {error && <p className={styles.error}>{error}</p>}
          </>
    )
    
   
}

export function TextArea({placeHolder,error,register,rows}:TextArea){
      return (
        <>
        <textarea rows={rows} className={styles.textarea} placeholder={placeHolder} {...register}/>
        {error && <p className={styles.error}>{error}</p>}
        </>
      )
}