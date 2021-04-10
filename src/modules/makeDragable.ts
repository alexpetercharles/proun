const makeDragable = (drawable: HTMLElement): void => {
  const drag = (event: MouseEvent) => {
    drawable.style.left = `${event.pageX - (drawable.offsetWidth / 2)}px`;
    drawable.style.top = `${event.pageY - (drawable.offsetHeight / 2)}px`;
  };

  const stopDrag = () => {
    window.removeEventListener('mousemove', drag);
  };

  drawable.addEventListener('mousedown', (event) => {
    if (!(event.target as HTMLElement).classList.contains('resizer')) {
      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stopDrag);
    }
  });
};

export default makeDragable;
