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
