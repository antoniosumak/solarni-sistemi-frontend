<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Uredi klijenta">
    <loader v-if="isLoading" />
    <form-wrapper v-else title="Uredi klijenta">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Ime" v-model="formData.name" />
          <input-field label="Prezime" v-model="formData.surname" />
          <input-field label="OIB" v-model="formData.oib" />
          <input-field label="Email" type="email" v-model="formData.email" />
          <input-field label="Telefon" type="number" v-model="formData.phone" />
          <input-field label="Općina" v-model="formData.county" />
          <input-field label="Poštanski broj" v-model="formData.post_code" />
          <input-field label="Adresa" v-model="formData.address" />
          <input-field
            label="Broj obračunskog mjesta"
            v-model="formData.billing_location_number"
          />
        </form-divider>
        <button-wrapper text="Uredi" />
      </form>
    </form-wrapper>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import InputField from '../../../core/components/FormElements/InputField.vue';
import FormWrapper from '../../../core/components/FormElements/FormWrapper.vue';
import FormDivider from '../../../core/components/FormElements/FormDivider.vue';
import ButtonComponent from '../../../core/components/ButtonComponent.vue';
import ButtonWrapper from '../../../core/components/FormElements/ButtonWrapper.vue';
import ClientService, { Client } from '../Services/ClientService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Loader from '../../../core/components/Loader.vue';
export default defineComponent({
  components: {
    MainSection,
    InputField,
    FormWrapper,
    FormDivider,
    ButtonComponent,
    ButtonWrapper,
    ToastComponent,
    Loader,
  },

  data() {
    return {
      clientService: new ClientService(),
      toastStore: useToastStore(),
      id: Number(this.$route.params.id),
      isLoading: false,
      formData: {
        name: '',
        surname: '',
        oib: '',
        email: '',
        phone: '',
        county: '',
        post_code: '',
        address: '',
        billing_location_number: '',
      } as Client,
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getClientById();
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
        await this.clientService.updateClient(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste uredili klijenta!',
          isError: false,
        });
        this.$router.push({ name: 'clients' });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      } finally {
      }
    },

    async getClientById() {
      try {
        this.formData = await this.clientService.getClientById(this.id);
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
