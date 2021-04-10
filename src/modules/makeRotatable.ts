const makreRotatable = (drawable: HTMLElement): void => {
  let center = { x: 0, y: 0 };
  const rotate = (event: MouseEvent) => {
    const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x) + 0.75;
    drawable.style.transform = `rotate(${angle}rad)`;
  };

  const stopRotate = () => {
    window.removeEventListener('mousemove', rotate);
  };

  const rotator = drawable.querySelector('.rotator');
  if (rotator) {
    rotator.addEventListener('mousedown', () => {
      const {
        left, top, width, height,
      } = drawable.getBoundingClientRect();
      center = { x: left + width / 2, y: top + height / 2 };
      window.addEventListener('mousemove', rotate);
      window.addEventListener('mouseup', stopRotate);
    });
  }
};

export default makreRotatable;
