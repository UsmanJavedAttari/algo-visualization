<template>
  <div class="form-group">
    <label :for="labelSlug">{{ label }}</label>
    <input
      class="form-control"
      :id="labelSlug"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <small class="form-text text-muted" v-if="hint">{{ hint }}</small>
  </div>
</template>

<script lang="ts" src="./base-input.ts" />
