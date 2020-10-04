<template>
  <button class="btn" :disabled="disabled || loading" v-bind="$attrs">
    <span
      class="spinner-border spinner-border-sm d-inline-block"
      :class="{ 'mr-1': $slots.loading }"
      v-if="loading"
    />
    <slot v-if="!loading || (loading && !$slots.loading)" />
    <slot v-else name="loading" />
  </button>
</template>

<script lang="ts" src="./base-btn.component.ts" />
