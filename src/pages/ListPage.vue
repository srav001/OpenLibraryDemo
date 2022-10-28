<script>
import { useBooksStore } from '../stores/books';

export default {
	setup() {
		const booksStore = useBooksStore();

		return { booksStore };
	},
	computed: {
		topBooks() {
			return this.booksStore.topTenOfSearched;
		}
	}
};
</script>

<template>
	<div class="grid grid-cols-3 gap-3 px-2 py-1">
		<div
			v-for="(book, index) in topBooks"
			:key="index"
			class="max-w-sm rounded-xl overflow-hidden shadow-lg border border-indigo-500 my-1">
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">{{ book.title }}</div>
				<p class="text-gray-700 text-base">Edition Count: {{ book.edition_count }}</p>
			</div>
		</div>
	</div>
</template>
