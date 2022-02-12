import { PostApi } from "api";
import { config } from "./config";

export const Login = async (data) => {
    return await PostApi(data , config.loginUrl)
        .then(res => {
            if ( res.message === 'Success'  ) {
                return 'success'
            }
            else if ( res.message === 'Id or password incorrect.' ) {        
                return '帳號或密碼錯誤 '
            }
        })

}