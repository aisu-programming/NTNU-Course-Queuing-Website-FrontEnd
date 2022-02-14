import { GetApi } from "api/Get";
import { PatchApi } from "api/Patch";
import { config } from "./config";

export const GetList = async ( data ) =>{

    return await GetApi(config.listUrl)
    .then(res => {
        data = res;
        console.log(data);
    })
}

export const FixList = async( originData , alterData) => {
    
    console.log(originData , alterData);
    // return await PatchApi( data , config.listUrl )
    // .then(res => {
    //     console.log(res);
    // })
}