import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageBaseUrl from "./../../actions/imageBaseUrl";

export default function GallerySLider({ gallery }) {
  let width = 60;
  const getWidth = () => {
    const width = window.innerWidth;
    console.log(width);
    if (width > 600) {
      return "70%";
    }
    return "98%";
  };

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ width: 600 }}>
        <Carousel
          showThumbs={true}
          width={getWidth()}
          thumbWidth={width}
          dynamicHeight={false}
        >
          {gallery.map((singleSlide) => {
            return (
              <div>
                <img alt="galley1" src={`${imageBaseUrl}/${singleSlide}`} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
