/**
 * Created by wangjun on 2018/1/25.
 * Change bu zero on 2018/03/02
 */
/* 默认组件输出 */
// export {default as loadingWrap} from '../components/HOC/loadingWrap/'

import Loading from '../components/HOC/LoadableInLoading'
import loadingWrap from '../components/HOC/loadingWrap'
import TableItemInput from '../components/HOC/TableItemInput' // 表格输入框
import TableItemSelect from '../components/HOC/TableItemSelect' // 表格选择框
import Import from '../components/HOC/Import' // 导入组件
import Attachment from '../components/HOC/Attachment' // 导入组件
import TableFooter from '../components/HOC/TableFooter' //  表格底部
import Popup from '../components/HOC/Popup' // 弹框
import UploadImage from '../components/HOC/UploadImage' // 图片上传组件

export {
  loadingWrap,
  Loading,
  TableItemInput,
  TableItemSelect,
  Import,
  Attachment,
  TableFooter,
  Popup,
  UploadImage
}
