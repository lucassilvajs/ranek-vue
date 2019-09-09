<template>
	<form>
		<input type="text" name="busca" id="busca" v-model="busca" placeholder="Buscar...">
		<input type="submit" value="Buscar" id="lupa" @click.prevent="buscarProdutos">
	</form>
</template>

<script>
export default {
	data() {
		return {
			busca: ""
		}
	},
	methods: {
		buscarProdutos() {
			this.$router.push({query: {q: this.busca}})
		}
	}
	};
</script>

<style scoped>
	form {
		max-width: 600px;
		margin:30px auto 60px auto;
		position: relative;
	}

	#busca {
		width: 100%;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(30, 60, 90, .1);
		border-radius: 4px;
	}

	#busca:focus,
	#busca:hover{
		transform: scale(1.1);
		box-shadow: 0 6px 12px rgba(30, 60, 90, .2);
	}

	#lupa{
		width: 62px;
		height: 62px;
		background: url(../assets/search.svg) no-repeat center center;
		text-indent: -150px;
		border: none;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;

	}
</style>