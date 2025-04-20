import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { NavLink } from 'umi';

const HomePage = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
      </div>
     <ul>
    <li><NavLink to="/mediator" >矛盾纠纷上报</NavLink></li>
    <br/>
    <li><NavLink to="/registrar">矛盾纠纷处置</NavLink></li>
  </ul>
    </PageContainer>
  )
};

export default HomePage;
