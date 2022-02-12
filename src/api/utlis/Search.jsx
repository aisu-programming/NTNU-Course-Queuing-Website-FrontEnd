import { PostApi } from "api";
import { config } from "./config";
import { key } from "./base64Key";


export const search= async (data) =>{
    // console.log(data);

    let timeBs = new Array(85);
    let deptBs = new Array(168);
    timeBs.fill('0');
    deptBs.fill('0');

    var Time , day , classtime , bitloc;
    for (let i in data.filter.time){
        Time = data.filter.time[i];
        day = parseInt(Time[0],10);
        classtime = parseInt(Time[2],10);
        
        bitloc = (day-1)*14+classtime;
        timeBs[bitloc] = '1';
    }

    if ( data.otherSchedule === true ){
        timeBs[85] = '1';
    }
    if ( data.filter.department === 0 ){
        deptBs.fill('1');
    }
    else{
        deptBs[data.filter.department-1] = '1';
    }
   
    let tbinString = timeBs.join('');
    let dbinString = deptBs.join('');
    tbinString = '000' + tbinString + '00';
    dbinString = '0000000' + dbinString + '0000';

    let tbinArray = [] , dbinArray = [];
    for(var i=0,len=tbinString.length;i<len;i+=6){
        tbinArray.push(tbinString.slice(i,i+6));
    }
    
    for(var j=0,l=dbinString.length;j<l;j+=6){
        dbinArray.push(dbinString.slice(j,j+6));
    }

    let time = [] , dept = [];
    for( let i in tbinArray ){
        time = time + key[parseInt( tbinArray[i] , 2 )];
    }
    
    for( let i in dbinArray ){
        dept = dept + key[parseInt( dbinArray[i] , 2 )];
    }
    time = time + '=';
    dept = dept + '=='; 

    const classdata = {
        courseNo  : "",
        courseName: "",
        department: dept,
        teacher   : "",
        time      : time,
        place     : "",
        precise   : false,
    }

    if (data.filter.id){
        classdata.courseNo = data.filter.id.toString()
    }

    if (data.filter.name){
        classdata.courseName = data.filter.name.toString()
    }

    if (data.filter.teacher){
        classdata.teacher = data.filter.teacher.toString()
    }

    if (data.filter.place){
        classdata.place = data.filter.place.toString()
    }
    
    if ( data.filter.precise ){
        classdata.precise = true;
    }
    console.log(classdata);
    // return await PostApi(classdata , config.searchUrl)
    //     .then(res => {
    //         console.log(res);
    // })

}