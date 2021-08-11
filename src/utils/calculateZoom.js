import { clamp } from 'lodash';

const calculateZoom = (
  viewBox,
  wheelVal,
  cursorX,
  cursorY,
  maxWidth,
  maxHeight
) => {
  const newWidth = clamp(viewBox.width + wheelVal, 100, maxWidth);
  const newHeight = clamp(viewBox.height + wheelVal, 100, maxHeight);

  if (newWidth === viewBox.width || newHeight === viewBox.height) {
    return viewBox; // no more zoom, dun change the viewbox
  }

  let deltaX = cursorX - viewBox.x; // calculate the actual distance between the cursor and edge
  let deltaY = cursorY - viewBox.y;
  deltaX = (deltaX / newWidth) * wheelVal; // calculate the amount of X / Y movement
  deltaY = (deltaY / newHeight) * wheelVal;
  const newX = clamp(viewBox.x - deltaX, -1, maxWidth - newWidth);
  const newY = clamp(viewBox.y - deltaY, -1, maxHeight - newHeight);
  return ({
    ...viewBox,
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY
  });
};

export default calculateZoom;
