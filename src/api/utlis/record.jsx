import { GetApi } from "api/Get";
import { config } from "./config";

export const GetRecord = async() => {
    return await GetApi( config.achieveUrl )
    .then( res => {
        return res.data.orders;
    })
}