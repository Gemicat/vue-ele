import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from '../App';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
// import seller from '../components/seller/seller';

Vue.use(Router);
Vue.use(Resource);

const routes = [
  {
    path: '/',
    name: 'index',
    component: App,
    children: [{
      path: '/goods',
      component: goods,
    }, {
      path: '/ratings',
      component: ratings,
    }],
  },
];

export default new Router({
  linkActiveClass: 'active',
  routes,
});
