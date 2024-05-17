import { PayloadName } from 'types/common.dto';

export type LoginStart = Record<PayloadName, any>;
export type LoginSuccess = Record<PayloadName, any>;

export type LogoutStart = Record<PayloadName, string>;
