import { EditorProps } from "../../../../Types/shared-types"
import Button from "./Button"
export default function EditorButton({src,title,classname,onclick}:EditorProps){
    return(
        <Button 
        type="button"
        title={title}
        cssClass={classname}
         onClick={onclick}
        ><img src={src} height={20}/></Button>
    )
}