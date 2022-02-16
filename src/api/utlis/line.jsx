import { GetApi } from "api/Get";
import { config } from "./config";

export const GetLine = async () =>{

    return await GetApi(config.lineUrl)
    .then(res => {
        // console.log(res)
    })
}
