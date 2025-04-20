import { Mask, NavBar, SearchBar, SpinLoading, Tabs, Toast } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import TodoList from './components/todoList';
import DoneList from './components/donelist'
import styles from './index.less';
export default function index() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  const back = () => {
    history.go(-1);
  };
  return (
    <div className={styles.mediatorWrapper}>
      <Mask
        visible={loading}
        style={{
          display: loading ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SpinLoading />
      </Mask>
      <NavBar onBack={back}>矛盾纠纷上报</NavBar>
      <div className={styles.contentWrapper}>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            placeholder="请输入案件标题"
            onSearch={(val) => {
              Toast.show(`你搜索了：${val}`);
            }}
            onFocus={() => {
              console.log('获得焦点');
            }}
            onBlur={() => {
              console.log('失去焦点');
            }}
            onCancel={() => {
              console.log('取消搜索');
            }}
          />
        </div>

        <Tabs>
          <Tabs.Tab title="待办" key="fruits">
            <TodoList />
           
          </Tabs.Tab>
          <Tabs.Tab title="已办" key="vegetables">
            <DoneList/>
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}
