import {
    DateDom,
    GroupHeader,
    InputDom,
    InputNumber,
    MultiSelect,
    SelectDom,
    TextAreaDom,
    UploadImgDom,
    JustRead,
    SubGroupHeader,
    CascaderDom
  } from '@/components/FormItem';

  export const findDom = (el, index) => {
    if (el.type === 'select') {
      return <SelectDom {...el} key={el.name} />;
    }
    if (el.type === 'cascader') {
      return <CascaderDom {...el} key={el.name} />;
    }
    if (el.type === 'input') {
      return <InputDom {...el} key={el.name} />;
    }
    if (el.type === 'input_integer') {
      return <InputNumber {...el} key={el.name} />;
    }
    if (el.type === 'uploadImg') {
      return (
        <UploadImgDom
          {...el}
          key={el.name}
        />
      );
    }
    if (el.type === 'date') {
      return <DateDom {...el} key={el.name} />;
    }
    if (el.type === 'multiSelect') {
      return <MultiSelect {...el} key={el.name} />;
    }
    if (el.type === 'textarea') {
      return <TextAreaDom {...el} key={el.name} />;
    }
    if (el.type === 'groupheader') {
      return <GroupHeader {...el} key={el.name} />;
    }
    if (el.type === 'subgroupheader') {
      return <SubGroupHeader {...el} key={el.name} />;
    }
    if (el.type === 'justRead') {
      return <JustRead {...el} key={el.name} />;
    }
  };


  export const handleApplicantInfoFormList = (formList,applyType,hiddenArr=[]) => {
    let newFormList=[]
    if (applyType === '01') {
      newFormList = formList.map((item) => {
        if (
          item.label == '单位名称' ||
          item.label == '信用代码' ||
          item.label == '机构代表人' ||
          item.label == '代表人性别' ||
          item.label == '法人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    if (applyType === '02') {
      newFormList = formList.map((item) => {
        if (
          item.label == '申请人姓名' ||
          item.label == '代表人性别' ||
          item.label == '申请人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    if (applyType === '03') {
      newFormList = formList.map((item) => {
        if (
          item.label == '申请人姓名' ||
          item.label == '法人性别' ||
          item.label == '申请人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    return newFormList;
  }


  export const handleRespondentInfoFormList = (formList,applyType,hiddenArr=[]) => {
    let newFormList=[]
    if (applyType === '01') {
      newFormList = formList.map((item) => {
        if (
          item.label == '单位名称' ||
          item.label == '信用代码' ||
          item.label == '机构代表人' ||
          item.label == '代表人性别' ||
          item.label == '法人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    if (applyType === '02') {
      newFormList = formList.map((item) => {
        if (
          item.label == '被申请人姓名' ||
          item.label == '代表人性别' ||
          item.label == '申请人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    if (applyType === '03') {
      newFormList = formList.map((item) => {
        if (
          item.label == '被申请人姓名' ||
          item.label == '法人性别' ||
          item.label == '申请人性别'||
          hiddenArr.includes(item.label)
        ) {
          return { ...item, hidden: true };
        } else {
          return { ...item, hidden: false };
        }
      });
    }
    return newFormList
  }