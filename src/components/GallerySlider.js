import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function GallerySLider() {
  const [width, setWidth] = useState(100);

  return (
    <Carousel showThumbs={true} thumbWidth={width} dynamicHeight={false}>
      <div>
        <img alt="galley1" src="https://gateway.pinata.cloud/ipfs/QmeUVJwVRunLY1b7buTZu8iSB25U4to3fkPtSKUEoq1Fhn" />
      </div>
      <div>
        <img alt="galley2" src="https://gateway.pinata.cloud/ipfs/QmQJDRkUnmXU2ZLA9sV2uzYZ4aFxbB32jJM26XA3YPARXL" />
      </div>
      <div>
        <img alt="galley3" src="https://gateway.pinata.cloud/ipfs/QmYswvsFQDCSYaXssTHAGtpP7cDsWVo7Fwx94pfoi3Ruzv" />
      </div>
    </Carousel>
  );
}
