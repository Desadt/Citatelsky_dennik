<script setup>
import { STATUSES } from '@/constants'

const search = defineModel('search', { default: '' })
const status = defineModel('status', { default: 'all' })

const statusOptions = { all: 'Všetky', ...STATUSES }
</script>

<template>
  <div class="row g-2 mb-4">
    <div class="col-md-8">
      <input v-model="search" type="search" class="form-control" placeholder="Hľadať podľa názvu..." />
    </div>
    <div class="col-md-4">
      <select v-model="status" class="form-select">
        <option v-for="(label, value) in statusOptions" :key="value" :value="value">{{ label }}</option>
      </select>
    </div>
  </div>
</template>