import Vue from 'vue'
import {
  Button,
  Input,
  Table,
  TableColumn,
  Pagination,
  Cascader,
  Radio,
  Select,
  Option,
  InputNumber,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  RadioGroup,
  Alert,
  Drawer,
  Upload,
  Progress,
  Tooltip,
  Col,
  Row,
  Scrollbar,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Carousel,
  CarouselItem,
  Message,
  MessageBox,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(Alert)
Vue.use(Drawer)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading.directive)

const msgbox = MessageBox
const { prompt, alert, confirm } = msgbox
Vue.prototype.$msgbox = msgbox
Vue.prototype.$alert = alert
Vue.prototype.$confirm = confirm
Vue.prototype.$prompt = prompt
Vue.prototype.$message = Message
