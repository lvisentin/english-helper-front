'use client';

import { useEffect } from 'react';

function FacebookPixel() {
  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('971543387368976');
        ReactPixel.pageView();
        ReactPixel.track('ViewContent');
      });
  });

  return <></>;
}

export default FacebookPixel;
