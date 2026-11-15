<script setup>
import StarRating from './StarRating.vue'
import ProgressBar from './ProgressBar.vue'
import { STATUSES } from '@/constants'
import BookCover from './BookCover.vue'

defineProps({
  book: { type: Object, required: true }
})

const badgeClass = {
  'to-read': 'text-bg-info',
  reading: 'text-bg-warning',
  finished: 'text-bg-success'
}
</script>

<template>
  <div class="card h-100 shadow-sm">
    <BookCover :src="book.cover" :title="book.title" size="card" />
    <div class="card-body">
      <h5 class="card-title">
        <RouterLink :to="{ name: 'book', params: { id: book.id } }" class="stretched-link text-decoration-none">
          {{ book.title }}
        </RouterLink>
      </h5>
      <p class="card-subtitle text-muted mb-2">{{ book.author }} · {{ book.pages }} strán</p>
      <span class="badge rounded-pill mb-2" :class="badgeClass[book.status]">
        {{ STATUSES[book.status] }}
      </span>
      <ProgressBar
        v-if="book.status === 'reading'"
        class="mb-2"
        :value="book.currentPage"
        :max="book.pages"
        label="Prečítané"
      />
      <StarRating :model-value="book.rating" readonly />
    </div>
  </div>
</template>