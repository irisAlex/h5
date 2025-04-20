import detailIcon from '@/assets/images/detailIcon.png';
import { reportApi, selectHandleByPage } from '@/services/index';
import { Button, Dialog, InfiniteScroll, Toast } from 'antd-mobile';
import { useState } from 'react';
import { history } from 'umi';
import styles from '../index.less';

export default () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [toDoList, setToDoList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const res = await selectHandleByPage({ pageSize, pageNumber, isHandle: 2 });
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
  const toDetail = (item) => {
    history.push(`/mediator/detail?eventCode=${item.eventActivitiId}&eventId=${item.eventId}`);
  };
  return (
    <div className={styles.listWrapper}>
      {data.map((item, index) => (
        <div key={item.eventActivitiId} className={styles.listItem}>
          <div className={styles.header}>
            <img src={detailIcon} />
            <span className={styles.undo}>调解成功</span>
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
            <Button
              color="primary"
              fill="outline"
              size="small"
              onClick={() => {
                Dialog.confirm({
                  content: '是否上报当前事件？',
                  onConfirm: async () => {
                    let res = await reportApi({
                      eventId: item.eventId,
                    });
                    if (res.code == '1') {
                      let newData = data.filter(
                        (el) => item.eventId != el.eventId,
                      );
                      setData(newData);
                      Toast.show({
                        icon: 'success',
                        content: '上报成功',
                        position: 'bottom',
                      });
                    } else {
                      Toast.show({
                        icon: 'error',
                        content: '上报失败',
                        position: 'bottom',
                      });
                    }
                  },
                });
              }}
            >
              上报
            </Button>
            &nbsp;&nbsp;
            <Button
              color="primary"
              size="small"
              onClick={() => toDetail(item)}
            >
              查看详情
            </Button>
          </div>
        </div>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};
