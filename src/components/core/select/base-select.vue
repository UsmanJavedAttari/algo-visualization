<template>
  <div class="form-group">
    <label :for="labelSlug">{{ label }}</label>
    <select
      class="form-control"
      :id="labelSlug"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option v-if="!!placeholder" selected disabled>{{ placeholder }}</option>
      <option v-for="(item, i) in items" :key="i">
        {{ item }}
      </option>
      <option v-if="!items.length">No items found</option>
    </select>
    <small class="form-text text-muted" v-if="hint">{{ hint }}</small>
  </div>
</template>

<script lang="ts" src="./base-select.ts" />
