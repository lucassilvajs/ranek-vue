<template>
  <section>
    <h2>Endereço Envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizar">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

import {mapState} from "vuex";

import {api} from "@/services.js";
export default {
  name: "FinalizarCompra",
  components: {UsuarioForm},
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.id,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        }
      }
    }
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({name: "compras"})
      });
    },
    async criarUsuario(){
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario", this.$store.state.usuario.email);
        await this.criarTransacao();
      } catch (error) {
        console.error(error)
      }
		},
    finalizar() {
      if(this.$store.state.login){
        this.criarTransacao();
      }else{
        this.criarUsuario();
      }
    }
  }
}
</script>

<style scoped>
h2{
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>