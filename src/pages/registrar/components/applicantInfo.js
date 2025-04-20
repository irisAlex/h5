
import { Button, Form } from 'antd-mobile';
import { useState } from 'react';
import styles from '../index.less';
import { findDom } from '@/utils/findDom';
export default function index(props) {
  const {
    applicantInfoFormList,
    applicantInfoForm,
    setApplicantInfoFormList,
    agentInfoFormList,
    handleSubmit
  } = props;
  const [showAgent, setShowAgent] = useState(false);


  const formValuesChange = (changedValues, allValues) => {
    console.log('changedValues', changedValues)
    if (changedValues.applicantType?.length > 0) {
      if (changedValues.applicantType[0] === '01') {
        let newFormList = applicantInfoFormList.map((item) => {
          if (
            item.label == '单位名称' ||
            item.label == '信用代码' ||
            item.label == '机构代表人' ||
            item.label == '代表人性别' ||
            item.label == '法人性别'
          ) {
            return { ...item, hidden: true };
          } else {
            return { ...item, hidden: false };
          }
        });
        setApplicantInfoFormList(newFormList);
      }
      if (changedValues.applicantType[0] === '02') {
        let newFormList = applicantInfoFormList.map((item) => {
          if (
            item.label == '申请人姓名' ||
            item.label == '代表人性别' ||
            item.label == '申请人性别'
          ) {
            return { ...item, hidden: true };
          } else {
            return { ...item, hidden: false };
          }
        });
        setApplicantInfoFormList(newFormList);
      }
      if (changedValues.applicantType[0] === '03') {
        let newFormList = applicantInfoFormList.map((item) => {
          if (
            item.label == '申请人姓名' ||
            item.label == '法人性别' ||
            item.label == '申请人性别'
          ) {
            return { ...item, hidden: true };
          } else {
            return { ...item, hidden: false };
          }
        });
        console.log('非法人组织', newFormList);
        setApplicantInfoFormList(newFormList);
      }
    }
  };
  return (
    <div className={styles.content}>
      <div className={styles.headerwrapper}>
        <span>申请人</span>
      </div>
      <Form
        form={applicantInfoForm}
        onValuesChange={formValuesChange}
        footer={
          <>
            {!showAgent && (
              <Button
                block
                color="primary"
                size="large"
                fill="outline"
                onClick={() => {
                  setShowAgent(true);
                }}
              >
                添加代理人
              </Button>
            )}
            {showAgent && (
              <Button
                block
                color="danger"
                size="large"
                fill="outline"
                onClick={() => {
                  setShowAgent(false);
                }}
              >
                删除代理人
              </Button>
            )}
            <br />
            <Button block color="primary" size="large" onClick={handleSubmit}>
              提交
            </Button>
          </>
        }
        style={{ height: 'calc(100vh - 90px)', overflow: 'auto' }}
        initialValues={{
            applicantType: ["01"],
          }}
      >
        <div className={styles.formWrapper}>
          {applicantInfoFormList
            ?.filter((item) => !item.hidden)
            .map((el, index) => {
              return findDom(el, index);
            })}

          {showAgent && (
            <>
              <div className={styles.headerwrapper}>
                <span>代理人</span>
              </div>
              <div>
                {agentInfoFormList.map((el, index) => {
                  return findDom(el, index);
                })}
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}
