<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Uredi elektranu">
    <loader v-if="isLoading" />
    <form-wrapper v-else title="Uredi elektranu">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Naziv" v-model="formData.name" />
          <input-field label="Snaga" v-model="formData.power" />
          <input-field label="Cijena" v-model="formData.price" />
          <div class="py-3">
            <label>Tip elektrane</label>
            <v-select
              :options="powerPlantTypes"
              label="name"
              :reduce="(powerPlantType) => powerPlantType.id"
              v-model="formData.power_plant_type_id"
            />
          </div>
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
import PowerPlantService, { PowerPlant } from '../Services/PowerPlantService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Loader from '../../../core/components/Loader.vue';
import PowerPlantTypeService, {
  PowerPlantType,
} from '../../PowerPlantTypes/Services/PowerPlantTypeService';
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
      powerPlantService: new PowerPlantService(),
      id: Number(this.$route.params.id),
      toastStore: useToastStore(),
      isLoading: false,
      powerPlantTypeService: new PowerPlantTypeService(),
      powerPlantTypes: [] as PowerPlantType[],
      formData: {
        name: '',
        power: 0,
        price: 0,
      } as PowerPlant,
    };
  },

  async created() {
    this.isLoading = true;
    try {
      this.getPowerPlantById();
      this.powerPlantTypes =
        await this.powerPlantTypeService.getAllPowerPlantTypes();
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
        await this.powerPlantService.updatePowerPlant(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste uredili elektranu!',
          isError: false,
        });
        this.$router.push({ name: 'powerPlants' });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    async getPowerPlantById() {
      try {
        this.formData = await this.powerPlantService.getPowerPlantById(this.id);
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
