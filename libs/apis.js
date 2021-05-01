import axios from 'axios';
import CryptoJS from 'crypto-js';

const getConfig = () => {
  const time = Math.floor(new Date().getTime() / 1000);
  let generated_token = CryptoJS.HmacSHA256(
    `${process.env.NEXT_PUBLIC_KE_USERNAME}::${process.env.NEXT_PUBLIC_KE_TOKEN}::${time}`,
    process.env.NEXT_PUBLIC_KE_TOKEN,
  );
  let token = generated_token.toString(CryptoJS.enc.Hex);
  return { time, token };
};

const headers = {
  'Auth-Id': process.env.NEXT_PUBLIC_KE_USERNAME,
  'Auth-Token': getConfig().token,
  Timestamp: getConfig().time,
};

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_CORS_WORKER}/?${process.env.NEXT_PUBLIC_KE_API}`;
axios.defaults.headers = headers;

export async function subscribeForm(payload) {
  return await axios.post(`/subscriber`, payload);
}
