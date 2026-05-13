import App from './App'
import store from './store'
import backOrHome from '@/utils/back.js'
import uploadImage from '@/utils/uploadImage.js'
// import messages from './locale/index'

// let i18nConfig = {
// 	legacy: false, // 必须设置为false以使用Composition API模式
// 	locale: uni.getLocale(),
// 	messages
// }

// #ifndef VUE3
import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$backOrHome = backOrHome
Vue.prototype.$uploadImage = uploadImage

App.mpType = 'app'
const app = new Vue({
	// i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
// import {
// 	createI18n
// } from 'vue-i18n'
// const i18n = createI18n(i18nConfig)
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$backOrHome = backOrHome
	app.config.globalProperties.$uploadImage = uploadImage
	
	return {
		app
	}
}
// #endif