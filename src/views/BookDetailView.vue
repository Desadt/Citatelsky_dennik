<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import StarRating from '@/components/StarRating.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { STATUSES } from '@/constants'
import BookCover from '@/components/BookCover.vue'

const props = defineProps({
  id: { type: String, required: true }
})

const store = useBooksStore()
const router = useRouter()
const book = computed(() => store.getBookById(props.id))

const isEditingNote = ref(false)
const noteDraft = ref('')

function startEditNote() {
  noteDraft.value = book.value.note
  isEditingNote.value = true
}

function saveNote() {
  store.updateBook(props.id, { note: noteDraft.value.trim() })
  isEditingNote.value = false
}

function cancelEditNote() {
  isEditingNote.value = false
}

function remove() {
  if (confirm('Naozaj chceš odstrániť túto knihu?')) {
    store.removeBook(props.id)
    router.push({ name: 'books' })
  }
}
</script>

<template>
  <section v-if="book" class="card card-body shadow-sm">
    <div class="row g-4 align-items-center">
    <div class="col-md-4">
            <BookCover :src="book.cover" :title="book.title" size="detail" />
    </div>
    <div class="col-md-8">
    <h1 class="h2">{{ book.title }}</h1>
    <p class="text-muted">{{ book.author }} · {{ book.pages }} strán</p>

    <div class="mb-3">
      <label class="form-label">Stav</label>
      <select
        class="form-select w-auto"
        :value="book.status"
        @change="store.setStatus(book.id, $event.target.value)"
      >
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">{{ label }}</option>
      </select>
    </div>

    <div v-if="book.status !== 'to-read'" class="mb-3">
      <ProgressBar class="mb-2" :value="store.pagesReadOf(book)" :max="book.pages" label="Prečítané strany"/>
      <label class="form-label">
        Aktuálna strana: {{ store.pagesReadOf(book) }} / {{ book.pages }}
      </label>
      <input
        :id="'page-${book.id}'"
        type="number"
        class="form-control w-auto"
        min="0"
        :max="book.pages"
        :value="store.pagesReadOf(book)"
        @change="store.setCurrentPage(book.id, $event.target.value)"
      />
    </div>

    <div class="mb-3">
      <p class="form-label mb-1">Hodnotenie</p>
      <StarRating :model-value="book.rating" @update:model-value="store.updateBook(book.id, { rating: $event })"/>
    </div>

    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <p class="form-label mb-0">Poznámka</p>
        <button
          v-if="!isEditingNote"
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="startEditNote"
        >
          Upraviť
        </button>
      </div>

      <form v-if="isEditingNote" @submit.prevent="saveNote">
        <textarea v-model="noteDraft" rows="4" class="form-control mb-2"></textarea>
        <button type="submit" class="btn btn-primary btn-sm me-2">Uložiť</button>
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="cancelEditNote">
          Zrušiť
        </button>
      </form>

      <p v-else-if="book.note" class="fst-italic mb-0">{{ book.note }}</p>
      <p v-else class="text-muted mb-0">Zatiaľ bez poznámky.</p>
    </div>

    <button class="btn btn-danger" @click="remove">Odstrániť knihu</button>
    </div>
    </div>
  </section>

  <section v-else>
    <div class="alert alert-warning">Kniha nebola nájdená.</div>
    <RouterLink :to="{ name: 'books' }" class="btn btn-outline-primary">Späť na zoznam kníh</RouterLink>
  </section>
</template>