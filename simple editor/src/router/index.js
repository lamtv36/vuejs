import Vue from 'vue'
import Router from 'vue-router'
import Main from 'components/main'
// import GlyphView from 'components/GlyphView'
// import FloatWindow from 'components/FloatWindow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
  ]
})
