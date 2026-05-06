export default function EditorButton({src,title,classname,onclick}){
    return(
        <button 
        type="button"
        title={title}
        className={classname}
        onClick={onclick}
        ><img src={src} height={20}/></button>
    )
}