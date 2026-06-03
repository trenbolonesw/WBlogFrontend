import { ButtonProps } from "../../../../Types/shared-types"

export default function Button({ title,cssClass,children,...rest}:ButtonProps){
   

    return(
        <button className={cssClass} {...rest}>
            {children}
            </button>
    )
}