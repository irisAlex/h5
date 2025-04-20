/*
 * @Author: 罗健媛
 * @Date: 2023-11-15 17:33:19
 * @LastEditTime: 2024-09-10 11:47:40
 * @LastEditors: 罗健媛
 * @Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  ImageUploader,
  Toast,
  Dialog,
} from 'antd-mobile';
// import { imgUploadFn, batchDownloadBase64 } from '@/services/index.js';
import {uploadFilesApi} from '@/services/index.js';
import styles from './index.less';

const UploadImgApp = (props) => {
  console.log('props', props)
  const {
    placeholder = '*上传清晰的头像照片',
    color = '#FF5959',
    headSculpture,
    maxCount,
    value,
    deletable
  } = props;

  const [fileList, setFileList] = useState([]);

  const getPicList = async () => {
    let picRes = await batchDownloadBase64({ ids: value })
    if (picRes.code == '1' && picRes.data?.length > 0) {
      let newFileList = picRes.data.map(item => ({ fileId: item.fileId, url: `data:image/png;base64,${item.base64}` }))
      setFileList(newFileList)
    }
  }
  useEffect(() => {
    value && getPicList()
    // value && setFileList(value);
  }, [value]);

  //图片上传
  const mockUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", 'GSG');
    formData.append("accessLevel", 'PUBLIC_READ');
    return await uploadFilesApi(formData)
      // .then((response) => response.json())
      .then((res) => {
        if (res && res.code === '1') {
          return {
            fileId: res.data[0],
            url: URL.createObjectURL(file),
          };
        } else {
          Toast.show(`上传失败！`);
          return {
            fileId: '',
            url: '',
          };
        }
      });
  };

  const onChange = (items = []) => {
    setFileList(items);
    const { onChange } = props;
    if (onChange) {
      // onChange(items);
      onChange(items.map(item => item.fileId).join(","));
    }
  };
  // 限制上传大小
  const beforeUpload = (file) => {
    if (file.size > 1024 * 1024 * 10) {
      Toast.show('请选择小于 10M 的图片');
      return null;
    }
    return file;
  };

  return (
    <div className={styles.uploadBox}>
      <div>
        <ImageUploader
          value={fileList}
          onChange={onChange}
          upload={mockUpload}
          maxCount={maxCount}
          beforeUpload={beforeUpload}
          multiple
          preview
          showUpload={fileList.length < maxCount}
          onCountExceed={(exceed) => {
            Toast.show(
              `最多选择 ${props.maxCount} 张图片，你多选了 ${exceed} 张`,
            );
          }}
          deletable={deletable}
          onDelete={() => {
            return Dialog.confirm({
              content: '是否确认删除',
            });
          }}
        />
        {/* <div className={styles.uploadDesc} style={{ color }}>
            {placeholder}
          </div> */}
      </div>
    </div>
  );
};

export default UploadImgApp