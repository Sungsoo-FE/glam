import axios from 'axios';
import env from '../env';

const baseUrl = env.baseUrl;

export async function getIntroductions() {
  const response = await axios.get(baseUrl + '/introduction');
  return response.data;
}
