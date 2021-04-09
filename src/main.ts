import { createApp } from 'vue';
import App from './App.vue';

(async (): Promise<void> => {
	const app = createApp(App);

	window.vm = app.mount('#app');
})();
