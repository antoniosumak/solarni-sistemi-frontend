<template>
  <div
    class="w-screen h-screen fixed inset-0 bg-overlay z-10 flex items-center justify-center"
  >
    <div
      :class="`modal p-8 bg-white rounded-md ${smallScreen} ${mediumScreen} ${bigScreen}`"
    >
      <div class="w-full flex justify-end">
        <XIcon class="w-4 mb-4" @click="$emit('toggle-modal')" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { XIcon } from '@heroicons/vue/solid';
export default defineComponent({
  components: { XIcon },
  props: {
    smallScreen: String,
    mediumScreen: String,
    bigScreen: String,
  },
  emits: ['toggle-modal'],
});
</script>
<style scoped>
.modal {
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 35%);
}
</style>
