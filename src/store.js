// src/store.js
import { reactive } from 'vue';

const state = reactive({
	isLoading: false
});

const setLoading = (loading) => {
	state.isLoading = loading;
};

export default {
	state,
	setLoading
};
