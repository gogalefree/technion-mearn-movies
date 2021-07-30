import axios from 'axios';
import { baseURL } from '../Movies/MovieUtils';

export function getAllMembers() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/members';
      const res = await axios.get(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function createMember(memberData) {
  console.log('creating', memberData);
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/members';
      const headers = {
        'Content-Type': 'application/json'
      };
      const res = await axios.post(url, memberData, { headers });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function updateMember(memberId, memberData) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/members/' + memberId;
      const headers = {
        'Content-Type': 'application/json'
      };

      const res = await axios.put(url, memberData, { headers });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteMember(mId) {
  console.log('Deleting member with id: ', mId);
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/members/' + mId;
      console.log('delete url: ', url);
      const res = await axios.delete(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
