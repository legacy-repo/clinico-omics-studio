import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import PermissionHelper from '@/utils/helper/permission'
import VueAnimated from '@codekraft-studio/vue-animated'
import VueClipboard from 'vue-clipboard2'

// import '@/components/use'
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(PermissionHelper)
Vue.use(require('vue-shortkey'))
Vue.use(Viser)
Vue.use(VueAnimated)
Vue.use(VueClipboard)
Vue.use(VueCropper)
Vue.use(VueStorage, config.storageOptions)
