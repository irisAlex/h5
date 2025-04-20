/*
 * @Author: 罗健媛
 * @Date: 2023-11-15 17:33:19
 * @LastEditTime: 2024-09-10 11:47:40
 * @LastEditors: 罗健媛
 * @Description: 原生调取手机相册和拍照
 */
import React, { useState, useEffect, useRef } from 'react';
import { Toast, Popup, Image, ImageViewer } from 'antd-mobile';
import { imgUploadFn, batchDownloadBase64, baseToId, } from '@/services/index.js';
import { MinusCircleOutline } from 'antd-mobile-icons';
import styles from './index.less';
import camera from '@/assets/images/camera.png';
import base64Data from './tempData'
const UploadImgApp = (props) => {
  const {
    placeholder = '*上传清晰的头像照片',
    color = '#FF5959',
    headSculpture,
    maxCount,
    value,
    deletable
  } = props;
  const [showChoicePop, setShowChoicePop] = useState(false); //是否打开照片上传类型的popup
  const [uploadPic, setUploadPic] = useState(); //当前点击上传组件的item
  // 唤起选择照片上传类型popup
  const handlwChoicePop = (visible, item) => {
    setShowChoicePop(visible);
    setUploadPic(item);
  };
  /*
  唤起原生摄像头
  type: systemCamera 普通相机
  type: customCamera 人脸相机相机
  */
  const H5callCamera = () => {
    console.log('唤起摄像头');
    if (
      localStorage.getItem('system') === 'ios' &&
      window.webkit &&
      window.webkit.messageHandlers.callCamera
    ) {
      window.webkit.messageHandlers.callCamera.postMessage({
        name: uploadPic,
        type: 'customCamera',
      });
    } else if (localStorage.getItem('system') == 'android') {
      if (window.Android) {
        window.Android.jsCall(
          'callCamera',
          JSON.stringify({ name: uploadPic, type: 'customCamera' }),
          'window.h5GetPictureData',
        );
      }
    }
  };
  // 唤起原生相册
  const H5callPhotoAlbum = () => {
    console.log('唤起相册');
    if (
      localStorage.getItem('system') === 'ios' &&
      window.webkit &&
      window.webkit.messageHandlers.callPhotoAlbum
    ) {
      window.webkit.messageHandlers.callPhotoAlbum.postMessage({
        name: uploadPic,
      });
    } else if (localStorage.getItem('system') == 'android') {
      if (window.Android) {
        window.Android.jsCall(
          'callPhotoAlbum',
          JSON.stringify({ name: uploadPic }),
          'window.h5GetPictureData',
        );
      }
    }
  };

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

  // 上传图片函数
  const mockUpload = async ({ name: index, base64 }) => {
    setShowChoicePop(false);
    const params = {
      fileBase64Code: base64,
      // fileBase64Code: base64Data,
      project: 'bzf-customer-center',
      folderName: 'bzf-customer-center',
      fileName: `pic${index}.jpeg`,
    };

    baseToId(params) //base64上传
      .then((res) => {
        if (res && res.code === '1' && res.data) {
          // res.data图片id
          let newFileList = [...fileList, { fileId: res.data, url: base64 }]
          const { onChange } = props;
          if (onChange) {
            onChange(newFileList.map(e => e.fileId).join(","));
          }
          setFileList(newFileList)
        } else {
          Toast.show('图片上传失败');
        }
      });
  };


  // 原生回调H5 拿到图片的base64
  window.h5GetPictureData = (data) => {
    mockUpload(JSON.parse(data));
  };
  const deletPic = (item) => {
    let newFileList = fileList.filter(el => el.fileId !== item.fileId)
    const { onChange } = props;
    if (onChange) {
      onChange(newFileList.map(e => e.fileId).join(","));
    }
    setFileList(newFileList)
  }
  return (
    <div className={styles.uploadTwoWrapper}>
      <div className={styles.fileList}>
        {fileList.map((item, index) => {
          return <div className={styles.fileUp}>
            <Image
              // src={`data:image/png;base64,${base64Data}`}
              src={item.url}
              key={index}
              className={styles.fileUp}
              style={{ marginRight: '5px' }}
              onClick={() => {
                ImageViewer.Multi.show({ images: fileList.map(item => item.url) })
              }}
            />
            <span
              className={styles.close}
              onClick={() => { deletPic(item) }}
            >
              <MinusCircleOutline />
            </span></div>
        })}
        {fileList.length < maxCount && (
          <div
            className={styles.fileUp}
            style={{ marginRight: '5px' }}
            onClick={() => handlwChoicePop(true, 0)}
          >
            <img width={20} src={camera} />
          </div>
        )}
      </div>
      {/* 上传照片选择弹框 */}
      {/* <div className="upLoadPopWrapper"> */}
      <Popup
        visible={showChoicePop}
        bodyStyle={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            width: '85vw',
          }}
        >
          <p
            style={{
              borderBottom: '0.5px solid rgba(0,0,0,0.2)',
              lineHeight: '58px',
              marginBottom: '0px',
            }}
            onClick={H5callCamera}
          >
            拍照
          </p>
          <p
            style={{
              lineHeight: '58px',
              marginBottom: '0px',
              position: 'relative',
            }}
            onClick={H5callPhotoAlbum}
          >
            从手机相册获取
          </p>
        </div>
        <p
          style={{
            background: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            lineHeight: '58px',
            width: '85vw',
            marginTop: '10px',
          }}
          onClick={() => {
            handlwChoicePop(false);
          }}
        >
          取消
        </p>
      </Popup>
      {/* </div> */}
    </div>

  );
};

export default UploadImgApp