import { request } from '@umijs/max';

/*纠纷上报列表页 */
export async function selectHandleByPage(params, options) {
  return request('/api/eeds-gsg-event/cdEventEntity/selectHandleByPage', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 关闭
export function getMDJFDescBackItemApi(params) {
  return request(`/api/eeds-gsg-event/cdEventEntity/deptTaskReturn`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 基础信息
export function selectBasicInfo(params) {
  return request(`/api/eeds-gsg-event/cdEventEntity/selectBasicInfo`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 获取流转流程
export function selectEventProcessInfo(params) {
  return request(`/api/eeds-gsg-event/cdEventEntity/selectEventProcessInfo`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 调处记录
export function selectByPage(params) {
  return request(`/api/eeds-gsg-event/cdEventTaskDisputeMediateEntity/selectByPage`, {
    method: 'GET',
    params: {
      ...params,
      pageNumber:1,
      pageSize:100,
    },
  });
}

// 更新当事人信息
export function updateById(params = {}) {
  return request(`/api/eeds-gsg-event/cdEventEntity/updateById`, {
    method: 'POST',
    data: params,
  });
}
// 上传调处记录
export function insertMediateRecord(params = {}) {
  return request(`/api/eeds-gsg-event/cdEventTaskDisputeMediateEntity/insertRecord`, {
    method: 'POST',
    data: params,
  });
}

// 录音录像信息上传
export function insertAttachmentRecord(params = {}) {
  return request(`/api/eeds-gsg-event/cdEventAssociatedAttachmentEntity/insertRecord`, {
    method: 'POST',
    data: params,
  });
}
// 办结证据信息上传
export function insertEvidenceRecord(params = {}) {
  return request(`/api/eeds-gsg-event/cdEventAssociatedAttachmentEntity/insertEvidenceRecord`, {
    method: 'POST',
    data: params,
  });
}
// 上传文件
export function uploadFilesApi(data) {
  return request(`/api/mcp-file/upload`, {
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data', //重点：设置请求头
    },
  });
}

// 下载文件
export function downloadFile(params) {
  return request(`/api/mcp-file/downloadFile`, {
    method: 'GET',
    params: params,
    responseType: 'blob',
  });
}

// 上报
export function reportApi(params = {}) {
  return request(`/api/eeds-gsg-event/cdEventEntity/report`, {
    method: 'POST',
    data: params,
  });
}
// 获取纠纷类别的字典表
export function getMDJFCenterJiufenTypeApi(params) {
  return request(
    `/api/eeds-gsg-event/cdEventTypeEntity/selectAllEventTypesByKeyWords`,
    {
      method: 'GET',
      params: {
        ...params,
      },
    },
  );
}
// 获取案件来源
export function getPairsByType(params) {
  return request(
    `/api/eeds-gsg-event/baseInfo/eventManage/sysDict/getPairsByType`,
    {
      method: 'GET',
      params: {
        ...params,
      },
    },
  );
}
// 纠纷上报
export function register(params) {
  return request(`/api/eeds-gsg-event/cdEventEntity/register`, {
    method: 'POST',
    params: {
      ...params,
    },
  });
}
