import {ButtonHTMLAttributes, ReactNode, MouseEventHandler} from 'react'

export interface pageProps{
 title?:string;
 children?:ReactNode
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    cssClass:string,
    children?:ReactNode,
    onClick?:MouseEventHandler
    
}

export interface EditorProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    classname:string,
    src:string,
    onclick:()=> void
}

export interface ImagePickerProps{
    image:Blob|null,
    setImage:React.Dispatch<React.SetStateAction<Blob|null>>
    error:string|null
}

export interface filteredData{
    Data:Array<any>,
    loading:boolean
}



export interface BlogItemProps{
 loading?:boolean
 
}

export type SplitLayoutProps<T> = {
  items: T[];
  renderFeature: (item: T) => React.ReactNode;
  renderSide: (items: T[]) => React.ReactNode;
};

