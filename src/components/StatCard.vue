<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true }
})
</script>

<template>
  <div class="card shadow-sm text-center h-100">
    <div class="card-body">
      <p class="text-muted mb-1">{{ label }}</p>
      <p class="display-6 fw-bold mb-0">{{ value }}</p>
    </div>
  </div>
</template>