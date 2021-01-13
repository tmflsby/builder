import Vue from 'vue'
import {
  Button,
  Tabs,
  TabPane,
  Input,
  Collapse,
  CollapseItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Tooltip,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Tooltip)

Vue.prototype.$confirm = MessageBox.confirm
