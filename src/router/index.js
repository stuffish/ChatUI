import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/pages/page_transition.vue'
import Index from '@/pages/index.vue'
import Chat from '@/pages/chat.vue'
import Overview from '@/pages/overview.vue'
import Skin from '@/pages/theme.vue'
import Pay from '@/pages/pay.vue'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [{
        path: '',
        component: Index
      }, {
        path: '/chat',
        name: 'Chat',
        component: Chat
      }, {
        path: '/overview',
        name: 'Overview',
        component: Overview
      }, {
        path: '/skin',
        name: 'Skin',
        component: Skin
      }, {
        path: '/pay',
        name: 'Pay',
        component: Pay
      }]
    }
  ]
})

export default router
