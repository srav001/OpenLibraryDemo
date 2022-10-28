import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
	state: () => ({ searchResults: [], topTenOfSearched: [] })
});
