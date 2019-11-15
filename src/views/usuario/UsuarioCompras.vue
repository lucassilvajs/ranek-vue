<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div v-for="(compra, index) in compras" :key="index"  class="produtos-wrapper">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor"><span>Vendedor: </span>{{compra.vendedor_id}}</p>
        </ProdutoItem>
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
      compras: null
    }
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
        api.get(`/transacao?comprador_id=${this.usuario.id}`).then(res => {
          this.compras = res.data;
        })
    }
  },
  created() {
    if(this.login){
      this.getCompras();
    }
  },
  watch: {
    login() {
      this.getCompras();
    }
  }
}
</script>

<style scoped>

.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2{
  margin-bottom: 20px;
}

</style>