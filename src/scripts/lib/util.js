export const array = signature => {
  return signature instanceof Array ? signature : [signature];
}

export const once = fn => {
  let called = false;

  return (...args) => {
    if(called) return;
    called = true;
    fn(...args);
  };
};

export const getElementsMinWidth = (elementClone) => {
  const body = document.querySelector('body');
  
  elementClone.removeAttribute('style');

  elementClone.setAttribute('style', 'position: absolute; visibility: hidden; left: -9999px;');

  body.appendChild( elementClone );

  const width = elementClone.offsetWidth;

  body.removeChild( elementClone );

  return width;
};
