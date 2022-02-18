import { PostApi } from 'api';
import { config } from './config';

export const LoginApi = async (data) => {
  return await PostApi(data, config.loginUrl).then(
    (res) => {
      if (res.message === 'Success.') {
        return res
      }
      if (res.message === 'Student id not exist.') {
        return '學號不存在';
      }
      if (res.message === 'Id or password incorrect.') {
        return '學號或密碼錯誤';
      }
      return '請檢查輸入是否正確'
    }
  );
};
