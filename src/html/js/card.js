
function setCard(_x, _y) {

  const t = new PIXI.Graphics();
  t.interactive = true;
  t.click = data => test(data);

  t.beginFill(0xFFFFFF).lineStyle(2, 0x666633)
    .drawRoundedRect(0, 0, 260, 140, 15)
  .endFill();


  let x = 1 + 3 + 0 + 10;
  let y = 15;
  t.beginFill(0xFFFFFF).lineStyle(2, 0x33CC66)
    .moveTo(x + 35, y + 0)
    .lineTo(x + 0, y + 55)
    .lineTo(x + 35, y + 110)
    .lineTo(x + 70, y + 55)
  .endFill();


  x = 6 + 70 + 20;
  y = 15;
  t.beginFill(0x33CC66, 0.35).lineStyle(2, 0x33CC66)
    .moveTo(x + 35, y + 0)
    .lineTo(x + 0, y + 55)
    .lineTo(x + 35, y + 110)
    .lineTo(x + 70, y + 55)
  .endFill();


  x = 1 + 6 + 140 + 30;
  y = 15;
  t.beginFill(0x33CC66).lineStyle(2, 0x33CC66)
    .moveTo(x + 35, y + 0)
    .lineTo(x + 0, y + 55)
    .lineTo(x + 35, y + 110)
    .lineTo(x + 70, y + 55)
  .endFill();

  t.position.x = _x;
  t.position.y = _y;

  return t;
}