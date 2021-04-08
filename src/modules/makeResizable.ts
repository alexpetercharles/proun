const makeResizable = (element: HTMLElement): void => {
  const resizable = element;
  const minimumSize = 20;
  const resizers = element.querySelectorAll('.resizer');

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
        resizable.style.width = `${width}px`;
        resizable.style.left = `${originalX + (event.pageX - originalMouseX)}px`;
      }
      if (height > minimumSize) {
        resizable.style.height = `${height}px`;
        resizable.style.top = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('top-right')) {
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight - (event.pageY - originalMouseY);
      if (width > minimumSize) { resizable.style.width = `${width}px`; }
      if (height > minimumSize) {
        resizable.style.height = `${height}px`;
        resizable.style.top = `${originalY + (event.pageY - originalMouseY)}px`;
      }
    } else if (classList.includes('bottom-left')) {
      const height = originalHeight + (event.pageY - originalMouseY);
      const width = originalWidth - (event.pageX - originalMouseX);
      if (height > minimumSize) { resizable.style.height = `${height}px`; }
      if (width > minimumSize) {
        resizable.style.width = `${width}px`;
        resizable.style.left = `${originalX + (event.pageX - originalMouseX)}px`;
      }
    } else { // bottom-right
      const width = originalWidth + (event.pageX - originalMouseX);
      const height = originalHeight + (event.pageY - originalMouseY);
      if (width > minimumSize) { resizable.style.width = `${width}px`; }
      if (height > minimumSize) { resizable.style.height = `${height}px`; }
    }
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', resize);
  };

  resizers.forEach((resizer: Element) => {
    resizer.addEventListener('mousedown', (event) => {
      currentResizer = resizer;
      event.preventDefault();
      originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      originalX = element.getBoundingClientRect().left;
      originalY = element.getBoundingClientRect().top;
      originalMouseX = (event as MouseEvent).pageX;
      originalMouseY = (event as MouseEvent).pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
  });
};

export default makeResizable;
