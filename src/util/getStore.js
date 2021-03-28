//此处是公共数据区域，类似于Vuex
import {
  ref
} from 'vue'

//对store使用 toRefs 也能达到同样的效果
export const store = {
  addressRef: ref(""), //经纬度字符串
  // longitudeRef: ref(0) , //经度
  // latitudeRef: ref(0) , //维度
  isRegister:ref(false),//是否处于正在注册状态
  isLogin:ref(""),//正在登录吗？
}
