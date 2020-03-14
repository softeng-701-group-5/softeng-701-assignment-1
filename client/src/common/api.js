// TODO: configure production url
const BASE_URL = 'http://localhost:8080';

export const getFeed = async () => {
  const response = await fetch(`${BASE_URL}/`);
  const data = await response.json();

  return data;
};
