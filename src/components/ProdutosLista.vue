<template>
	<section class="produtos-container">
		<div v-if="produtos && produtos.length" class="produtos">
			<div v-for="produto in produtos" class="produto" :key="produto.id">
				<router-link to="/">
					<img v-if="produto.fotos" :src="produto.fotos[0]" :alt="produto.fotos[0].titulo">
					<p class="preco">{{produto.preco}}</p>
					<h2 class="titulo">
						{{produto.nome}}
					</h2>
					<p>{{produto.descricao}}</p>
				</router-link>
			</div>
		</div>
		<div v-else-if="produtos && produtos.length === 0" class="sem-resultados">
			<p>Busca sem resultados, tente outro termo</p>
		</div>
	</section>		
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
export default {
	data() {
		return {
			produtos: null,
			productsLimit: 10
		}
	},
	computed: {
		url() {
			
			const queryString = serialize(this.$route.query);

			return `/produto?_limit=${this.productsLimit}${queryString}`;
		}
	},
	methods: {
		getProdutos() {
			api.get(`${this.url}`).then(r => {
				this.produtos = r.data;
			})
		}
	},
	watch: {
		url() {
			this.getProdutos();
		}
	},
	created(){
		this.getProdutos();
	}
};
</script>

<style scoped>
	.produtos-container{
		max-width: 1000px;
		margin: 0 auto;
	}

	.produtos{
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 30px;
		margin:30px;
	}

	.produto {
		box-shadow: 0 4px 8px rgba(30, 60, 90, .1);
		padding: 10px;
		background: #fff;
		border-radius: 4px;
		transition: all .2s;
	}

	.produto:hover {
		box-shadow: 0 6px 12px rgba(30, 60, 90, .2);
		transform: scale(1.1);
		position: relative;
		z-index: 1;
	}

	.produto img {
		border-radius: 4px;
		margin-bottom: 20px;
	}

	.titulo {
		margin-bottom: 10px
	}

	.preco {
		font-weight: bold;
		color: #e80
	}

	.sem-resultados {
		text-align: center;
	}
</style>