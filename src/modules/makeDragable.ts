import { drawState } from '@/modules/useDraw';

const makeDragable = (drawableElement: HTMLElement, i: number|undefined): void => {
  if (i === undefined) { return; }
  const drawable = drawState.drawables[i];
  const drag = (event: MouseEvent) => {
    drawable.position.x = `${event.pageX - (drawableElement.offsetWidth / 2)}px`;
    drawable.position.y = `${event.pageY - (drawableElement.offsetHeight / 2)}px`;
  };

  const stopDrag = () => {
    window.removeEventListener('mousemove', drag);
  };

  drawableElement.addEventListener('mousedown', (event) => {
    if (!(event.target as HTMLElement).classList.contains('tool')) {
      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stopDrag);
    }
  });
};

export default makeDragable;
