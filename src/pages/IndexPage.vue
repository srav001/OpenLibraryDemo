<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useBooksStore } from '../stores/books';

const booksStore = useBooksStore();

const bookTitle = ref('');
const loading = ref(false);
// Making an API call to the Open Library API to search for books by title.
const searchForBooksByTitle = () => {
	loading.value = true;
	axios
		.get('http://openlibrary.org/search.json', {
			params: {
				title: bookTitle.value
			}
		})
		.then(response => {
			const { data: result } = response;
			console.log(result.docs);
			booksStore.searchResults = result.docs;
		})
		.catch(error => {
			console.log(error);
		})
		.finally(() => {
			loading.value = false;
		});
};
</script>

<template>
	<div class="flex items-center justify-center p-12">
		<div class="mx-auto w-full max-w-[550px]">
			<form @submit.prevent="searchForBooksByTitle">
				<div class="-mx-3 flex flex-wrap">
					<div class="w-full px-3 sm:w-1/2">
						<div class="mb-5">
							<label for="bTitile" class="mb-3 block font-semibold"> Book Title </label>
							<input
								id="bTitile"
								type="text"
								name="bTitile"
								placeholder="Enter title to search here..."
								class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] outline-none focus:border-indigo-500 focus:shadow-lg"
								@input="event => (bookTitle = event.target.value)" />
						</div>
					</div>
				</div>

				<div>
					<button
						type="submit"
						:class="[!loading ? 'hover:text-indigo-500 hover:bg-white hover:shadow-lg cursor-pointer' : 'cursor-wait']"
						class="transition rounded-md py-3 px-8 text-center font-semibold shadow-md border border-indigo-500 bg-indigo-500 text-white"
						:disabled="loading">
						Submit
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
