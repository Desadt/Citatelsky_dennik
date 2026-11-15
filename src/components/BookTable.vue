<script setup>
import { STATUSES } from '@/constants'

defineProps({
  books: { type: Array, required: true }
})
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle bg-white">
      <thead class="table-primary">
        <tr>
          <th>Názov</th>
          <th>Autor</th>
          <th class="text-end">Strany</th>
          <th class="text-center">Hodnotenie</th>
          <th>Stav</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>
            <RouterLink :to="{ name: 'book', params: { id: book.id } }">{{ book.title }}</RouterLink>
          </td>
          <td>{{ book.author }}</td>
          <td class="text-end">{{ book.pages }}</td>
          <td class="text-center">{{ book.rating || '–' }}</td>
          <td>{{ STATUSES[book.status] }}</td>
        </tr>
        <tr v-if="!books.length">
          <td colspan="5" class="text-center text-muted">Žiadne knihy.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>