import { findDom,handleApplicantInfoFormList ,handleRespondentInfoFormList} from '@/utils/findDom';
import { Form, Mask, NavBar, Popover, SpinLoading, Steps } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { history, useSearchParams } from 'umi';
import {
  selectBasicInfo,
  selectByPage,
  selectEventProcessInfo,
} from '../../../services/index';
import {
  agentInfo,
  applicantInfo,
  baseInfo,
  evidenceMaterials,
  mediationRecords,
  respondentInfo,
} from '../../Home/formData';
import styles from '../index.less';
const { Step } = Steps;
export default function index(props) {
  const [loading, setLoading] = useState(false);
  const [openList, setOpenList] = useState([5]);
  const [form] = Form.useForm();
  const [applicantInfoForm] = Form.useForm();
  const [respondentInfoForm] = Form.useForm();
  const [baseInfoFormList, setBaseInfoFormList] = useState([]);
  const [mediationRecordsFormList, setMediationRecordsFormList] = useState([]);
  const [respondentInfoFormList, setRespondentInfoFormList] = useState([]);
  const [applicantInfoFormList, setApplicantInfoFormList] = useState([]);
  const [agentInfoFormList, setAgentInfoFormList] = useState([]);
  const [evidenceMaterialsFromList, setEvidenceMaterialsFromList] = useState([]);
  const [mediationRecordsData, setMediationRecordsData] = useState([]); //调处记录
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventProcessInfo, setEventProcessInfo] = useState([]);
  useEffect(() => {
    setBaseInfoFormList(
      baseInfo.map((item) => ({ ...item, type: 'justRead' })),
    );
    setMediationRecordsFormList(
      mediationRecords.map((item) => ({ ...item, type: 'justRead' })),
    );

    setAgentInfoFormList(
      agentInfo.map((item) => ({ ...item, type: 'justRead' })),
    );
    setEvidenceMaterialsFromList(
      evidenceMaterials.map((item) =>{
        if(item.type=="groupheader"){
          return {...item,type:'subgroupheader'}
        }else{
          return {...item,type:'justRead'}
        }
      }),
    );
    getEventProcessInfo();
    getselectBasicInfo();
    getSelectByPage();
  }, []);

  // 基本信息
  const getselectBasicInfo = () => {
    setLoading(true);
    selectBasicInfo({ eventId: searchParams.get('eventId') }).then((res) => {
      if (res.code == '1') {
        let obj = res.data;
        form.setFieldsValue({
          ...obj,
          caseTitle: obj.eventTitle,
          eventHappenArea: obj.eventHappenAddress,
          eventType: obj.eventTypeName,
          eventSource: obj.eventSourceName,
          caseTime: obj.eventHappenTime,
          caseSummary: obj.eventRemark,
          eventStateName:obj.eventStateName
        });

        const applicantInfo1 = res.data.applicantList[0]; //获取申请人信息
        const respondentInfo1 = res.data.applicantList[1]; //获取被申请人信息
        let tempapplicantInfoFormList = applicantInfo.map((item) => ({
          ...item,
          type: 'justRead',
        }));
        let arr = handleApplicantInfoFormList(tempapplicantInfoFormList,applicantInfo1.applType);
        setApplicantInfoFormList(arr);
      
        applicantInfoForm.setFieldsValue({
          ...applicantInfo1,
          applicantType: applicantInfo1.applTypeName,
          applicantName: applicantInfo1.name,
          applicantSex: applicantInfo1.sexName,
          personLiveAddress: applicantInfo1.address,
          applicantPhone: applicantInfo1.tel,
          agentIdCard: applicantInfo1.agentIdcard,
          agentPhone: applicantInfo1?.agentTel ,
          agentSex: applicantInfo1?.agentSex ,
          agentType: applicantInfo1?.entrustType ,
          fileIdList: applicantInfo1?.fileIdList,
        });

        let tempRespondentInfo = respondentInfo.map((item) => ({
          ...item,
          type: 'justRead',
        }));
        let list = handleRespondentInfoFormList(tempRespondentInfo,respondentInfo1.applType)
        setRespondentInfoFormList(list);
  
        respondentInfoForm.setFieldsValue({
          ...respondentInfo1,
          applicantType: respondentInfo1.applTypeName,
          applicantName: respondentInfo1.name,
          applicantSex: respondentInfo1.sexName,
          personLiveAddress: respondentInfo1.address,
          applicantPhone: respondentInfo1.tel,
          agentIdCard: respondentInfo1.agentIdcard,
          agentPhone: respondentInfo1?.agentTel ,
          agentSex: respondentInfo1?.agentSex ,
          agentType: respondentInfo1?.entrustType ,
          fileIdList: respondentInfo1?.fileIdList,
        });
      }
      setLoading(false);
    });
  };
  // 流转流程
  const getEventProcessInfo = () => {
    selectEventProcessInfo({ eventCode: searchParams.get('eventCode') }).then(
      (res) => {
        if (res.code == '1') {
          setEventProcessInfo(res.data);
        }
      },
    );
  };
  // 调处记录
  const getSelectByPage = () => {
    selectByPage({ eventId: searchParams.get('eventId') }).then((res) => {
      if (res.code == '1') {
        setMediationRecordsData(res.data.rows);
      }
    });
  };

  const handler = (index) => {
    if (openList.includes(index)) {
      setOpenList(openList.filter((item) => item !== index));
    } else {
      setOpenList([...openList, index]);
    }
  };
  const back = () => {
    history.go(-1);
  };
  return (
    <div className={styles.detailContent}>
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
      <NavBar onBack={back}>事件详情</NavBar>
      <Form form={form}>
        <div className={styles.headerwrapper}>
          <span className={styles.leftTitle}>基本信息</span>
          <span
            className={styles.showBtn}
            onClick={() => {
              handler(1);
            }}
          >
            {openList.includes(1) ? '收起' : '展开'}
          </span>
        </div>
        <div
          className={styles.formWrapper}
          style={{ display: openList.includes(1) ? 'block' : 'none' }}
        >
          {baseInfoFormList?.map((el, index) => {
            return findDom(el, index);
          })}
        </div>
        <div className={styles.headerwrapper}>
          <span className={styles.leftTitle}>调解信息</span>
          <span
            className={styles.showBtn}
            onClick={() => {
              handler(2);
            }}
          >
            {openList.includes(2) ? '收起' : '展开'}
          </span>
        </div>
        <div
          className={styles.formWrapper}
          style={{ display: openList.includes(2) ? 'block' : 'none' }}
        >
          {mediationRecordsFormList?.map((el, index) => {
            return findDom(el, index);
          })}
        </div>
      </Form>
      <div className={styles.headerwrapper}>
        <span className={styles.leftTitle}>当事人信息</span>
        <span
          className={styles.showBtn}
          onClick={() => {
            handler(3);
          }}
        >
          {openList.includes(3) ? '收起' : '展开'}
        </span>
      </div>
      <div style={{ display: openList.includes(3) ? 'block' : 'none' }}>
        <p className={styles.subHeader}>申请人</p>
        <Form form={applicantInfoForm}>
          <div className={styles.formWrapper}>
            {applicantInfoFormList
              ?.filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
            <p className={styles.subHeader} style={{ color: 'black' }}>
              代理人
            </p>
            {agentInfoFormList?.map((el, index) => {
              return findDom(el, index);
            })}
          </div>
        </Form>
        <p className={styles.subHeader}>被申请人</p>
        <Form form={respondentInfoForm}>
          <div className={styles.formWrapper}>
            {respondentInfoFormList
              ?.filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
            <p className={styles.subHeader} style={{ color: 'black' }}>
              代理人
            </p>
            {agentInfoFormList
              ?.filter((el) => !el.hidden)
              .map((el, index) => {
                return findDom(el, index);
              })}
          </div>
        </Form>
      </div>
      <div className={styles.headerwrapper}>
        <span className={styles.leftTitle}>证据材料</span>
        <span
          className={styles.showBtn}
          onClick={() => {
            handler(4);
          }}
        >
          {openList.includes(4) ? '收起' : '展开'}
        </span>
      </div>
      {openList.includes(4) && (
        <div>
          <Form>
              {evidenceMaterialsFromList?.map((el, index) => {
                return findDom(el, index);
              })}
          </Form>
        </div>
      )}
      <div className={styles.headerwrapper}>
        <span className={styles.leftTitle}>调处记录</span>
        <span
          className={styles.showBtn}
          onClick={() => {
            handler(5);
          }}
        >
          {openList.includes(5) ? '收起' : '展开'}
        </span>
      </div>
      {openList.includes(5) && (
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span className={styles.tableHeaderItem}>调解机构</span>
            <span className={styles.tableHeaderItem}>调解员</span>
            <span className={styles.tableHeaderItem}>调解时间</span>
            <span className={styles.tableHeaderItem}>调解结果</span>
          </div>
          {mediationRecordsData.map((item, index) => {
            return (
              <div className={styles.tableTr} key={item.taskId}>
                <Popover
                  content={item.mediatePersonOrg}
                  placement="bottom-start"
                  mode="dark"
                  trigger="click"
                >
                  <span className={styles.tableTd}>
                    {item.mediatePersonOrg}
                  </span>
                </Popover>

                <Popover
                  content={item.mediatePersonName}
                  placement="bottom-start"
                  mode="dark"
                  trigger="click"
                >
                  <span className={styles.tableTd}>
                    {item.mediatePersonName}
                  </span>
                </Popover>
                <Popover
                  content={item.mediateTime}
                  placement="bottom-start"
                  mode="dark"
                  trigger="click"
                >
                  <span className={styles.tableTd}>{item.mediateTime}</span>
                </Popover>

                <span
                  className={styles.tableTd}
                  title={item.mediateSuccessName}
                >
                  {item.mediateSuccessName}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.headerwrapper}>
        <span className={styles.leftTitle}>流转流程</span>
        <span
          className={styles.showBtn}
          onClick={() => {
            handler(6);
          }}
        >
          {openList.includes(6) ? '收起' : '展开'}
        </span>
      </div>
      {openList.includes(6) && (
        <Steps direction="vertical">
          {eventProcessInfo.map((item) => {
            return (
              <Step
                title={item.eventTaskActivitiName}
                key={item.eventTaskId}
                status="finish"
                description={
                  <>
                    <p>{item.eventTaskEndTime}</p>
                    <p>
                      {item.eventTaskHandleUserInfo.orgName}-
                      {item.eventTaskHandleUserInfo.roleName}-
                      {item.eventTaskHandleUserInfo.userName}
                    </p>
                    <p>{item.eventTaskRemark}</p>
                  </>
                }
              />
            );
          })}
        </Steps>
      )}
    </div>
  );
}
