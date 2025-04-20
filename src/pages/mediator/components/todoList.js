import detailIcon from '@/assets/images/detailIcon.png';
import { selectHandleByPage,getMDJFDescBackItemApi, } from '@/services/index';
import { InfiniteScroll,Button,Dialog,Toast } from 'antd-mobile';
import { useState } from 'react';
import styles from '../index.less';
import {history} from 'umi'

export default () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const res = await selectHandleByPage({ pageSize, pageNumber ,isHandle:1 });
    if (res.code == '1' && res.data.rows) {
      setPageNumber((val) => val + 1);
      setData((val) => [...val, ...res.data.rows]);
      if (res.data.total <= pageSize * pageNumber) {
        setHasMore(false);
      }
    } else {
      throw new Error('请求失败');
    }
  }
  const toHandle = (item)=>{
    history.push(`/handle?eventCode=${item.eventActivitiId}&eventId=${item.eventId}`)
  }
  return (
    <div className={styles.listWrapper}>
      {data.map((item, index) => (
        <div key={item.eventActivitiId} className={styles.listItem}>
          <div className={styles.header}>
            <img src={detailIcon} />
            <span className={styles.undo}>待受理</span>
          </div>
          <div className={styles.content}>
            <p className={styles.item}>
              <span className={styles.itemTitle}>纠纷类别：</span>
              <span className={styles.itemInfo}>{item.eventTypeName}</span>
            </p>
            <p>
              <span>地点：</span>
              <span>{item.eventHappenAddress}</span>
            </p>
            <p>
              <span>上报时间：</span>
              <span>{item.createTime}</span>
            </p>
            <p>
              <span>上报人：</span>
              <span>{item.applicant}</span>
            </p>
          </div>
          <div className={styles.btnWrapper}>
            <Button color='primary' size='small' onClick={()=>toHandle(item)}>办理</Button> &nbsp;&nbsp;
            <Button color='primary' fill='outline' size='small' onClick={()=>{
                Dialog.confirm({
                    content: '是否关闭当前事件？',
                    onConfirm: async () => {
                       let res = await getMDJFDescBackItemApi(
                        {
                            activityId:item.eventActivitiId,
                            eventId:item.eventId
                        })
                      if(res.code=="1"){
                        let newData = data.filter((el)=>item.eventActivitiId!=el.eventActivitiId);
                        setData(newData);
                        Toast.show({
                            icon: 'success',
                            content: '关闭成功',
                            position: 'bottom',
                          })
                         
                      }else{
                        Toast.show({
                            icon: 'error',
                            content: '关闭失败',
                            position: 'bottom',
                          })
                      }
                    },
                  })
            }}>关闭</Button>
          </div>
        </div>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};
