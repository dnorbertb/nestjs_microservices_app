import { UserBaseData } from 'common/types/user-base-data.type';

export type RegisterPayload = {
  userId: number;
  password: string;
} & UserBaseData;
