/*
 @Author: 罗健媛
 @Date: 2024-09-04 16:16:02
 @LastEditTime: 2024-09-10 17:26:00
 @LastEditors: 罗健媛
 @Description: 
 */
import {
  DatePicker,
  Form,
  Input,
  Picker,
  Stepper,
  TextArea,
  Toast,
  Cascader
} from 'antd-mobile';
import dayjs from 'dayjs';
import Upload from '../Upload';
import PickerCheckList from '../WorkBenchForm/PickerCheckList';
import styles from './index.less';
import { useState, useEffect, useRef,useMemo } from 'react';
export const SelectDom = (props) => {
  const { name, label, columns, rules, disabled, readOnly } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      trigger="onConfirm"
      onClick={(e, pickerRef) => {
        readOnly
          ? Toast.show({ content: `${label}不可编辑修改` })
          : pickerRef.current?.open();
      }}
      rules={rules}
      disabled={disabled}
    >
      <Picker columns={[columns]}>
        {(value) => {
          let obj = value[0] || {};
          let label = obj.label || '请选择';
          return (
            <span
              style={{
                color: label !== '请选择' ? '#666666' : '#cccccc',
              }}
            >
              {label}
            </span>
          );
        }}
      </Picker>
    </Form.Item>
  );
};
export const CascaderDom = (props) => {
  const { name, label, columns, rules, disabled, readOnly } = props;
  const [valueToOptions, setValueToOptions] = useState({})
     
  const options = useMemo(() => {
    function generate(v){
      const options = valueToOptions[v]
      if (options === null) {
        return undefined
      }
      if (options === undefined) {
        return Cascader.optionSkeleton
      }
      return options.map(option => ({
        ...option,
        children: generate(option.value),
      }))
    }
    return generate('') ?? []
  }, [valueToOptions])


  useEffect(() => {
    fetchOptionsForValue('', 0)
  }, [])
  async function fetchOptionsForValue(v, level) {
    if (v in valueToOptions) return
    if (level >= 3) {
      setValueToOptions(prev => ({
        ...prev,
        [v]: null,
      }))
      return
    }
    const data = await mockDataFetch(v)
    const options =
      data === null
        ? null
        : data.map(entry => ({
            value: entry,
            label: entry,
          }))
    setValueToOptions(prev => ({
      ...prev,
      [v]: options,
    }))
  }
  return (
    <Form.Item
      name={name}
      label={label}
      trigger="onConfirm"
      onClick={(e, cascaderRef) => {
        readOnly
          ? Toast.show({ content: `${label}不可编辑修改` })
          : cascaderRef.current?.open();
      }}
      rules={rules}
      disabled={disabled}
    >
      <Cascader 
         onSelect={value => {
          value.forEach((v, index) => {
            fetchOptionsForValue(v, index + 1)
          })
        }}
      options={options}>
        {items => {
          if (items.every(item => item === null)) {
            return '未选择'
          } else {
            return items.map(item => item?.label ?? '未选择').join('-')
          }
        }}
      </Cascader>
    </Form.Item>
  );
};
export const InputDom = (props) => {
  const { name, label, rules, type, readOnly, placeholder } = props;
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input
        placeholder={placeholder}
        style={{
          '--color': type == 'inputReadOnly' ? '#cccccc' : '#666666',
        }}
        readOnly={readOnly}
      />
    </Form.Item>
  );
};
export const TextAreaDom = (props) => {
  const { name, label, rules, type, readOnly, placeholder } = props;

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <TextArea
        // placeholder={'请输入'}
        placeholder={placeholder}
        style={{
          '--color': type == 'inputReadOnly' ? '#cccccc' : '#666666',
        }}
        readOnly={readOnly}
        rows={4}
      />
    </Form.Item>
  );
};
export const InputNumber = (props) => {
  const { name, label, rules, readOnly } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      childElementPosition="right"
    >
      <Stepper digits={0} disabled={readOnly} />
    </Form.Item>
  );
};
export const DateDom = (props) => {
  const { name, label, rules, readOnly } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      trigger="onConfirm"
      onClick={(e, datePickerRef) => {
        readOnly
          ? datePickerRef.current?.open()
          : Toast.show({ content: `${label}不可编辑修改` });
      }}
    >
      <DatePicker precision="second">
        {(value) =>
          value ? (
            dayjs(value).format('YYYY-MM-DD HH:mm:ss')
          ) : (
            <span style={{ color: '#cccccc' }}>请选择</span>
          )
        }
      </DatePicker>
    </Form.Item>
  );
};
export const MultiSelect = (props) => {
  const { name, label, rules, dictResultList, value, readOnly } = props;
  let options = dictResultList.map((item) => ({
    label: item.meaning,
    value: item.code,
  }));
  return (
    <div className={styles.formWrapper}>
      <Form.Item
        name={name}
        label={label}
        onClick={(e, pickerCheckListRef) => {
          readOnly
            ? pickerCheckListRef.current?.open()
            : Toast.show({ content: `${label}不可编辑修改` });
        }}
        rules={rules}
        layout="horizontal"
      >
        <PickerCheckList
          options={options}
          multiple={true}
          specialStatuses={value}
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
    </div>
  );
};

export const UploadImgDom = (props) => {
  const { name, label, rules, maxCount, readOnly = true } = props;
  return (
    <Form.Item label={label} rules={rules} name={name}>
      <Upload maxCount={maxCount} deletable={!readOnly} />
      {/* <UploadTwo maxCount={maxCount} deletable={!readOnly} /> */}
    </Form.Item>
  );
};
export const GroupHeader = (props) => {
  const { label } = props;
  return (
    <div className={styles.headerwrapper}>
      <span>{label}</span>
    </div>
  );
};
export const SubGroupHeader = (props) => {
  const { label } = props;
  return (
    <div className={styles.subheaderwrapper}>
      <span>{label}</span>
    </div>
  );
};
export const JustRead = (props) => {
    const { name, label, } = props;
  return (
    <Form.Item name={name} label={label}>
      <Input
        // style={{
        //   '--color': type == 'inputReadOnly' ? '#cccccc' : '#666666',
        // }}
        readOnly={true}
      />
    </Form.Item>
  );
};
