import { defineStore } from 'pinia';
import { orderBy, slice } from 'lodash-es';

export const useBooksStore = defineStore('books', {
	state: () => ({ searchResults: [], topTenOfSearched: [] }),
	actions: {
		/* Sorting the search results by edition count and then slicing the first 10 results. */
		setTopTenFromSeachResults() {
			const sortedSearchResults = orderBy(this.searchResults, [book => book.edition_count], ['desc']);

			this.topTenOfSearched = slice(sortedSearchResults, 0, 10);
		}
	}
});
