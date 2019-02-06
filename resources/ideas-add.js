window.Vue = require('vue');

Vue.component('rowContainer', require('./components/RowContainer.vue').default);
Vue.component('row', require('./components/Row.vue').default);

const app = new Vue({
    el: '#app'
});
