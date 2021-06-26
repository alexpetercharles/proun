import interact from 'interactjs';

const angleScale = {
  angle: 0,
  scale: 1,
};

const dragMove = (event: any) => {
  const { target } = event;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  // translate the element
  target.style.transform = `translate(${x}px, ${y}px)`;
  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
};

const makeDrawable = (drawable: HTMLElement): void => {
  interact(drawable)
    .resizable({
    // resize from all edges and corners
      edges: {
        left: true, top: true,
      },

      listeners: {
        move: (event) => {
          const { target } = event;
          let x = (parseFloat(target.getAttribute('data-x')) || 0);
          let y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;

          // translate when resizing from top or left edges
          x += event.deltaRect.left / 2;
          y += event.deltaRect.top / 2;

          target.style.transform = `translate(${x}px,${y}px)`;

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
      },
      modifiers: [
      // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
        }),
      ],

      inertia: true,
    })
    .draggable({
      listeners: {
        move: dragMove,
      },
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
    })
    .gesturable({
      listeners: {
        start(event) {
          angleScale.angle -= event.angle;
        },
        move(event) {
          const currentAngle = event.angle + angleScale.angle;
          const currentScale = event.scale * angleScale.scale;

          event.target.style.transform = `rotate(${currentAngle}deg) scale(${currentScale})`;

          dragMove(event);
        },
        end(event) {
          angleScale.angle += event.angle;
          angleScale.scale *= event.scale;
        },
      },
    });
};

export default makeDrawable;
