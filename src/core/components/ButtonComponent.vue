<template>
  <button
    :class="`${isFullWidth && 'w-full'} ${
      isOutlineButton && '!bg-white !text-error !border-error'
    } ${
      isDeleteButton && '!bg-error !border-error'
    } py-1 px-2 md:py-2 md:px-4 border border-primary bg-primary rounded-sm text-white flex items-center justify-center space-x-1`"
    @click="executeMethod()"
  >
    <plus-icon class="w-3" v-if="isCreateButton" />
    <p class="text-md">{{ text }}</p>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PlusIcon } from '@heroicons/vue/solid';
export default defineComponent({
  components: { PlusIcon },
  props: {
    text: String,
    isCreateButton: Boolean,
    isFullWidth: Boolean,
    isOutlineButton: Boolean,
    isDeleteButton: Boolean,
  },

  emits: ['execute-method'],

  methods: {
    executeMethod() {
      this.$emit('execute-method');
    },
  },
});
</script>
<style scoped></style>
