<template>
  <div class="flex justify-end items-center px-6 bg-gray-50 py-4 w-full">
    <button-component
      :text="text ? text : 'Kreiraj'"
      :isLoading="isSubmitLoading"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from '../ButtonComponent.vue';
export default defineComponent({
  components: { ButtonComponent },
  props: ['isSubmitLoading', 'text'],
});
</script>
<style scoped></style>
