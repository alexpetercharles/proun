import { drawState } from '@/modules/draw';

const makeDragable = (drawable: HTMLElement, i: number|undefined): void => {
  const drag = (event: MouseEvent) => {
    if (i !== undefined) {
      drawState.drawables[i].position.x = `${event.pageX - (drawable.offsetWidth / 2)}px`;
      drawState.drawables[i].position.y = `${event.pageY - (drawable.offsetHeight / 2)}px`;
    }
  };

  const stopDrag = () => {
    window.removeEventListener('mousemove', drag);
  };

  drawable.addEventListener('mousedown', (event) => {
    if (!(event.target as HTMLElement).classList.contains('tool')) {
      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stopDrag);
    }
  });
};

export default makeDragable;
