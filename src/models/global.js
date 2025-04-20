// 全局共享数据示例
import { useEffect, useState } from 'react';
import {getMDJFCenterJiufenTypeApi,getPairsByType} from '@/services/index.js';
const useUser = () => {
   const [eventTypeArr, setEventTypeArr] = useState([]);
   const [eventSourceArr, setEventSourceArr] = useState([]);

   useEffect(() => {
    getMDJFCenterJiufenTypeApi({eventTypeCode: "DISPUTE_NEW",keyWords: ''}).then(res=>{
      if (res?.code === '1' && res.data) {
        const { data } = res;
        setEventTypeArr(data.map((item) => ({ label: item.eventTypeName, value: item.eventTypeCode })));
      }
    })
    getPairsByType({typeCode: "EVENT_SOURCE_NEW"}).then(res1=>{
      if (res1?.code === '1' && res1.data) {
        let tempArr = [];
        for(let [key,value] of Object.entries(res1.data)){
          tempArr.push({value:key,label:value})
        }
        setEventSourceArr(tempArr)
      }
    })
  }, []);
  

  return {
    eventTypeArr,
    eventSourceArr
  };
};

export default useUser;
