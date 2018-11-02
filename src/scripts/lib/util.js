export function array(signature) {
  return signature instanceof Array ? signature : [signature];
}
