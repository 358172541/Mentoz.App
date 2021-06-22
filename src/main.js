// import "core-js/stable"
// import "regenerator-runtime/runtime"

import Vue from 'vue'

import router from './plugins/router'
import store from './plugins/store'

import App from './App'

import {
    Button,
    Icon,
    Row,
    Col,
    Layout,
    Dropdown,
    Menu,
    Steps,
    Checkbox,
    FormModel,
    Input,
    Select,
    Switch,
    TreeSelect,
    Avatar,
    Badge,
    Card,
    Descriptions,
    Empty,
    List,
    Statistic,
    Table,
    Tabs,
    Tag,
    Timeline,
    Message,
    Modal,
    Popconfirm,
    Spin,
    Divider
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(TreeSelect)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Descriptions)
Vue.use(Empty)
Vue.use(List)
Vue.use(Statistic)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Timeline)
Vue.use(Message)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Spin)
Vue.use(Divider)

Vue.config.productionTip = false

Vue.prototype.$message = Message

/*
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})
*/

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')