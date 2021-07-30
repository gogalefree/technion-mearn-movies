import { baseURL as url } from '../Movies/MovieUtils';

export async function loginUser(credentials) {
  const reqUrl = url + '/api/users/login';
  console.log('req url: ', reqUrl);
  return fetch(reqUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}
