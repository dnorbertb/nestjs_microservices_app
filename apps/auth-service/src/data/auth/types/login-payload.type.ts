import { UserBaseData } from 'common/types/user-base-data.type';

export type LoginPayload = {
  userId: number;
  password: string;
} & UserBaseData;
