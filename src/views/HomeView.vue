<script setup>
import { useBooksStore } from '@/stores/books'
import BookCard from '@/components/BookCard.vue'
import StatCard from '@/components/StatCard.vue'

const store = useBooksStore()
</script>

<template>
  <section>
    <h1 class="mb-4">Vitaj v čitateľskom denníku</h1>

    <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
      <div class="col"><StatCard label="Kníh v zbierke" :value="store.stats.total" /></div>
      <div class="col"><StatCard label="Prečítané" :value="store.stats.finished" /></div>
    </div>

    <h2 class="h4 mb-3">Práve čítam</h2>
    <div class="row row-cols-1 row-cols-md-3 g-3">
      <div v-for="book in store.readingBooks" :key="book.id" class="col">
        <BookCard :book="book" />
      </div>
    </div>
    <p v-if="!store.readingBooks.length" class="mt-3">
      Momentálne nečítaš nič.
      <RouterLink :to="{ name: 'books' }">Vyber si knihu</RouterLink>.
    </p>
  </section>
</template>