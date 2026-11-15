<script setup>
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import BookForm from '@/components/BookForm.vue'

const store = useBooksStore()
const router = useRouter()

function onSave(data) {
  store.addBook(data)
  router.push({ name: 'books' })
}
</script>

<template>
  <section>
    <h1 class="mb-4">Pridať knihu</h1>
    <div class="col-lg-6">
      <BookForm @save="onSave" />
    </div>
  </section>
</template>