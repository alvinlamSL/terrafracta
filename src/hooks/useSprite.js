import React, { useEffect, useState } from 'react';

const useSprite = () => {
  const [sprite, setSprite] = useState('');

  useEffect(() => {
    const loadSprite = async () => {
      const mSprite = await React.lazy(() => (
        import('src/sprites/tracks/enw.svg')
      ));
      setSprite(mSprite);
    };

    loadSprite();
  });

  return sprite;
};

export default useSprite;
