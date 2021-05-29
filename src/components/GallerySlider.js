import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imageBaseUrl from './../actions/imageBaseUrl';
export default function GallerySLider({ gallery }) {
  const [width, setWidth] = useState(60);

  return (
    <div style={{ padding: 10 }}>
      <Carousel showThumbs={true} width={'98%'} thumbWidth={width} dynamicHeight={false}>
        {gallery.map((singleSlide) => {
          return (
            <div>
              <img alt="galley1" src={`${imageBaseUrl}/${singleSlide}`} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
