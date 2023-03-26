import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key} from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store, key).use(router).use(Antd).mount('#app')
