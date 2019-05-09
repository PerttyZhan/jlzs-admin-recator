import BlogList from '@/pages/information/blog'

export default {
  functional: true,
  render (h, {props}) {
    return h(BlogList, {
      props: props
    })
  }
}