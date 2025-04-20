import React, { useState, useEffect, useRef } from 'react';
import { history, connect } from 'umi';
import {
  Space,
  Toast,
  InfiniteScroll,
  List,
  Button,
  Divider,
  Grid,
  Dropdown,
  Calendar,
  CheckList,
  SearchBar,
  DatePickerView,
  Popup,
  Selector,
  TextArea,
  Collapse,
  SwipeAction,
  Form,
  Input,
  Picker,
  CascadePicker,
  DatePicker,
  Radio,
} from 'antd-mobile';
import dayjs from 'dayjs';

import styles from './index.less';

import { getRouteQuery } from '@/utils/common';

import PickerCheckList from './PickerCheckList';

import UploadImgApp from '@/components/Upload';
const genderArr = ['男', '女'];

const WorkBenchForm = (props) => {
  const {
    form,
    initialValues = {},
    formList = [],
    disabled = false,
    headSculpture = [],
    changeDate,
    idPhoto = [],
  } = props;
  console.log(formList, 'formList');
  const specialStatuses = form.getFieldValue('specialStatuses');

  // const {
  //   formValParam: { tableTwoResultVo },
  // } = useSelector((state) => state.global);

  const _formValParam = JSON.parse(localStorage.getItem('_formValParam'));

  let action = getRouteQuery(history, 'action');
  let recordId = getRouteQuery(history, 'recordId');

  // const [workForm] = Form.useForm();

  const getCardInfo = (idCard) => {
    console.log(idCard, 'idCard');
    // 提取出生日期
    let birthday = `${idCard.substring(6, 10)}-${idCard.substring(
      10,
      12,
    )}-${idCard.substring(12, 14)}`;

    // 提取性别
    let genderCode = idCard.charAt(16);
    let gender = genderCode % 2 === 0 ? 'CUSTOMER_2' : 'CUSTOMER_1';

    // 计算年龄
    let currentDate = new Date();
    let yearNow = currentDate.getFullYear();
    let age = yearNow - parseInt(birthday.substring(0, 4));
    return { age, birthday, gender };
  };
  /**自定义表单项 */
  const CustomChildren = (props) => {
    const { children = [], value = {} } = props;

    const triggerValue = (changedValue = {}) => {
      const { onChange } = props;
      if (onChange) {
        onChange({ ...value, ...changedValue });
      }
    };

    const onChange = (value, name) => {
      triggerValue({
        [name]: value,
      });
    };

    const onConfirmPicker = (value, name) => {
      triggerValue({
        [name]: value,
      });
    };

    return (
      <List>
        {children.map((item) => {
          const { label, name, itemType, columns } = item;
          if (itemType === 'input') {
            return (
              <List.Item
                key={name}
                extra={
                  <Input
                    placeholder="请输入"
                    clearable
                    onChange={(value) => onChange(value, name)}
                  />
                }
              >
                {label}
              </List.Item>
            );
          }
          if (itemType === 'picker') {
            return (
              <Picker
                columns={columns}
                onConfirm={(value) => onConfirmPicker(value, name)}
              >
                {(value) => {
                  let obj = value[0] || {};
                  let label = obj.label || '请选择';
                  return label;
                }}
              </Picker>
            );
          }
        })}
      </List>
    );
  };

  /**表单提交 */
  const onFinish = (values) => {
    const { onFinish } = props;
    if (onFinish) {
      onFinish(values);
    }
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
    // if(workForm){
    //   workForm.setFieldsValue({
    //     ...initialValues,
    //   });
    // }
  }, [initialValues]);
  //监听表单值
  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, formList, initialValues, 'changedValues');
    if (changedValues.nationalityCode) {
      if (changedValues.nationalityCode[0] !== 'CUSTOMER_156') {
        const newRules = formList.filter(
          (item) => item.label == '户籍所在地' || item.label == '民族',
        );
        newRules.forEach((item) => {
          item.rules[0].required = false;
        });
        form.validateFields();
      } else {
        const newRules = formList.filter(
          (item) => item.label == '户籍所在地' || item.label == '民族',
        );
        newRules.forEach((item) => {
          item.rules[0].required = true;
        });
        form.validateFields();
      }
    }
    const { tableTwoResultVo } = _formValParam;
    if (changeDate && Object.keys(changedValues)[0] == 'birthday') {
      changeDate('birthday', {}, changedValues.birthday);
    } else if (
      changeDate &&
      Object.keys(changedValues)[0] == 'certificateNum'
    ) {
      const value = changedValues.certificateNum;
      const rules =
        /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
      if (rules.test(value)) {
        const { cohabitants } = tableTwoResultVo;
        const isCards = cohabitants.find(
          (item) => item.certificateNum.toLowerCase() == value.toLowerCase(),
        );
        if (isCards) {
          Toast.show({
            content: '存在相同同住人身份证号',
          });
          form.setFieldValue('certificateNum', '');
        } else {
          changeDate('', getCardInfo(value));
        }
      }
    }
  };

  // useEffect(() => {
  //   // 获取所有输入元素
  //   var inputs = document.getElementsByTagName('input');

  //   // 遍历输入元素并添加焦点事件
  //   for (var i = 0; i < inputs.length; i++) {
  //     // 添加焦点事件处理函数
  //     inputs[i].addEventListener('focus', function () {
  // setTimeout(() => {
  //   window.scrollTo(0, 0);
  //   document.getElementsByTagName('body')[0].scrollTop = 0;
  // }, 200);
  //     });
  //   }
  // }, []);
  return (
    <Form
      name="baseInfo"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout={'horizontal'}
      mode={'card'}
      footer={null}
      disabled={disabled}
      className={styles.workBenchForm}
    // onValuesChange={onValuesChange}
    >
      {formList.map((item) => {
        const {
          fieldName,
          label,
          initialValue,
          itemRuleVoList = [],
          placeholder = '',
          itemType = 'input',
          dictResultList = [],
          options = [],
          disabled = false,
          children,
          multiple = false,
          layout = 'horizontal',
          group = false,
          value,
          valueLabel,
          maxCount,
          unit,
        } = item;

        if (children) {
          return (
            <Form.Item name={fieldName} label={label} rules={itemRuleVoList} key={fieldName}>
              <CustomChildren children={children} />
            </Form.Item>
          );
        }

        if (itemType === 'input' || itemType === 'inputReadOnly') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
              extra={
                unit ? (
                  <div
                    style={{
                      fontSize: 16,
                      color:
                        action == 'view'
                          ? '#666666'
                          : action !== 'view' && itemType == 'inputReadOnly'
                            ? '#cccccc'
                            : '#666666',
                    }}
                  >
                    {unit}
                  </div>
                ) : null
              }
            >
              <Input
                placeholder={'请输入'}
                style={{
                  '--text-align': 'right',
                  '--color':
                    action == 'view'
                      ? '#666666'
                      : action !== 'view' && itemType == 'inputReadOnly'
                        ? '#cccccc'
                        : '#666666',
                }}
                readOnly={label == '年龄' || itemType === 'inputReadOnly'}
              />
            </Form.Item>
          );
        }
        // if (itemType === 'inputReadOnly') {
        //   return (
        //     <Form.Item
        //       name={name}
        //       label={label}
        //       rules={rules}
        //       key={name}
        //       className={group === true ? styles.formItemGroup : null}
        //     >
        //       <Input
        //         placeholder={'请输入'}
        //         style={{
        //           '--font-size': '14px',
        //           '--text-align': 'right',
        //           '--color': '#888888',
        //           '--placeholder-color': '#888888',
        //         }}
        //         readOnly
        //       />
        //     </Form.Item>
        //   );
        // }
    

        if (itemType === 'header') {
          return <Form.Header key={name} />;
        }

        if (itemType === 'radio') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
            >
              <Radio.Group>
                <Space>
                  {options.map((item) => {
                    const { value, label } = item;
                    return (
                      <Radio
                        value={value}
                        key={value}
                        style={{ '--font-size': '15px' }}
                      >
                        {label}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </Form.Item>
          );
        }

        if (itemType === 'datePicker') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              rules={itemRuleVoList}
              trigger="onConfirm"
              onClick={(e, datePickerRef) => {
                datePickerRef.current?.open();
              }}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
            >
              <DatePicker min={new Date('1900-12-02')}>
                {(value) =>
                  value ? (
                    dayjs(value).format('YYYY-MM-DD')
                  ) : (
                    <span style={{ color: '#cccccc' }}>请选择</span>
                  )
                }
              </DatePicker>
            </Form.Item>
          );
        }

        if (itemType === 'cascadePicker') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              trigger="onConfirm"
              onClick={(e, cascadePickerRef) => {
                cascadePickerRef.current?.open();
              }}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
            >
              <CascadePicker options={options}>
                {(value) => {
                  let msg = '';
                  if (value.length > 0) {
                    value.forEach((item) => {
                      msg += item.label;
                    });
                  } else {
                    msg = '请选择';
                  }
                  return msg;
                }}
              </CascadePicker>
            </Form.Item>
          );
        }

        if (itemType === 'select') {
          let newColumns = dictResultList.map(item => ({ label: item.meaning, value: item.code }))
          return (
            <Form.Item
              name={fieldName}
              label={label}
              trigger="onConfirm"
              onClick={(e, pickerRef) => {
                console.log('pickerRef', pickerRef)
                itemType === 'select' && pickerRef.current?.open();
              }}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
            >
              <Picker columns={[newColumns]}>
                {(value) => {
                  console.log('value', value)
                  let obj = value[0] || {};
                  let label = obj.label || '请选择';
                  return (
                    <span
                      style={{
                        color:
                          label !== '请选择'  ? '#666666' : '#cccccc'
                      }}
                    >
                      {label}
                    </span>
                  );
                }}
              </Picker>
            </Form.Item>
          );
        }
        if (itemType === 'pickCheckList') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              onClick={(e, pickerCheckListRef) => {
                pickerCheckListRef.current?.open();
              }}
              rules={itemRuleVoList}
              key={fieldName}
              layout={layout}
              className={group === true ? styles.formItemGroup : null}
            >
              <PickerCheckList
                options={options}
                multiple={multiple}
                specialStatuses={specialStatuses}
              >
                {(values) => {
                  let arr = [];
                  options.forEach((item) => {
                    if (
                      values.indexOf(item.value) !== -1 &&
                      arr.indexOf(item.value === -1)
                    ) {
                      arr.push(item);
                    }
                  });
                  return (
                    <>
                      {arr.length > 0
                        ? arr.map((item) => {
                          const { value, label } = item;
                          return <div key={value}>{label}</div>;
                        })
                        : '请选择'}
                    </>
                  );
                }}
              </PickerCheckList>
            </Form.Item>
          );
        }
        if (itemType === 'upload') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
              layout="vertical"
            >
              <UploadImgApp
                placeholder={placeholder}
                maxCount={maxCount}
                headSculpture={headSculpture}
              />
            </Form.Item>
          );
        }
        if (itemType === 'newUpload') {
          return (
            <Form.Item
              name={fieldName}
              label={label}
              rules={itemRuleVoList}
              key={fieldName}
              className={group === true ? styles.formItemGroup : null}
              layout="vertical"
            >
              <UploadImgApp
                placeholder={placeholder}
                maxCount={maxCount}
                headSculpture={idPhoto}
              />
            </Form.Item>
          );
        }
      })}
    </Form>
  );
};
export default WorkBenchForm;
