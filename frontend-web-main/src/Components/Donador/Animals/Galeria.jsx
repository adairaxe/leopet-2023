import React from 'react';
import ImageGallery from 'react-image-gallery';

import './Historial.scss';

export const Galeria = ({ fotos }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <ImageGallery items={fotos} />
      </div>
    </div>
  );
};
