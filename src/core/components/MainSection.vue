<template>
  <section
    class="w-full main-section overflow-y-scroll p-4 sm:px-16 sm:py-8 bg-sectionBackground"
  >
    <h1 class="text-darker mb-4 md:mb-8 text-4xl font-bold">{{ title }}</h1>
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: String,
  },
});
</script>
<style scoped>
.main-section {
  height: calc(100vh - 4rem);
}
</style>
