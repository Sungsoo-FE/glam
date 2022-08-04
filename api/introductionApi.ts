import axios from 'axios';
import env from '../env';

const baseUrl = env.baseUrl + '/introduction';

export async function getIntroductions() {
  const response = await axios.get(baseUrl + '/');
  return response.data;
}

export async function getAdditional() {
  const response = await axios.get(baseUrl + '/additional');
  return response.data;
}

export async function getCustom() {
  const response = await axios.post(baseUrl + '/custom');
  return response.data;
}
