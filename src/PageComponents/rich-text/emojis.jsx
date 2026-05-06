import './emoji-menu.css'

export default function EmojiList({editor,hide,classname}){

 

 return(
    <>
    <div className="emoji-menu">
         <button className={classname} onClick={() => editor.chain().focus().setEmoji('fire').run()} type='button'>🔥</button>
             <button  className={classname} onClick={() => editor.chain().focus().setEmoji('smile').run()} type='button'>😄</button>
              <button  className={classname} onClick={() => editor.chain().focus().setEmoji('laughing').run()} type='button'>😆</button>
             <button  className={classname} onClick={() => editor.chain().focus().setEmoji('sob').run()} type='button'>😭</button>
             <button  className={classname} onClick={() => editor.chain().focus().setEmoji('disappointed').run()} type='button'>😞</button>
                <button  className={classname} onClick={() => editor.chain().focus().setEmoji('smiley').run()} type='button'>😃</button>
                   <button className={classname} onClick={() => editor.chain().focus().setEmoji('disappointed_relieved').run()} type='button'>😥</button>
                     <button  className={classname} onClick={() => editor.chain().focus().setEmoji('thumbsup').run()} type='button'>👍</button>
                     <button  className={classname} type="button" onClick={() => hide(prev => !prev)}>hide</button>
    </div>
    </>
 )
}