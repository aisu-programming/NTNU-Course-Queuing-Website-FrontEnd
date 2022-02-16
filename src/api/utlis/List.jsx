import { GetApi } from 'api/Get';
import { PatchApi } from 'api/Patch';
import { config } from './config';
import { Domains } from 'data';

export const GetList = async () => {
  return await GetApi(config.listUrl).then((res) => {
    return res.data.orders;
  });
};
const action = { activate: 0, pause: 1, delete: 2 };
export const FixList = async (originData, alterData) => {
  const newData = alterData
    .filter((item) => item.hasOwnProperty('isOrdered'))
    .map((item) => {
      const { department, courseNo, status, domain } = item;
      const isGU = department === '通識';
      const data = {
        courseNo: courseNo,
        action: action[status],
        domain: Domains[isGU ? domain : ""],
      };
      return data;
    });
  const oldData = alterData.filter(
    (item) => !item.hasOwnProperty('isOrdered')
  );
  const changeData = oldData
    .filter((item) => {
      const findData = originData.find((i) => {
        return i.courseNo === item.courseNo;
      });
      if (findData.status !== item.status) return true;
      if (findData.domain !== item.domain) return true;
      return false;
    })
    .map((item) => {
      const { courseNo, status, domain } = item;
      const data = {
        courseNo: courseNo,
        action: action[status],
        domain: Domains[domain],
      };
      return data;
    });
  const changes = { changes: [...newData, ...changeData] };
  return await PatchApi(changes, config.listUrl).then(
    (res) => {
      // console.log(res);
    }
  );
};
