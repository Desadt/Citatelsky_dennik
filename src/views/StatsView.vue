<script setup>
import { useBooksStore } from '@/stores/books'
import StatCard from '@/components/StatCard.vue'
import BookTable from '@/components/BookTable.vue'

const store = useBooksStore()
</script>

<template>
  <section>
    <h1 class="mb-4">Štatistiky</h1>

    <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
      <div class="col"><StatCard label="Celkom kníh" :value="store.stats.total" /></div>
      <div class="col"><StatCard label="Prečítané knihy" :value="store.stats.finished" /></div>
      <div class="col"><StatCard label="Prečítané strany" :value="store.stats.pagesRead" /></div>
      <div class="col"><StatCard label="Priemerné hodnotenie" :value="store.stats.avgRating" /></div>
    </div>

    <h2 class="h4 mb-3">Prečítané knihy</h2>
    <BookTable :books="store.finishedBooks" />
  </section>
</template>