<script setup>
import { useBooksStore } from '@/stores/books'
import FilterBar from '@/components/FilterBar.vue'
import BookCard from '@/components/BookCard.vue'

const store = useBooksStore()
</script>

<template>
  <section>
    <h1 class="mb-4">Moje knihy</h1>

    <FilterBar
      v-model:search="store.filters.search"
      v-model:status="store.filters.status"
    />

    <div class="row row-cols-1 row-cols-md-3 g-3">
      <div v-for="book in store.filteredBooks" :key="book.id" class="col">
        <BookCard :book="book" />
      </div>
    </div>
    <p v-if="!store.filteredBooks.length" class="mt-3 text-muted">Nič sa nenašlo.</p>
  </section>
</template>