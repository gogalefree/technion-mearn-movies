import axios from 'axios';
import { baseURL } from '../Movies/MovieUtils';

export function getAllSubscriptions() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/subscriptions';
      const res = await axios.get(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function createSubscription(subscription) {
    console.log('creating', subscription);
    return new Promise(async (resolve, reject) => {
      try {
        const url = baseURL + '/api/subscriptions';
        const headers = {
          'Content-Type': 'application/json'
        };
  
        const res = await axios.post(url, subscription, { headers });
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }