<template>
  <form>
      <div class="usuario" v-if="mostrarDadosLogin">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" v-model="nome">
        
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="email">
        
        <label for="senha">Senha</label>
        <input type="password" name="senha" id="senha" v-model="senha">

      </div>
      
      <label for="cep">CEP</label>
      <input type="tel" @keyup="preencherCep" name="cep" id="cep" v-model="cep">
      
      <label for="rua">Rua</label>
      <input type="text" name="rua" id="rua" v-model="rua">
      
      <label for="numero">Número</label>
      <input type="text" name="numero" id="numero" v-model="numero">
      
      <label for="bairro">Bairro</label>
      <input type="text" name="bairro" id="bairro" v-model="bairro">
      
      <label for="cidade">Cidade</label>
      <input type="text" name="cidade" id="cidade" v-model="cidade">
      
      <label for="estado">Estado</label>
      <input type="text" name="estado" id="estado" v-model="estado">

        <div class="button">
            <slot></slot>
        </div>

  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
export default {
    computed: {
        ...mapFields({
            fields: ['nome', 'email', 'senha', 'rua', 'numero', 'cep', 'bairro', 'cidade', 'estado'],
            base: "usuario",
            mutation: "UPDATE_USUARIO"
        }),
        mostrarDadosLogin(){
            return (!this.$store.state.login || (this.$router.name == 'usuario-editar'));
        }
    },
    methods: {
        preencherCep() {
            
            const cep = this.cep.replace(/\D/g, "");
            if(cep.length == 8) {
                getCep(cep).then(c => {
                    console.log(c.data)
                    this.rua = c.data.logradouro
                    this.bairro = c.data.bairro
                    this.cidade = c.data.localidade
                    this.estado = c.data.uf
                })
            }
        }
    }
}
</script>

<style scoped>
form, .usuario{
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center
}

.usuario {
    grid-column: 1 / 3;
}

.button{
    grid-column: 2;
    margin-top: 10px;
}
</style>