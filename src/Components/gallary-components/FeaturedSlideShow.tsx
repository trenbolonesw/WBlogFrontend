import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Gallary } from "../../Types/Blog-Data-types";
import XLGallaryCard from "./XLGallaryCard";
import {Captions,Download, Fullscreen,Zoom,Thumbnails} from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import './slideshow.css'
import Images from "../../Mainpages/Image-Gallary/Images";
import { Link } from "react-router-dom";
import NewestWrapper from "../shared/components/UIElements/Newest-Wrapper";
type Props = {
  items: Gallary[];
  title: string;
  url:string;
};

export default function FeaturedSlideShow({ items, url }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!items || items.length === 0) return null;

  const featured = items[0];
  const rest = items.slice(1);

  const slides = items.map((item) => ({
    src: item.Image ?? "",
    title: item.title,
   description:item.category
  }));

  function openLightbox(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <NewestWrapper title="Newest Gallary" items={items} url={url} renderLeft={() => <XLGallaryCard onClick={()=> openLightbox(0)} Gallary={featured} />}>
     {() => 
     <>
         <Lightbox plugins={[Captions,Download,Fullscreen,Zoom,Thumbnails]} captions={{
                        showToggle:true,
                        descriptionTextAlign:'end'
                    }} open={open} slides={slides} close={() => setOpen(false)}
                  index={index}
                    />
                    <Images gallary={rest} onclick={(index) => openLightbox(index +1)}/>
                </>
                  }          

    </NewestWrapper>
  );
}