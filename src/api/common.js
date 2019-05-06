import instance from '@/api/api/instance'

const URLS = {
  tagList: '/tags'
}

export function fetchTag (params) {
  return instance({
    method: 'post',
    url: URLS.tagList,
    opts: {
      data: params
    }
  })
}