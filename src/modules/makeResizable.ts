import { drawState } from '@/modules/draw';

const makeResizable = (drawableElement: HTMLElement, i: number|undefined): void => {
  if (i === undefined) { return; }
  const drawable = drawState.drawables[i];

  const minimumSize = 20;
  const resizers = drawableElement.querySelectorAll('.resizer');

  let originalWidth: number;
  let originalHeight: number;
  let originalX: number;
  let originalY: number;
  let originalMouseX: number;
  let originalMouseY: number;

  let currentResizer: Element;

  const resize = (event: MouseEvent) => {
    const resizer = currentResizer;
    const classList = resizer.classList.value;
    if (classList.includes('top-left')) {
      const width = originalWidth - (event.pageX - originalMouseX);
      const height = originalHeight - (event.pageY - originalMouseY);
      if (width > minimumSize) {
        drawable.size.width = `${width}px`;
        drawable.position.x = `${originalX + (event.pageX - originalMouseX)}px`;
      }
      if (height > minimumSize) {
        drawable.size.height = `${height}px`;
        drawable.position.y = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('top-right')) {
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight - (event.pageY - originalMouseY);
      if (width > minimumSize) { drawable.size.width = `${width}px`; }
      if (height > minimumSize) {
        drawable.size.height = `${height}px`;
        drawable.position.y = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('bottom-left')) {
      const height = originalHeight + (event.pageY - originalMouseY);
      const width = originalWidth - (event.pageX - originalMouseX);
      if (height > minimumSize) { drawable.size.height = `${height}px`; }
      if (width > minimumSize) {
        drawable.size.width = `${width}px`;
        drawable.position.x = `${originalX + (event.pageX - originalMouseX)}px`;
      }
    } else { // bottom-right
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight + (event.pageY - originalMouseY);
      if (width > minimumSize) { drawable.size.width = `${width}px`; }
      if (height > minimumSize) { drawable.size.height = `${height}px`; }
    }
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', resize);
  };

  resizers.forEach((resizer: Element) => {
    resizer.addEventListener('mousedown', (event) => {
      currentResizer = resizer;
      event.preventDefault();
      originalWidth = drawableElement.offsetWidth;
      originalHeight = drawableElement.offsetHeight;
      originalX = drawableElement.getBoundingClientRect().left;
      originalY = drawableElement.getBoundingClientRect().top;
      originalMouseX = (event as MouseEvent).pageX;
      originalMouseY = (event as MouseEvent).pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
  });
};

export default makeResizable;
