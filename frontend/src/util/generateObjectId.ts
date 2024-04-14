// function generateRandomHexString(length: number): string {
//   const characters = 'abcdef0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters[randomIndex];
//   }
//   return result;
// }

// export function generateCustomObjectIds(count: number): string[] {
//   const objectIds: string[] = [];

//   for (let i = 0; i < count; i++) {
//     const timestamp = Math.floor(Date.now() / 1000).toString(16);
//     const randomPart = generateRandomHexString(8);
//     const objectId = timestamp + randomPart;
//     objectIds.push(objectId);
//   }

//   return objectIds;
// }

export const generateFakeObjectId = (): string => {
  let hexString = '';
  for (let i = 0; i < 24; i++) {
    hexString += Math.floor(Math.random() * 16).toString(16);
  }
  return hexString;
};