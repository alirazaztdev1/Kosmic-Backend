import { Global } from '@nestjs/common';
export * from './role-type';
export * from './token-type';
export * from './response.types';
export * from './gender-type';
export * from './media-types';
export * from './email-send-type';
export * from './sign-up-type';

@Global()
export default class Constants {}
