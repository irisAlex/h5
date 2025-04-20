// 基本信息
const baseInfo = [
  {
    name: 'caseTitle',
    label: '案件标题',
    rules: [{ required: true, message: '请输入案件标题' }],
    placeholder: '请输入案件标题',
    type: 'input',
  },

  {
    name: 'eventHappenArea',
    label: '纠纷属地',
    rules: [{ required: true, message: '请选择纠纷属地' }],
    placeholder: '请选择纠纷属地',
    type: 'cascader',
  },
  {
    name: 'eventType',
    label: '纠纷类型',
    rules: [{ required: true, message: '请选择纠纷类型' }],
    placeholder: '请选择纠纷类型',
    type: 'select',
    columns: [],
  },
  {
    name: 'eventSource',
    label: '案件来源',
    rules: [{ required: true, message: '请选择案件来源' }],
    placeholder: '请选择案件来源',
    type: 'select',
    columns: [],
  },
  {
    name: 'caseTime',
    label: '纠纷发生时间',
    rules: [{ required: true, message: '请选择纠纷发生时间' }],
    placeholder: '请选择纠纷发生时间',
    type: 'date',
  },
  {
    name: 'caseSummary',
    label: '纠纷情况',
    rules: [{ required: true, message: '请输入纠纷情况' }],
    placeholder: '请大致描述一下事件发现时间、地点以及大致情况',
    type: 'textarea',
  },
];
/**申请人信息 */
const applicantInfo = [
  {
    name: 'applicantType',
    label: '申请人类型',
    rules: [{ required: true, message: '请选择申请人类型' }],
    placeholder: '请选择申请人类型',
    type: 'select',
    columns: [
      {
        value: '01',
        label: '自然人',
      },
      {
        value: '02',
        label: '法人',
      },
      {
        value: '03',
        label: '非法人组织',
      },
    ],
    hidden: false,
  },
  {
    name: 'applicantName',
    label: '申请人姓名',
    rules: [{ required: true, message: '请输入申请人姓名' }],
    placeholder: '请输入申请人姓名',
    type: 'input',
    hidden: false,
  },
  {
    name: 'companyName',
    label: '单位名称',
    rules: [{ required: true, message: '请输入单位名称' }],
    placeholder: '请输入单位名称',
    type: 'input',
    hidden: true,
  },
  {
    name: 'creditCode',
    label: '信用代码',
    rules: [{ required: false, message: '请输入信用代码' }],
    placeholder: '请输入信用代码',
    type: 'input',
    hidden: true,
  },
  {
    name: 'applicantName',
    label: '机构代表人',
    rules: [{ required: false, message: '请输入机构代表人' }],
    placeholder: '请输入机构代表人',
    type: 'input',
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '法人性别',
    rules: [{ required: false, message: '请选择法人性别' }],
    placeholder: '请选择法人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '代表人性别',
    rules: [{ required: false, message: '请选择代表人性别' }],
    placeholder: '请选择代表人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '申请人性别',
    rules: [{ required: false, message: '请选择申请人性别' }],
    placeholder: '请选申请人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: false,
  },

  {
    name: 'applicantPhone',
    label: '联系电话',
    rules: [{ required: true, message: '请输入联系电话' }],
    placeholder: '请输入联系电话',
    type: 'input',
    hidden: false,
  },
  {
    name: 'applicantEmail',
    label: '邮箱',
    rules: [{ required: false, message: '请输邮箱' }],
    placeholder: '请输入邮箱',
    type: 'input',
    hidden: false,
  },
  {
    name: 'applicantIdCard',
    label: '身份证号',
    rules: [{ required: false, message: '请输入身份证号' }],
    placeholder: '请输入身份证号',
    type: 'input',
    hidden: false,
  },
  {
    name: 'personLiveAddress',
    label: '常驻地址',
    rules: [{ required: false, message: '请输入案件标题' }],
    placeholder: '请输入常驻地址',
    type: 'input',
    hidden: false,
  },
];
/**被申请人信息 */
const respondentInfo = [
  {
    name: 'applicantType',
    label: '申请人类型',
    rules: [{ required: true, message: '请选择申请人类型' }],
    placeholder: '请选择申请人类型',
    type: 'select',
    columns: [
      {
        value: '01',
        label: '自然人',
      },
      {
        value: '02',
        label: '法人',
      },
      {
        value: '03',
        label: '非法人组织',
      },
    ],
    hidden: false,
  },
  {
    name: 'applicantName',
    label: '被申请人姓名',
    rules: [{ required: true, message: '请输入申请人姓名' }],
    placeholder: '请输入申请人姓名',
    type: 'input',
    hidden: false,
  },
  {
    name: 'companyName',
    label: '单位名称',
    rules: [{ required: true, message: '请输入单位名称' }],
    placeholder: '请输入单位名称',
    type: 'input',
    hidden: true,
  },
  {
    name: 'creditCode',
    label: '信用代码',
    rules: [{ required: false, message: '请输入信用代码' }],
    placeholder: '请输入信用代码',
    type: 'input',
    hidden: true,
  },
  {
    name: 'applicantName',
    label: '机构代表人',
    rules: [{ required: false, message: '请输入机构代表人' }],
    placeholder: '请输入机构代表人',
    type: 'input',
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '法人性别',
    rules: [{ required: false, message: '请选择法人性别' }],
    placeholder: '请选择法人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '代表人性别',
    rules: [{ required: false, message: '请选择代表人性别' }],
    placeholder: '请选择代表人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: true,
  },
  {
    name: 'applicantSex',
    label: '申请人性别',
    rules: [{ required: false, message: '请选择申请人性别' }],
    placeholder: '请选申请人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: false,
  },

  {
    name: 'applicantPhone',
    label: '联系电话',
    rules: [{ required: true, message: '请输入联系电话' }],
    placeholder: '请输入联系电话',
    type: 'input',
    hidden: false,
  },
  {
    name: 'applicantEmail',
    label: '邮箱',
    rules: [{ required: false, message: '请输邮箱' }],
    placeholder: '请输入邮箱',
    type: 'input',
    hidden: false,
  },
  {
    name: 'applicantIdCard',
    label: '身份证号',
    rules: [{ required: false, message: '请输入身份证号' }],
    placeholder: '请输入身份证号',
    type: 'input',
    hidden: false,
  },
  {
    name: 'personLiveAddress',
    label: '常驻地址',
    rules: [{ required: false, message: '请输入案件标题' }],
    placeholder: '请输入常驻地址',
    type: 'input',
    hidden: false,
  },
];
/**代理人信息 */
const agentInfo = [
  {
    name: 'agentType',
    label: '委托类型',
    rules: [{ required: false, message: '请选择委托类型' }],
    placeholder: '请选择委托类型',
    type: 'select',
    columns: [
      {
        value: '01',
        label: '一般授权代理人',
      },
      {
        value: '02',
        label: '特别授权代理人',
      },
    ],
    hidden: false,
  },
  {
    name: 'agentName',
    label: '代理人姓名',
    rules: [{ required: true, message: '请输入代理人姓名' }],
    placeholder: '请输入代理人姓名',
    type: 'input',
    hidden: false,
  },
  {
    name: 'agentSex',
    label: '代理人性别',
    rules: [{ required: false, message: '请选择代理人性别' }],
    placeholder: '请选择代理人性别',
    type: 'select',
    columns: [
      {
        value: '1',
        label: '男',
      },
      {
        value: '2',
        label: '女',
      },
    ],
    hidden: false,
  },
  {
    name: 'agentPhone',
    label: '联系电话',
    rules: [{ required: true, message: '请输入联系电话' }],
    placeholder: '请输入联系电话',
    type: 'input',
    hidden: false,
  },
  {
    name: 'agentIdCard',
    label: '身份证号',
    rules: [{ required: false, message: '请输入身份证号' }],
    placeholder: '请输入身份证号',
    type: 'input',
    hidden: false,
  },
  {
    name: 'fileList',
    label: '授权委托书',
    rules: [{ required: true, message: '请上授权委托书' }],
    // placeholder: '上传清晰的头像照片',
    type: 'uploadImg',
    maxCount: 3,
  },
];

