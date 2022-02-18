import { GetApi } from 'api';
import { config } from './config';

export const LogoutApi = async () => {
  return await GetApi(config.loginUrl).then(
    (res) => {
      return res;
    }
  );
};
