export const getRandomEmail = (): string => {
  const timestamp = Date.now();
  return `user${timestamp}@testmail.com`;
};
