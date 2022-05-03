<template>
  <div class="shadow pt-2 md:pt-8 w-full lg:w-6/12 mx-auto bg-white">
    <div class="mb-4 border-b pb-1 px-6 border-lightGray">
      <h2 class="font-bold text-xl">{{ title }}</h2>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: String,
  },
});
</script>
<style>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
