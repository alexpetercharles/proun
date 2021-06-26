import { drawState } from '@/modules/useDraw';

const makreRotatable = (drawableElement: HTMLElement, i: number|undefined): void => {
  if (i === undefined) { return; }
  const drawable = drawState.drawables[i];
  let center = { x: 0, y: 0 };
  const rotate = (event: MouseEvent) => {
    const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x) + 0.75;
    drawable.rotation = `${angle}rad`;
  };

  const stopRotate = () => {
    window.removeEventListener('mousemove', rotate);
  };

  const rotator = drawableElement.querySelector('.rotator');
  if (rotator) {
    rotator.addEventListener('mousedown', () => {
      const {
        left, top, width, height,
      } = drawableElement.getBoundingClientRect();
      center = { x: left + width / 2, y: top + height / 2 };
      window.addEventListener('mousemove', rotate);
      window.addEventListener('mouseup', stopRotate);
    });
  }
};

export default makreRotatable;
