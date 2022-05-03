<template>
  <button
    class="border border-gray-200 p-2 hover:border-gray-500 group"
    @click="$emit('ud-method')"
  >
    <PencilIcon
      v-if="isEdit"
      class="w-5 h-5 text-primary group-hover:text-darker"
    />
    <TrashIcon v-else class="w-5 h-5 text-primary group-hover:text-darker" />
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  PencilIcon,
  TrashIcon,
  DotsHorizontalIcon,
} from '@heroicons/vue/solid';
export default defineComponent({
  name: 'EditDeleteButton',
  props: {
    isEdit: Boolean,
  },
  components: {
    PencilIcon,
    TrashIcon,
    DotsHorizontalIcon,
  },
  emits: ['ud-method'],
});
</script>
<style></style>
