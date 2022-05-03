<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Uredi tip elektrane">
    <loader v-if="isLoading" />
    <form-wrapper v-else title="Uredi tip elektrane">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Naziv" v-model="formData.name" />
        </form-divider>
        <button-wrapper text="Uredi" />
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
import PowerPlantTypeService, {
  PowerPlantType,
} from '../Services/PowerPlantTypeService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Loader from '../../../core/components/Loader.vue';
export default defineComponent({
  components: {
    MainSection,
    FormWrapper,
    FormDivider,
    InputField,
    ButtonWrapper,
    ToastComponent,
    Loader,
  },

  data() {
    return {
      powerPlantTypeService: new PowerPlantTypeService(),
      id: Number(this.$route.params.id),
      toastStore: useToastStore(),
      isLoading: false,

      formData: {
        name: '',
      } as PowerPlantType,
    };
  },

  async created() {
    this.isLoading = true;
    try {
      this.getPowerPlantTypeById();
    } catch (error) {
      this.toastStore.displayToastMessage({
        toastMessage: error,
        isError: true,
      });
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.powerPlantTypeService.updatePowerPlantType(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste uredili tip elektrane!',
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

    async getPowerPlantTypeById() {
      try {
        this.formData = await this.powerPlantTypeService.getPowerPlantTypeById(
          this.id
        );
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
