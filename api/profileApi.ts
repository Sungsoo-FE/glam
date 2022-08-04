import axios from 'axios';
import env from '../env';

const baseUrl = env.baseUrl + '/profile';

export async function getProfile() {
  const response = await axios.get(baseUrl);
  return response.data;
}
