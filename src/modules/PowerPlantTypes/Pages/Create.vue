<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Kreiraj elektranu">
    <form-wrapper title="Unesi elektranu">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Naziv" v-model="formData.name" />
        </form-divider>
        <button-wrapper />
      </form>
    </form-wrapper>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import FormWrapper from '../../../core/components/FormElements/FormWrapper.vue';
import FormDivider from '../../../core/components/FormElements/FormDivider.vue';
import InputField from '../../../core/components/FormElements/InputField.vue';
import ButtonWrapper from '../../../core/components/FormElements/ButtonWrapper.vue';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import PowerPlantTypeService from '../Services/PowerPlantTypeService';
export default defineComponent({
  components: {
    MainSection,
    FormWrapper,
    FormDivider,
    InputField,
    ButtonWrapper,
    ToastComponent,
  },

  data() {
    return {
      powerPlantTypeService: new PowerPlantTypeService(),
      toastStore: useToastStore(),
      formData: {
        name: '',
      },
    };
  },

  methods: {
    async handleSubmit() {
      try {
        await this.powerPlantTypeService.createPowerPlantType(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste kreirali tip elektrane!',
          isError: false,
        });
        this.$router.push({ name: 'powerPlantTypes' });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },
  },
});
</script>
<style scoped></style>
