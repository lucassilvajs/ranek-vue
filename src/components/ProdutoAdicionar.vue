<template>
  <form action="" class="adicionar-produto">
    <labeL for="nome">Nome</labeL>
    <input type="text" id="nome" name="nome" v-model="produto.nome">
    
    <labeL for="preco">Preço (R$)</labeL>
    <input type="number" id="preco" name="preco" v-model="produto.preco">
    
    <labeL for="fotos">Fotos</labeL>
    <input type="file" id="fotos" name="fotos" ref="fotos">

    <labeL for="descricao">Descrição</labeL>
    <textarea name="descricao" id="descricao" rows="3" v-model="produto.descricao"></textarea>

    <input type="submit" class="btn" value="Adicionar Produto" @click.prevent="adicionarProduto">
  </form>
</template>

<script>
import {api} from "@/services.js" 
export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: '',
        preco: '',
        descricao: '',
        fotos: null,
        vendido: 'false'
      }
    }
  },
  methods: {
    formatarProduto(){
      this.produto.usuario_id = this.$store.state.usuario.id;
    },

    adicionarProduto(){
      this.formatarProduto();
      api.post("/produto", this.produto).then(() => {
        this.$store.dispatch("getUsuarioProdutos")
      })
    }
  }
}
</script>

<style scoped>
  .adicionar-produto {
    display: grid;
    grid-template-columns: 100px 1fr;
    text-align: center;
    margin-bottom: 60px;
  }

  .btn{
    grid-column: 2;

  }

</style>