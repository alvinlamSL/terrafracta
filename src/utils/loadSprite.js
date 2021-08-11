const loadSprite = (spriteType, spriteName) => {
  const sprite = React.lazy(() => import(`src/sprites/${spriteType}/${spriteName}`));
  return sprite;
}