// 调处记录
const mediationRecords = [
  {
    name: 'mediatorName',
    label: '调解员姓名',
    rules: [{ required: true, message: '请输入调解员姓名' }],
    placeholder: '请输入调解员姓名',
    type: 'input',
  },
  {
    name: 'mediatePersonTel',
    label: '调解员手机号',
    rules: [{ required: true, message: '请输入调调解员手机号' }],
    placeholder: '请输入调解员手机号',
    type: 'input',
  },
  {
    name: 'mediateSuccess',
    label: '调解状态',
    rules: [{ required: true, message: '请选择调解状态' }],
    placeholder: '请选择调解状态',
    type: 'select',
    columns: [
      {
        name: '调解成功',
        id: '1',
      },
      {
        name: '调解失败',
        id: '0',
      },
    ],
  },
  {
    name: 'startTime',
    label: '调解开始时间',
    rules: [{ required: true, message: '请选择调调解开始时间' }],
    placeholder: '请选择调解开始时间',
    type: 'date',
  },
  {
    name: 'endTime',
    label: '调解结束时间',
    rules: [{ required: true, message: '请选择调解结束时间' }],
    placeholder: '请选择调解结束时间',
    type: 'date',
  },
  {
    name: 'mediateAddress',
    label: '调解地点',
    rules: [{ required: true, message: '请选择纠调解地点' }],
    placeholder: '请选择调解地点',
    type: 'date',
  },
  {
    name: 'mediateAmount',
    label: '案件标的额',
    rules: [{ required: true, message: '请输入案件标的额' }],
    placeholder: '请输入案件标的额',
    type: 'input',
  },
  {
    name: 'mediateRemark',
    label: '调解过程及结果',
    rules: [{ required: true, message: '请输入调解过程及结果' }],
    placeholder: '请输入调解过程及结果',
    type: 'textarea',
  },
  {
    name: 'asstMediatePersonName',
    label: '辅助调解员姓名',
    rules: [{ required: true, message: '请输入辅助调解员手姓名' }],
    placeholder: '请输入辅助调解员手姓名',
    type: 'input',
  },
  {
    name: 'asstMediatePersonTel',
    label: '辅助调解员手机号',
    rules: [{ required: true, message: '请输入辅助调解员手机号' }],
    placeholder: '请输入辅助调解员手机号',
    type: 'input',
  },
];
//  证据材料
const evidenceMaterials = [
  {
    label: '文书',
    type: 'groupheader',
    name: '111',
  },
  {
    label: '人民调解书',
    name: 'groupheader',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
  {
    label: '人民调解受理登记表',
    name: 'groupheader1',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
  {
    label: '证据材料',
    type: 'groupheader',
    name: '222',
  },
  {
    label: '身份证复印件',
    name: 'groupheader11',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
  {
    label: '起诉状',
    name: 'groupheade3r11',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
  {
    label: '证据材料',
    name: 'groupheader311',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
  {
    label: '录音录像',
    type: 'groupheader',
    name: '333',
  },
  {
    label: '录音录像',
    name: 'groupheader311s',
    rules: [{ required: true, message: '请上授权委托书' }],
    type: 'uploadImg',
    maxCount: 3,
  },
];
export const getFormListNew = () => {
  return {
    baseInfo,
    applicantInfo,
    respondentInfo,
    agentInfo,
    mediationRecords,
    evidenceMaterials,
  };
};

export {
  agentInfo,
  applicantInfo,
  baseInfo,
  evidenceMaterials,
  mediationRecords,
  respondentInfo,
};
