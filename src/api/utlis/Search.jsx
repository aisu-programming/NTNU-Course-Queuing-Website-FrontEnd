import { PostApi, GetApi } from 'api';
import { config } from './config';
import { key } from 'data';

export const search = async (data) => {
  let timeBs = new Array(85).fill('0');
  let deptBs = new Array(169).fill('0');

  var Time, day, classtime, bitloc;
  for (let i in data.filter.time) {
    Time = data.filter.time[i];
    day = parseInt(Time[0], 10);
    classtime = parseInt(Time[2] + Time[3], 10);

    bitloc = (day - 1) * 14 + classtime - 1;
    timeBs[bitloc] = '1';
  }

  if (data.otherSchedule === true) {
    timeBs[84] = '1';
  }
  if (data.filter.department === 0) {
    deptBs.fill('1');
  } else {
    deptBs[data.filter.department - 1] = '1';
  }

  let tbinString = '000' + timeBs.join('') + '00';
  let dbinString = '0000000' + deptBs.join('') + '0000';
  let domainBinary = new Array(10).fill('0');

  const base64_encode = (data) => {
    let array = [],
      code = [];
    for (var i = 0, len = data.length; i < len; i += 6) {
      array.push(data.slice(i, i + 6));
    }

    for (let i in array) {
      code = code + key[parseInt(array[i], 2)];
    }
    return code;
  };

  let time = [],
    dept = [];

  time = base64_encode(tbinString) + '=';
  dept = base64_encode(dbinString) + '==';
  const classdata = {
    courseNo: '',
    courseName: '',
    departments: dept,
    teacher: '',
    times: 'H/////////////8=',
    places: 7,
    domains: 0,
    precise: false,
  };

  if (!!data.filter.id) {
    classdata.courseNo = data.filter.id.toString();
  }
  if (!!data.filter.name) {
    classdata.courseName = data.filter.name.toString();
  }
  if (!!data.filter.teacher) {
    classdata.teacher = data.filter.teacher.toString();
  }
  if (data.filter.time.length !== 0) {
    classdata.times = time;
  }
  if (data.filter.department === 1) {
    if (!data.filter.domains) {
      classdata.domains = 1023;
    }
    if (data.filter.domains === 100) {
      classdata.domains = 1023;
    }

    if (!!data.filter.domains && data.filter.domains !== 100) {
      domainBinary[data.filter.domains - 1] = '1';
      classdata.domains = parseInt(domainBinary.join(''), 2);
    }
  }
  if (data.filter.place) {
    classdata.places = data.filter.place;
  }
  if (data.filter.precise) {
    classdata.precise = true;
  }
  console.log(classdata);
  return await PostApi(classdata, config.searchUrl).then(
    (res) => {
      return res.data.courses;
    }
  );
};

export const getSearchOption = async () => {
  return await GetApi(config.courseUrl).then((res) => {
    return res.data.sequence;
  });
};
