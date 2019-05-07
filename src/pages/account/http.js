import instance from '@/api/api/instance'

const URLS = {
  catalogList: '/list/blog'
}

export function fetchAccountList (params) {
  return instance({
    method: 'post',
    url: URLS.catalogList,
    opts: {
      data: params
    }
  })
}