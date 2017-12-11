import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import VueMarkdown from 'vue-markdown';

Vue.component('vue-markdown', VueMarkdown);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  components: {
    VueMarkdown
  }
})
