<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' }
})

const percent = computed(() =>
  props.max > 0 ? Math.round((props.value / props.max) * 100) : 0
)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between small text-muted mb-1">
      <span>{{ label }}</span>
      <span>{{ percent }} %</span>
    </div>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>