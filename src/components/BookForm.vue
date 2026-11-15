<template>
  <form class="card card-body shadow-sm" @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label">Názov</label>
      <input v-model="form.title" type="text" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Autor</label>
      <input v-model="form.author" type="text" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Počet strán</label>
      <input v-model.number="form.pages" type="number" min="0" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Stav</label>
      <select v-model="form.status" class="form-select">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">{{ label }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Poznámka</label>
      <textarea v-model="form.note" rows="3" class="form-control"></textarea>
    </div>
    <div class="mb-3">
        <label class="form-label">URL obrázka obalu (Obrázok nájdite ideálne na 
            <a href="https://openlibrary.org/" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Open Library</a>)
        </label>
        <input v-model="form.cover" type="url" class="form-control" placeholder="https://..." />
    </div>
    <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
    <button type="submit" class="btn btn-primary">Uložiť knihu</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { STATUSES } from '@/constants'

const emit = defineEmits(['save'])

const form = reactive({
  title: '',
  author: '',
  pages: 0,
  status: 'to-read',
  note: ''
})
const error = ref('')

function submit() {
  if (!form.title.trim()) {
    error.value = 'Názov knihy je povinný.'
    return
  }
  error.value = ''
  emit('save', {
    ...form,
    title: form.title.trim(),
    pages: Number(form.pages) || 0
  })
}
</script>