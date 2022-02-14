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
    const newData = alterData.filter( (item) => !item.isOreder ) //  我加入的
    const changeData = alterData.filter( (item) => item.isOreder ) //  我原本有的
    const changeState = changeData.map( (item) => {
        originData.map( (OD) => {
            if ( OD.courseNo  === item.courseNo){
                if ( OD.state  !== item.state){
                    return item 
                }
            }
        })
    })
    
    const cs = changeState.foreach( (item) => {
        const { courseNo, domain, state } = item;
        const data = {
            courseNo: courseNo,
            action: state,
            domain: domain,
        }
        return data
    })

    const nd = newData.foreach( (item) => {
        const { courseNo, domain, state } = item;
        const data = {
            courseNo: courseNo,
            action: state,
            domain: domain,
        }
        return data
    })

    const fd =[...cs, ...nd];
    const finalData = {changes: fd}
    console.log(originData , alterData);
    return await PatchApi( finalData , config.listUrl )
    .then(res => {
        console.log(res);
    })
}