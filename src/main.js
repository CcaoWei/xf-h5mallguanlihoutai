import Vue from 'vue';
import App from './App';
import router from './router';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import store from './store';

import i18n from './lang'; // Internationalization
import './icons'; // icon
import './permission'; // permission control

import * as filters from './filters'; // global filters

import permission from '@/directive/permission/index.js'; // 权限判断指令

Vue.config.productionTip = Vue.config.devtools = Vue.config.performance = process.env.NODE_ENV !== 'production';

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value),
});

Vue.directive('permission', permission);

// register global utility filters.
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: (h) => h(App),
});