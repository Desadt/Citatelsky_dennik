<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const stars = [1, 2, 3, 4, 5]

function select(value) {
  if (!props.readonly) emit('update:modelValue', value)
}
</script>

<template>
  <div class="d-flex gap-1">
    <button
      v-for="n in stars"
      :key="n"
      type="button"
      class="btn btn-link p-0 fs-4 text-decoration-none"
      :class="n <= modelValue ? 'text-warning' : 'text-secondary'"
      :disabled="readonly"
      :aria-label="'${n} hviezdičiek'"
      @click="select(n)"
    >★</button>
  </div>
</template>