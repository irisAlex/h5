import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useEffect,
} from 'react';
import {
  Button,
  CheckList,
  Popup,
  SearchBar,
  Space,
  Checkbox,
} from 'antd-mobile';
import styles from './index.less';
/**CheckList选择器 */

const PickerCheckList = memo(
  forwardRef((props, ref) => {
    const {
      value = [],
      options = [],
      extra,
      multiple = false,
      children,
      title = '',
      specialStatuses,
    } = props;

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      if (specialStatuses) {
        setSelected(specialStatuses);
      }
    }, [specialStatuses]);

    const actions = {
      toggle: () => {
        setVisible((v) => !v);
      },
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    };
    useImperativeHandle(ref, () => actions);

    const onChange = (changeValue) => {
      setSelected(changeValue);
    };

    const onCancel = () => {
      // setSelected([]);
      setVisible(false);
    };

    const onSubmit = () => {
      const { onChange } = props;
      if (onChange) {
        onChange(selected);
      }
      // setSelected([]);
      setVisible(false);
    };
    return (
      <>
        {children && children(value)}
        <Popup
          visible={visible}
          // forceRender={true}
          onMaskClick={() => {
            setVisible(false);
          }}
          // getContainer={false}
        >
          <div className={styles.pickerCheckListHeader}>
            <div
              className={styles.pickerCheckListHeaderButton}
              onClick={onCancel}
            >
              取消
            </div>
            <div className={styles.pickerCheckListHeaderTitle}>{title}</div>
            <div
              className={styles.pickerCheckListHeaderButton}
              onClick={onSubmit}
            >
              确定
            </div>
          </div>
          <div className={styles.pickerCheckListBody}>
            <CheckList
              className={styles.myCheckList}
              onChange={onChange}
              extra={extra}
              multiple={multiple}
              value={selected}
            >
              {options.map((item) => {
                const { value, label } = item;
                return (
                  <CheckList.Item key={value} value={value}>
                    {label}
                  </CheckList.Item>
                );
              })}
            </CheckList>
            {/* <Checkbox.Group onChange={onChange}>
              <Space direction="vertical">
              {options.map((item) => {
                const { value, label } = item;
                return (
                  <Checkbox key={value} value={value}>
                    {label}
                  </Checkbox>
                );
              })}
              </Space>
            </Checkbox.Group> */}
          </div>
        </Popup>
      </>
    );
  }),
);

export default PickerCheckList;
