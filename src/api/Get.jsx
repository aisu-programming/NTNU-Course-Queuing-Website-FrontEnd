export const GetApi = async (url) => {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
    },
    // mode: 'cors',
    // credentials: 'include',
  })
    .then((response) => response.json())
    .catch((error) => console.log('error' + error));
};
