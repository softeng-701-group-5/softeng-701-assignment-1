const BASE_URL = 'http://localhost:8080';

const client = (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window.fetch(`${BASE_URL}${endpoint}`, config).then(async response => {
    const text = await response.text();
    if (text === '') return;
    const data = JSON.parse(text);
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export { client };
