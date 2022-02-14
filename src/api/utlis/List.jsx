import { GetApi } from 'api/Get';
import { PatchApi } from 'api/Patch';
import { config } from './config';

export const GetList = async ( setCourseData ) => {
  return await GetApi(config.listUrl).then((res) => {
    // return res.data.orders;
    setCourseData(res.data.orders);
    console.log(res.data.orders);
  });
};
const action = { active: 0, pause: 1, delete: 2 };
export const FixList = async (originData, alterData) => {
  const newData = alterData.filter(
    (item) => !item.isOreder
  ); //  我加入的
  const changeData = alterData.filter(
    (item) => item.isOreder
  ); //  我原本有的
  const changeStatus = changeData.map((item) => {
    originData.map((OD) => {
      if (OD.courseNo === item.courseNo) {
        if (OD.status !== item.status) {
          return item;
        }
      }
    });
  });

  const cs = changeStatus.map((item) => {
    const { courseNo, domains, status } = item;
    const data = {
      courseNo: courseNo,
      action: action[status],
      domain: domains,
    };
    return data;
  });

  const nd = newData.map((item) => {
    const { courseNo, domains, status } = item;
    const data = {
      courseNo: courseNo,
      action: action[status],
      domain: domains,
    };
    return data;
  });

  const fd = [...cs, ...nd];
  const finalData = { changes: fd };
  console.log(finalData);
  return await PatchApi(finalData, config.listUrl).then(
    (res) => {
      console.log(res);
    }
  );
};
