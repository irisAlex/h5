import { Form, Mask, NavBar, SpinLoading } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { getFormListNew } from '../Home/formData';
import ApplicantInfo from './components/applicantInfo';
import BaseInfo from './components/baseInfo';
import RespondentInfo from './components/respondentInfo';
import styles from './index.less';
import { show } from 'antd-mobile/es/components/dialog/show';
export default function index() {
  const { eventTypeArr, eventSourceArr } = useModel('global');
  const [loading, setLoading] = useState(false);
  const [showPage, setShowPage] = useState('baseInfo');
  const [baseInfoFormList, setBaseInfoFormList] = useState([]);
  const [respondentInfoFormList, setRespondentInfoFormList] = useState([]);
  const [applicantInfoFormList, setApplicantInfoFormList] = useState([]);
  const [agentInfoFormList, setAgentInfoFormList] = useState([]);
  const [baseInfoform] = Form.useForm();
  const [respondentInfoform] = Form.useForm();
  const [applicantInfoForm] = Form.useForm();
  const [showPerson, setShowPerson] = useState({applicant:"",respondent:""});

  useEffect(() => {
    setLoading(true);
    let res = getFormListNew()
    let newBaseInfoFormList = res.baseInfo.map((item) => {
      if (item.name === 'eventType') {
        item.columns = eventTypeArr;
      }
      if (item.name === 'eventSource') {
        item.columns = eventSourceArr;
      }
      return item;
    });
    setBaseInfoFormList(newBaseInfoFormList);
    setRespondentInfoFormList(res.respondentInfo);
    setApplicantInfoFormList(res.applicantInfo);
    setAgentInfoFormList(res.agentInfo);
    setLoading(false);
  }, []);

  const handleSubmit = () => {};

  // 申请人信息提交
  const handleApplicantInfoSubmit = () => {
    applicantInfoForm.validateFields().then((values) => {
      console.log('applicantvalues', values);
      setShowPerson({...showPerson,applicant:values.applicantName})
      setShowPage("baseInfo")
    });
  };
  const handleRespondentInfoSubmit = () => {
    respondentInfoform.validateFields().then((values) => {
      console.log('respondentvalues', values);
      setShowPerson({...showPerson,respondent:values.applicantName})
      setShowPage("baseInfo")
    });
  };
  
  const back = () => {
    if (showPage === 'baseInfo') {
      history.go(-1);
    } else if (showPage === 'respondentInfo' || showPage === 'applicantInfo') {
      setShowPage('baseInfo');
    }
  };

  const formValuesChange = (values) => {
    console.log('values', values);
  };
  return (
    <div className={styles.registrarWrapper}>
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
      <div style={{ display: showPage === 'baseInfo' ? 'block' : 'none' }}>
        <BaseInfo
          baseInfoform={baseInfoform}
          handleSubmit={handleSubmit}
          baseInfoFormList={baseInfoFormList}
          setShowPage={setShowPage}
          showPerson={showPerson}
        />
      </div>
      <div
        style={{ display: showPage === 'respondentInfo' ? 'block' : 'none' }}
      >
        <RespondentInfo
          respondentInfoform={respondentInfoform}
          handleSubmit={handleRespondentInfoSubmit}
          agentInfoFormList={agentInfoFormList}
          respondentInfoFormList={respondentInfoFormList}
          setRespondentInfoFormList={setRespondentInfoFormList}
        />
      </div>
      <div style={{ display: showPage === 'applicantInfo' ? 'block' : 'none' }}>
        <ApplicantInfo
          applicantInfoForm={applicantInfoForm}
          handleSubmit={handleApplicantInfoSubmit}
          agentInfoFormList={agentInfoFormList}
          applicantInfoFormList={applicantInfoFormList}
          setApplicantInfoFormList={setApplicantInfoFormList}
        />
      </div>
    </div>
  );
}
