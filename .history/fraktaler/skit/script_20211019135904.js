const container = document.querySelector('.container');
const image = document.querySelector('.image');
const speed = 0.5;
let size = { 
  w: image.offsetWidth, 
  h: image.offsetHeight 
};
let pos = { x: 0, y: 0 };
let target = { x: 0, y: 0 };
let pointer = { x: 0, y: 0 };
let scale = 1;

window.addEventListener('wheel', event => {
  event.preventDefault();
  
  pointer.x = event.pageX - container.offsetLeft;
  pointer.y = event.pageY - container.offsetTop;
  target.x = (pointer.x - pos.x) / scale;
  target.y = (pointer.y - pos.y) / scale;
 
  scale += -1 * Math.max(-1, Math.min(1, event.deltaY)) * speed * scale;
  
  // Uncomment to constrain scale
  // const max_scale = 4;
  // const min_scale = 1;
  // scale = Math.max(min_scale, Math.min(max_scale, scale));

  pos.x = -target.x * scale + pointer.x;
  pos.y = -target.y * scale + pointer.y;

  // Uncomment for keeping the image within area (works with min scale = 1)
  // if (pos.x > 0) pos.x = 0;
  // if (pos.x + size.w * scale < size.w) pos.x = -size.w * (scale - 1);
  // if (pos.y > 0) pos.y = 0;
  // if (pos.y + size.h * scale < size.h) pos.y = -size.h * (scale - 1);

  image.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale},${scale})`;
}, { passive: false });