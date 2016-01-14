import 'babel-polyfill';
import Vue from 'vue';

import Resource from 'vue-resource';
import Task from './components/task.vue';
import TaskItem from './components/task-item.vue';
import TaskFilter from './filters/task-filter';

import Rx from 'rx';
import VueRx from 'vue-rx';

Vue.use(Resource);
Vue.use(VueRx,Rx);

Vue.filter('task',TaskFilter);

Vue.component('task-item',TaskItem);
Vue.component('task',Task);
new Vue({
  el: '#app'
  
});
