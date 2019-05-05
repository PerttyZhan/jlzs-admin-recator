import instance from '@/api/api/instance'

const URLS = {
  blogList: '/list/blog'
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
