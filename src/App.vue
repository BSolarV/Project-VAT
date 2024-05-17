<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<h1>Bienvenido a tu aplicación Vue.js</h1>
		<UploadDoc />
	</div>
</template>

<script>
import UploadDoc from './components/UploadDoc.vue'

export default {
	name: 'App',
	components: {
		UploadDoc
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>