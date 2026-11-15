<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  title: { type: String, required: true },
  size: { type: String, default: 'card' } // 'card' alebo 'detail'
})

const failed = ref(false)
const showImage = computed(() => props.src && !failed.value)
</script>

<template>
  <div class="book-cover" :class="`book-cover--${size}`">
    <img
      v-if="showImage"
      :src="src"
      :alt="`Obal knihy ${title}`"
      loading="lazy"
      @error="failed = true"
    />
    <div v-else class="book-cover__placeholder">
      <span>{{ title }}</span>
    </div>
  </div>
</template>