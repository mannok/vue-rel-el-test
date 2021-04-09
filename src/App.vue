<template>
	<ul>
		<li :ref="(el) => (divs[i] = el)" v-for="(item, i) in lists" :key="item">
			{{ item }}
		</li>
	</ul>
	<button @click="(evt) => lists.push(lists.length)">add one</button>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount, onMounted, reactive, onBeforeUpdate, watch } from 'vue';

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setup(): any {
		const vm = reactive({
			lists: [0, 1, 2, 3],
			divs: []
		});

		onBeforeMount(() => {
			watch(
				() => vm.divs,
				(to) => {
					console.log(`there are ${to.length} div`);
				}
			);
		});

		onMounted(() => {});

		onBeforeUpdate(() => {
			console.log('before update');
			vm.divs = [];
		});

		return vm;
	}
};
</script>

<style scoped lang="scss"></style>
