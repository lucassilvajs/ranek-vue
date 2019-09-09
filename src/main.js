import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PaginaCarregando from "@/components/PaginaCarregando.vue";

Vue.config.productionTip = false

Vue.component("PaginaCarregando", PaginaCarregando);

Vue.filter("numeroPreco", valor => {
	valor = Number(valor)
	console.log(valor);
	if(!isNaN(valor)){
		valor = valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
	}else{
		valor = '';
	}
	return valor;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
