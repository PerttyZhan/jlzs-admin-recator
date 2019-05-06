import instance from '@/api/api/instance'

const URLS = {
  blogList: '/list/blog',
  typeList: '/type/blog'
}

export function fetchBlogList (params) {
  return instance({
    method: 'post',
    url: URLS.blogList,
    opts: {
      data: params
    }
  })
}

export function fetchBlogTypeList (params) {
  return instance({
    method: 'post',
    url: URLS.typeList,
    opts: {
      data: params
    }
  })
}