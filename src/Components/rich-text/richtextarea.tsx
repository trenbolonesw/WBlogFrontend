import './area.css'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import EditorButton from '../shared/components/FormElements/EditorButton'
import Button from '../shared/components/FormElements/Button'

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
import bold from '../../assets/richText-icons/bold.svg'
import it from '../../assets/richText-icons/italic.svg'
import dbquotes from '../../assets/richText-icons/double-quotes.svg'
import h1 from '../../assets/richText-icons/h-1.svg'
import h2 from '../../assets/richText-icons/h-2.svg'
import h3 from '../../assets/richText-icons/h-3.svg'
import odlist from '../../assets/richText-icons/list-ordered.svg'
import reset from '../../assets/richText-icons/reset-left-line.svg'
import emojicon from '../../assets/richText-icons/emoji.svg'
import strikeThrough from '../../assets/richText-icons/strikethrough.svg'
import highLight from '../../assets/richText-icons/mark-pen.svg'

type RichText = {
  onChange:() => void,
  className:string,
  content:string
}

export default function RichTextArea({onChange,className,content}:RichText){

   const [showEmofield,setShowEmofield] = useState(false)

 const editor = useEditor({
  content,
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
   const cleanHtml = html === '<p></p>' ? '' : html
      if (onChange) {
        onChange(cleanHtml)
      }
   }
 })

 useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  if (!editor) {
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

              <Button cssClass={`${showEmofield ? 'highlight': 'editor-button'}`} type='button' onClick={() => setShowEmofield(prev => !prev)}><img src={emojicon} height={20}/></Button> 
              
       
          <Button cssClass='editor-button' type='button' onClick={() => editor.commands.clearContent()}><img src={reset} height={20}/></Button>
          </div>
           {showEmofield && <EmojiList classname="emoji-button" hide={setShowEmofield} editor={editor}/> }
        <EditorContent   editor={editor} type='text'/>
     
      </div>
        </>
    )
}