<template>
	<div id="app">
		<LoadingOverlay />
		<div v-if="!isAuthenticated">
			<img alt="Vue logo" src="./assets/favicon.svg"> 
			<h1>Welcome to Project VAT</h1>
			<FirebaseLogin @login-success="onLoginSuccess" />
		</div>
		<div v-else>
			<h1>Bienvenido a tu aplicación Vue.js {{ this.user ? this.user["displayName"] : "" }}</h1>
			<button @click="logout">Logout</button>
			<UploadDoc />
		</div>
	</div>
</template>

<script>
import { ref, provide } from 'vue';
import UploadDoc from './components/UploadDoc.vue';
import FirebaseLogin from './components/FirebaseLogin.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import { auth } from './firebaseConfig';

export default {
	name: 'App',
	components: {
		UploadDoc,
		FirebaseLogin,
		LoadingOverlay
	},
	setup() {
		const user = ref(null);
		const isAuthenticated = ref(false);
		const isLoading = ref(false);

		provide('isLoading', isLoading);

		auth.onAuthStateChanged(currentUser => {
			isLoading.value = true;
			if (currentUser) {
				user.value = currentUser;
				isAuthenticated.value = true;
			} else {
				user.value = null;
				isAuthenticated.value = false;
			}
			isLoading.value = false;
		});

		const onLoginSuccess = (loggedInUser) => {
			isLoading.value = true;
			user.value = loggedInUser;
			isAuthenticated.value = true;
			isLoading.value = false;
		};

		const logout = async () => {
			isLoading.value = true;
			await auth.signOut();
			user.value = null;
			isAuthenticated.value = false;
			isLoading.value = false;
		};

		const startLoad = () => {
			isLoading.value = true;
			setTimeout(() => {
				isLoading.value = false;
			}, "5000");
		}

		return {
			user,
			isAuthenticated,
			onLoginSuccess,
			logout,
			startLoad,
			isLoading
		};
	}
};
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
