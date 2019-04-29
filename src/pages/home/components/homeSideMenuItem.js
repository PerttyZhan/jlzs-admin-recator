export default {
  functional: true,
  props: {
    menuData: {
      type: Object,
      default () {
        return {
          title: "",
          menuCode: "",
          icon: "",

        }
      }
    }
  },
  render (h, {props, children}) {
    let { menuData } = props
    console.log(menuData)
    if (menuData.children) {        // 有子菜单
      return h('el-submenu', {
        props: {index: menuData.menuCode},
        scopedSlots: {
          // title: props => [
          //   h('i', {'class': menuData.icon}),
          //   h('span', {}, menuData.title)
          // ]
          title: props => {console.log(props); return h('span', {}, menuData.title)}
        }
      }, menuData.children.map(menu => h('el-menu-item', {
        props: {index: menu.router},
        scopedSlots: {
          title: props => h('span', {}, menu.title)
        }
      }, [
        h('i', {'class': menu.icon})
      ])))
    } else {
      return h('el-menu-item', {
        props: {index: menuData.router},
        scopedSlots: {
          title: () => h('span', {}, menuData.title)
        }
      }, [
        h('i', {'class': menuData.icon})
      ])
    }
  }
}