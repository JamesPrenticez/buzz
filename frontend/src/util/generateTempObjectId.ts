export const generateTempObjectId = (): string => {
  let hexString = '';
  for (let i = 0; i < 24; i++) {
    hexString += Math.floor(Math.random() * 16).toString(16);
  }
  return `temp-${hexString}`;
};