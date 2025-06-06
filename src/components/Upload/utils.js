/*
 @Author: 罗健媛
 @Date: 2023-11-15 17:33:19
 @LastEditTime: 2023-11-22 20:50:54
 @LastEditors: 罗健媛
 @Description: 
 */
import { sleep } from 'antd-mobile/es/utils/sleep';

export const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

export async function mockUpload(file) {
  await sleep(3000);
  return {
    url: URL.createObjectURL(file),
  };
}

export async function mockUploadFail() {
  await sleep(3000);
  throw new Error('Fail to upload');
}
