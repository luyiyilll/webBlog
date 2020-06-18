import { request } from './request'
export function getRecordList (uid) {
  return request({
    url: 'record/recordList',
	method: 'post',
    params: {
     uid
    }
  })
}
export function getRecordsByTime() {
  return request({
    url: 'record/timerecordList',
	method: 'post'
  })
}

export function getRecordsByuId(uid) {
  return request({
    url: 'record/userrecordList',
	method: 'post',
	params: {
	 uid
	}
  })
}

export function updateRecord(recordId,recordContent) {
  return request({
    url: 'record/update',
	method: 'post',
	params: {
	 recordId,
	 recordContent
	}
  })
}

export function addRecord(userId,content) {
  return request({
    url: 'record/insert',
	method: 'post',
	params: {
	 userId,
	 content
	}
  })
}

export function deleteRecord(recordId) {
  return request({
    url: 'record/delete',
	method: 'post',
	params: {
	 recordId
	}
  })
}
