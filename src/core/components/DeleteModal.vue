<template>
  <modal
    small-screen="w-10/12"
    medium-screen="md:w-8/12"
    big-screen="lg:w-[400px]"
    @toggle-modal="$emit('toggle-modal')"
  >
    <div class="w-full">
      <div class="w-full flex justify-center">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center bg-errorLight"
        >
          <TrashIcon class="w-10 text-error" />
        </div>
      </div>
      <h2 class="font-bold text-2xl text-center mt-4">
        Brisanje {{ deleteType }}
      </h2>
      <p class="text-darkGrey mt-2">
        Jeste li sigurni da želite obrisati zapis
        <strong class="text-darker">{{ deleteInfo }}</strong
        >? Zapis neće trajno biti izbrisan, izbrisan zapis moguće je vratit!
      </p>
      <div class="flex space-x-2 mt-8">
        <button-component
          :is-full-width="true"
          :is-outline-button="true"
          text="Odustani"
          @execute-method="$emit('cancel-action')"
        />
        <button-component
          :is-full-width="true"
          text="Obriši"
          :is-delete-button="true"
          @execute-method="$emit('delete-action')"
        />
      </div>
    </div>
  </modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Modal from './Modal.vue';
import { TrashIcon } from '@heroicons/vue/solid';
import ButtonComponent from './ButtonComponent.vue';
export default defineComponent({
  components: {
    Modal,
    TrashIcon,
    ButtonComponent,
  },

  props: {
    deleteType: String,
    deleteInfo: String,
  },
  emits: ['toggle-modal', 'cancel-action', 'delete-action'],
});
</script>
<style scoped></style>
