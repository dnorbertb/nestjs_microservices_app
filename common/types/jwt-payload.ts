export type JwtPayload<T> = {
  iat?: number;
  exp?: number;
} & T;
