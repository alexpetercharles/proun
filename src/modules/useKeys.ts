const useKeys = (callback: Function) => {
  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'x') { callback('rect'); }
    if (event.key === 'c') { callback('circ'); }
  };
};

export default useKeys;
