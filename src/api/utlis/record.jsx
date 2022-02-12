import { GetApi } from "api/Get";
import { config } from "./config";

export const getRecord = async() => {
    return await GetApi( config.achieveUrl )
    .then( res => {
        console.log(res);
    })
}