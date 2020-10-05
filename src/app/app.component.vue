<template>
  <app-bar-component />
  <div class="container-fluid py-3">
    <router-view />
  </div>
  <div
    class="loader-container d-flex justify-content-center align-items-center"
    v-if="FullScreenLoader"
  >
    <div class="loader">
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
    </div>

    <div class="loader triangle">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>

    <div class="loader">
      <svg viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64"></rect>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts" />

<style lang="scss" src="../styles/index.scss" />
