import './area.css'
import { EditorContent, useEditor } from '@tiptap/react'
import { useMemo } from 'react'
import Bold from '@tiptap/extension-bold'
import italic from '@tiptap/extension-italic'
import bulletlist from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import strikethrough from '@tiptap/extension-strike'
import Emoji, {  gitHubEmojis } from '@tiptap/extension-emoji'
import StarterKit from '@tiptap/starter-kit'
import EmojiList from './emojis'
import { useState } from 'react'
import bold from '../../assets/icons/bold.svg'
import it from '../../assets/icons/italic.svg'
import dbquotes from '../../assets/icons/double-quotes.svg'
import h1 from '../../assets/icons/h-1.svg'
import h2 from '../../assets/icons/h-2.svg'
import h3 from '../../assets/icons/h-3.svg'
import odlist from '../../assets/icons/list-ordered.svg'
import reset from '../../assets/icons/reset-left-line.svg'
import emojicon from '../../assets/icons/emoji.svg'
import strikeThrough from '../../assets/icons/strikethrough.svg'
import EditorButton from './editor-button'
import highLight from '../../assets/icons/mark-pen.svg'
export default function RichTextArea({onChange,className}){

   const [showEmofield,setShowEmofield] = useState(false)

 const editor = useEditor({
    extensions:[
      StarterKit,
      Bold,italic,
      bulletlist,
      Highlight,
      Document,
      Paragraph,
      Text,
      strikethrough,
      Emoji.configure({
         emojis:gitHubEmojis,
         enableEmoticons:true,
   
      }),
      Heading.configure({
         levels:[1,2,3],
      })
   
   ],
    onUpdate({ editor }) {
      const html = editor.getHTML()

      if (onChange) {
        onChange(html)
      }
   }
 })

 if(!editor){
   return null;
 }

    return(
        <>
        <div className={className}>
               <div className='editor-menu'>
                <EditorButton src={bold} title='bold' classname={ editor.isActive('bold') ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleBold().run()}/>
                <EditorButton src={it}  title='italic' classname={ editor.isActive('italic') ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleItalic().run()} />
              <EditorButton src={dbquotes} title='blockquote'  classname={ editor.isActive('blockquote') ? 'highlight':'editor-button'}  onclick={() => editor.chain().focus().toggleBlockquote().run()}/>
              <EditorButton src={odlist} title='ordered-list' classname={ editor.isActive('bulletList') ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleBulletList().run()}/> 
               <EditorButton src={h1} title="header 1" classname={ editor.isActive('heading',{level:1})  ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleHeading({level:1}).run()}/>
                 <EditorButton src={h2} title="header 2" classname={ editor.isActive('heading',{level:2})  ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleHeading({level:2}).run()}/>
              <EditorButton src={h3} title="header 3" classname={ editor.isActive('heading',{level:3})  ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleHeading({level:3}).run()}/>
              <EditorButton src={strikeThrough} title="strikethrough" classname={ editor.isActive('strike') ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleStrike().run()}/>
              <EditorButton src={highLight} title="highlight" classname={ editor.isActive('highlight') ? 'highlight':'editor-button'} onclick={() => editor.chain().focus().toggleHighlight().run()}/>

              <button className={`${showEmofield ? 'highlight': 'editor-button'}`} type='button' onClick={() => setShowEmofield(prev => !prev)}><img src={emojicon} height={20}/></button> 
              
       
          <button className='editor-button' type='button' onClick={() => editor.commands.clearContent()}><img src={reset} height={20}/></button>
          </div>
           {showEmofield && <EmojiList classname="emoji-button" hide={setShowEmofield} editor={editor}/> }
        <EditorContent   editor={editor} type='text'/>
     
      </div>
        </>
    )
}