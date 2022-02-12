import { GetApi } from "api/Get";
import { PatchApi } from "api/Patch";
import { config } from "./config";

export const Getlist = async () =>{

    return await GetApi(config.listUrl)
    .then(res => {
        console.log(res)
    })
}

export const FixList = async(data) => {
    return await PatchApi( data , config.listUrl )
    .then(res => {
        console.log(res);
    })
}