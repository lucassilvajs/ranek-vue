<template>
  <section>
    <div v-if="vendas">
      <h2>vendas</h2>
      <div v-for="(venda, index) in vendas" :key="index"  class="produtos-wrapper">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="comprador"><span>Comprador: </span>{{venda.comprador_id}}</p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{key}}: {{value}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p v-else> Não tem nada </p>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import {mapState} from "vuex";
import {api} from "@/services.js";

export default {
  components: {
    ProdutoItem
  },
  data() {
    return {
      vendas: null
    }
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getvendas() {
        api.get(`/transacao?vendedor_id=${this.usuario.id}`).then(res => {
          this.vendas = res.data;
        })
    }
  },
  created() {
    if(this.login){
      this.getvendas();
    }
  },
  watch: {
    login() {
      this.getvendas();
    }
  }
}
</script>

<style scoped>

.produto-wrapper {
  margin-bottom: 40px;
}

.comprador span {
  color: #e80;
}

h2{
  margin-bottom: 20px;
}

.entrega{
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h3 {
  margin: 0;
  justify-self: end;
}

</style>