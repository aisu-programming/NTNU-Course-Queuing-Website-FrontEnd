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
    let fixData = []
    const newData = alterData.filter( (item) => !item.isOreder ) //  我加入的
    const changeData = alterData.filter( (item) => item.isOreder ) //  我加入的 
    const changeState = changeData.map( (item) => {
        originData.map( (OD) => {
            if ( OD.courseNo  === item.courseNo){
                if ( OD.state  !== item.state){
                    fixData.push( item )
                }
            }
        })
    })
    let changes = [];
    const changeState = changeData.map( (item) => {
        const { courseNo, domain, state } = item;
        const data = {
            courseNo: courseNo,
            action: state,
            domain: domain,
        }
        list.push(data)
    })

    newData = newData.map( (item) => {
        const { courseNo, domain, state } = item;
        const data = {
            courseNo: courseNo,
            action: state,
            domain: domain,
        }
        list.push(data)
    })

    const finalData = {changes: changes}
    console.log(originData , alterData);
    return await PatchApi( finalData , config.listUrl )
    .then(res => {
        console.log(res);
    })
}