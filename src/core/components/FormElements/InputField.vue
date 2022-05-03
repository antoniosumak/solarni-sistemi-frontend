<template>
  <div :class="`py-3 `">
    <label v-if="label">
      {{ label }}
      <span v-if="required" class="text-orange-600 pl-0.5">*</span>
    </label>
    <div :class="` mt-1 flex flex-col justify-center w-full relative `">
      <input
        :name="name"
        :id="id"
        :disabled="disabled ? disabled : false"
        :placeholder="placeholder"
        :type="type ? type : 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @change="fileUpload"
        :class="`p-2 leading-normal w-full border ${
          isError ? 'border-error' : 'border-grey'
        } text-dark bg-white font-sans rounded-md text-left appearance-none relative outline-none focus:border-primary  shadow-sm`"
      />
    </div>
    <span v-if="isError" class="error-message text-sm text-error">{{
      errorMessage
    }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: [
    'modelValue',
    'isError',
    'label',
    'errorMessage',
    'required',
    'noGrid',
    'placeholder',
    'type',
    'disabled',
    'name',
    'id',
  ],
  emits: ['update:modelValue', 'change-event'],

  methods: {
    fileUpload(e: any) {
      if (this.type === 'file') {
        this.$emit('change-event', e);
      }
    },
  },
});
</script>
<style scoped></style>
