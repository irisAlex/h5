import { Button, Form, Mask, NavBar, SpinLoading, Steps } from 'antd-mobile';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { history, useSearchParams } from 'umi';
import { selectBasicInfo } from '../../../services/index';
import {
  findDom,
  handleApplicantInfoFormList,
  handleRespondentInfoFormList,
  mediationRecordsInfoFormList,
} from '../../../utils/findDom';
import {
  applicantInfo,
  getFormListNew,
  mediationRecords,
  respondentInfo,
} from '../../Home/formData';
import styles from './index.less';

import { insertMediateRecord, updateById } from '../../../services/index';
const { Step } = Steps;
export default function index() {
  const [loading, setLoading] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [stepCurrent, setStepCurrent] = useState(0);
  const [mediationRecordsFormList, setMediationRecordsFormList] = useState([]);
  const [respondentInfoFormList, setRespondentInfoFormList] = useState([]);
  const [applicantInfoFormList, setApplicantInfoFormList] = useState([]);
  const [agentInfoFormList, setAgentInfoFormList] = useState([]);
  const [evidenceMaterialsFromList, setEvidenceMaterialsFromList] = useState(
    [],
  );
  const [mediationRecordsData, setMediationRecordsData] = useState([]); //调处记录
  const [searchParams, setSearchParams] = useSearchParams();
  const [applicantInfoForm] = useForm();
  const [respondentInfoForm] = useForm();
  const [mediationRecordsInfoForm] = useForm();
  const formValuesChange = (changedValues, allValues) => {
    console.log('changedValues', changedValues);
    if (changedValues.applicantType?.length > 0) {
      let arr = handleApplicantInfoFormList(
        applicantInfo,
        changedValues.applicantType[0],
        ['邮箱'],
      );
      setApplicantInfoFormList(arr);
    }
  };

  const formRespondentValuesChange = (changedValues, allValues) => {
    console.log('changedValues', changedValues);
    if (changedValues.applicantType?.length > 0) {
      let list = handleRespondentInfoFormList(
        respondentInfo,
        changedValues.applicantType[0],
        ['邮箱'],
      );
      setRespondentInfoFormList(list);
    }
  };

  useEffect(() => {
    let res = getFormListNew();
    setApplicantInfoFormList(res.applicantInfo);
    setFormDataList(res);
    getselectBasicInfo();
  }, []);

  // 基本信息
  const getselectBasicInfo = () => {
    setLoading(true);
    selectBasicInfo({ eventId: searchParams.get('eventId') }).then((res) => {
      if (res.code == '1') {
        const applicantInfo1 = res.data.applicantList[0]; //获取申请人信息
        const respondentInfo1 = res.data.applicantList[1]; //获取被申请人信息
        let arr = handleApplicantInfoFormList(
          applicantInfo,
          applicantInfo1.applType,
          ['邮箱'],
        );
        setApplicantInfoFormList(arr);

        applicantInfoForm.setFieldsValue({
          //申请人信息回显
          ...applicantInfo1,
          applicantType: [applicantInfo1.applType],
          applicantName: applicantInfo1.name,
          applicantSex: [applicantInfo1.sex],
          personLiveAddress: applicantInfo1.address,
          applicantPhone: applicantInfo1.tel,
          applicantIdCard: applicantInfo1.idCard,
        });

        let list = handleRespondentInfoFormList(
          respondentInfo,
          respondentInfo1.applType,
          ['邮箱'],
        );
        setRespondentInfoFormList(list);

        respondentInfoForm.setFieldsValue({
          //被申请人信息回显
          ...respondentInfo1,
          applicantType: [respondentInfo1.applType],
          applicantName: respondentInfo1.name,
          applicantSex: [respondentInfo1.sex],
          personLiveAddress: respondentInfo1.address,
          applicantPhone: respondentInfo1.tel,
          applicantIdCard: respondentInfo1.idCard,
        });

        let arr1 = mediationRecordsInfoFormList(mediationRecords);
        setMediationRecordsFormList(arr1);
        mediationRecordsInfoForm.setFieldsValue({
          mediatorName: res.data.mediatorName,
          // mediatePersonTel : res.data.
        });
      }
      setLoading(false);
    });
  };
  const back = () => {
    history.go(-1);
  };
  const baseInfoSubmit = () => {
    applicantInfoForm.validateFields().then((applicantInfoValues) => {
      respondentInfoForm.validateFields().then((respondentInfoValues) => {
        ObjectTraversal(applicantInfoValues, '01');
        ObjectTraversal(respondentInfoValues, '02');
        const nfv = {
          applicantList: [applicantInfoValues, respondentInfoValues],
          eventId: searchParams.get('eventId'),
        };
        updateById(nfv);
        //当事人信息提交
        setStepCurrent(1);
      });
    });
  };

  const mediationRecordsSubmit = () => {
    mediationRecordsInfoForm.validateFields().then((mrif) => {
      mrif.eventId = searchParams.get('eventId');
      mrif.mediateSuccess = mrif.mediateSuccess[0];
      mrif.startTime = dayjs(mrif.startTime).format('YYYY-MM-DD HH:mm:ss');
      mrif.endTime = dayjs(mrif.endTime).format('YYYY-MM-DD HH:mm:ss');
      mrif.mediateAddress = '';
      console.log(JSON.stringify(mrif.startTime), 3444);
      insertMediateRecord(mrif);
    });
    //调处记录提交
    setStepCurrent(2);
  };
  const evidenceMaterialsSubmit = () => {
    //证据材料提交
    // setStepCurrent(2);
  };

  const ObjectTraversal = (obj, ak) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        obj[key] = value[0];
      }
    });
    obj.applicantKind = ak;
  };
  return (
    <div className={styles.handleContainer}>
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
      <NavBar onBack={back}>事件办理</NavBar>
      <Steps current={stepCurrent}>
        <Step title="当事人信息" />
        <Step title="调处记录" />
        <Step title="证据材料" />
      </Steps>
      <div style={{ display: stepCurrent === 0 ? 'block' : 'none' }}>
        <div className={styles.headerwrapper}>
          <span>申请人信息</span>
        </div>

        <Form form={applicantInfoForm} onValuesChange={formValuesChange}>
          <div className={styles.formWrapper}>
            {applicantInfoFormList
              ?.filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
          </div>
        </Form>

        <div className={styles.headerwrapper}>
          <span>被申请人信息</span>
        </div>
        <Form
          form={respondentInfoForm}
          onValuesChange={formRespondentValuesChange}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="primary"
                size="large"
                fill="outline"
                style={{ width: '40%' }}
                onClick={() => {
                  history.goBack();
                }}
              >
                取消
              </Button>
              <Button
                color="primary"
                size="large"
                style={{ width: '55%' }}
                onClick={baseInfoSubmit}
              >
                下一步
              </Button>
            </div>
          }
        >
          <div className={styles.formWrapper}>
            {respondentInfoFormList
              ?.filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
          </div>
        </Form>
      </div>
      <div style={{ display: stepCurrent === 1 ? 'block' : 'none' }}>
        <Form
          form={mediationRecordsInfoForm}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="primary"
                size="large"
                fill="outline"
                style={{ width: '40%' }}
                onClick={() => {
                  setStepCurrent(0);
                }}
              >
                上一步
              </Button>

              <Button
                color="primary"
                size="large"
                style={{ width: '55%' }}
                onClick={mediationRecordsSubmit}
              >
                下一步
              </Button>
            </div>
          }
        >
          <div className={styles.headerwrapper}>
            <span>纠纷概况</span>
          </div>
          <div className={styles.textDesc}>
            本人与张小三在2001年11月发生矛盾
          </div>
          <div className={styles.headerwrapper}>
            <span>调解情况</span>
          </div>
          <div className={styles.formWrapper}>
            {mediationRecordsFormList
              .filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
          </div>
        </Form>
      </div>
      <div style={{ display: stepCurrent === 2 ? 'block' : 'none' }}>
        <Form
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="primary"
                size="large"
                fill="outline"
                style={{ width: '40%' }}
                onClick={() => {
                  setStepCurrent(1);
                }}
              >
                上一步
              </Button>

              <Button
                color="primary"
                size="large"
                style={{ width: '55%' }}
                onClick={evidenceMaterialsSubmit}
              >
                提交
              </Button>
            </div>
          }
        >
          <div className={styles.formWrapper}>
            {formDataList.evidenceMaterials?.map((el, index) => {
              return findDom(el, index);
            })}
          </div>
        </Form>
      </div>
    </div>
  );
}
