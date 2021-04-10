const makeResizable = (drawable: HTMLElement): void => {
  const minimumSize = 20;
  const resizers = drawable.querySelectorAll('.resizer');

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
        drawable.style.width = `${width}px`;
        drawable.style.left = `${originalX + (event.pageX - originalMouseX)}px`;
      }
      if (height > minimumSize) {
        drawable.style.height = `${height}px`;
        drawable.style.top = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('top-right')) {
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight - (event.pageY - originalMouseY);
      if (width > minimumSize) { drawable.style.width = `${width}px`; }
      if (height > minimumSize) {
        drawable.style.height = `${height}px`;
        drawable.style.top = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('bottom-left')) {
      const height = originalHeight + (event.pageY - originalMouseY);
      const width = originalWidth - (event.pageX - originalMouseX);
      if (height > minimumSize) { drawable.style.height = `${height}px`; }
      if (width > minimumSize) {
        drawable.style.width = `${width}px`;
        drawable.style.left = `${originalX + (event.pageX - originalMouseX)}px`;
      }
    } else { // bottom-right
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight + (event.pageY - originalMouseY);
      if (width > minimumSize) { drawable.style.width = `${width}px`; }
      if (height > minimumSize) { drawable.style.height = `${height}px`; }
    }
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', resize);
  };

  resizers.forEach((resizer: Element) => {
    resizer.addEventListener('mousedown', (event) => {
      currentResizer = resizer;
      event.preventDefault();
      originalWidth = drawable.offsetWidth;
      originalHeight = drawable.offsetHeight;
      originalX = drawable.getBoundingClientRect().left;
      originalY = drawable.getBoundingClientRect().top;
      originalMouseX = (event as MouseEvent).pageX;
      originalMouseY = (event as MouseEvent).pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
  });
};

export default makeResizable;
