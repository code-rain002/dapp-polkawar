import React, { Component, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function GallerySLider() {
  const [width, setWidth] = useState(100);

  return (
    <Carousel showThumbs={true} thumbWidth={width} dynamicHeight={false}>
      <div>
        <img src="https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png" />
      </div>
      <div>
        <img src="https://eskipaper.com/images/sword-pictures-1.jpg" />
      </div>
      <div>
        <img src="https://www.transparentpng.com/thumb/sword/ItXk4y-sword-transparent.png" />
      </div>
    </Carousel>
  );
}
