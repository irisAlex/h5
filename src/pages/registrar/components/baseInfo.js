import { findDom } from '@/utils/findDom';
import { Button, Form } from 'antd-mobile';
import { useState } from 'react';
import styles from '../index.less';
export default function index(props) {
  const {
    baseInfoFormList,
    baseInfoform,
    handleSubmit,
    setShowPage,
    showPerson,
  } = props;
  const [btnLoading, setBtnLoading] = useState(false);

  const formValuesChange = (values) => {
    console.log('values', values);
  };
  return (
    <div className={styles.content}>
      <Form
        form={baseInfoform}
        onValuesChange={formValuesChange}
        initialValues={{
          caseTime: new Date(),
        }}
      >
        <div className={styles.headerwrapper}>
          <span>基本信息</span>
        </div>
        <div className={styles.formWrapper}>
          {baseInfoFormList?.map((el, index) => {
            return findDom(el, index);
          })}
        </div>
      </Form>
      <div className={styles.headerwrapper}>
        <span>当事人信息</span>
      </div>
      <p className={styles.addParty}>
        <span>申请人</span>
        {showPerson.applicant ? (
          <span
            onClick={() => {
              setShowPage('applicantInfo');
            }}
          >
            {showPerson.applicant}
          </span>
        ) : (
          <Button
            color="primary"
            fill="outline"
            size="mini"
            onClick={() => {
              setShowPage('applicantInfo');
            }}
          >
            +添加
          </Button>
        )}
      </p>
      <p className={styles.addParty}>
        <span>被申请人</span>

        {showPerson.respondent ? (
          <span
            onClick={() => {
              setShowPage('respondentInfo');
            }}
          >
            {showPerson.respondent}
          </span>
        ) : (
          <Button
            color="primary"
            fill="outline"
            size="mini"
            onClick={() => {
              setShowPage('respondentInfo');
            }}
          >
            +添加
          </Button>
        )}
      </p>
      <div
        className={styles.submitBtn}
        onClick={btnLoading ? null : handleSubmit}
      >
        {btnLoading && <DotLoading color="primary" />}提交
      </div>
    </div>
  );
}
