import { ILike, Not } from 'typeorm';

export default function replacingAlies(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      obj = { ...obj, [key]: replacingAlies(obj[key]) };
    } else if (key === '$ILike') {
      obj = ILike(`%${obj[key]}%`);
    } else if (key === '$Not') {
      obj = Not(`%${obj[key]}%`);
    }
  }
  return obj;
}
