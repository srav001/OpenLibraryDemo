<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useBooksStore } from '../stores/books';

const booksStore = useBooksStore();
const router = useRouter();

const errorObj = reactive({
	flag: false,
	msg: '',
	data: {}
});

const bookTitle = ref('');
const loading = ref(false);
// Making an API call to the Open Library API to search for books by title.
// eslint-disable-next-line consistent-return
const searchForBooksByTitle = async () => {
	try {
		loading.value = true;
		errorObj.flag = false;
		const { data: result } = await axios.get('http://openlibrary.org/search.json', {
			params: {
				title: bookTitle.value
			}
		});

		if (result.docs.length === 0) throw new Error('EMPTY_TITLE');

		booksStore.searchResults = result.docs;
		booksStore.setTopTenFromSeachResults();

		router.push('/list');

	} catch (error) {
		errorObj.flag = true;
		errorObj.data = error;

		if (error.message === 'EMPTY_TITLE') errorObj.msg = 'Oops... No books found. Please try again.';
		else if (bookTitle.value === '') errorObj.msg = 'Please enter book title to search';
		else errorObj.msg = 'Oops... an error occured. ';

	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<h2 class="text-center">Open Library Search</h2>
	<div class="flex items-center justify-center py-12 mx-6 border border-gray-200 shadow-md rounded-xl">
		<div class="mx-auto w-full max-w-[550px]">
			<form @submit.prevent="searchForBooksByTitle">
				<div class="-mx-3 flex flex-wrap justify-center">
					<div class="w-full px-3 sm:w-1/2">
						<div class="mb-5">
							<label for="bTitile" class="mb-3 block font-semibold"> Book Title </label>
							<input
								id="bTitile"
								type="text"
								name="bTitile"
								placeholder="Enter title to search here..."
								class="w-full rounded-xl border border-gray-300 bg-white py-3 px-6 font-medium text-[#6B7280] outline-none focus:border-indigo-500 focus:shadow-lg"
								@input="event => (bookTitle = event.target.value)" />
						</div>
					</div>
				</div>

				<div class="text-center">
					<button
						type="submit"
						:class="[
							!loading
								? 'text-white hover:border-green-600 hover:bg-green-600 cursor-pointer'
								: 'text-indigo-500 border-indigo-500 bg-white cursor-wait'
						]"
						class="transition rounded-xl py-3 px-8 text-center font-semibold shadow-md border border-indigo-500 bg-indigo-500"
						:disabled="loading">
						{{ loading ? 'loading...' : 'Submit' }}
					</button>
				</div>
			</form>
			<h3 v-if="errorObj.flag === true" class="text-center text-red-600 mt-10">{{ errorObj.msg }}</h3>
		</div>
	</div>
</template>
