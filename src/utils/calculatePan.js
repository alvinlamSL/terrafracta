import { clamp } from 'lodash';

const calculatePan = (
  viewBox,
  deltaX,
  deltaY,
  maxWidth,
  maxHeight
) => {
  const newX = clamp(viewBox.x - deltaX, -1, maxWidth - viewBox.width);
  const newY = clamp(viewBox.y - deltaY, -1, maxHeight - viewBox.height);
  return ({
    ...viewBox,
    x: newX,
    y: newY
  });
};

export default calculatePan;
