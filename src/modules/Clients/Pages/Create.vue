<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Kreiraj klijenta">
    <form-wrapper title="Unesi klijenta">
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
        <button-wrapper />
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
export default defineComponent({
  components: {
    MainSection,
    InputField,
    FormWrapper,
    FormDivider,
    ButtonComponent,
    ButtonWrapper,
  },

  data() {
    return {
      clientService: new ClientService(),
      toastStore: useToastStore(),
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

  methods: {
    async handleSubmit() {
      try {
        await this.clientService.createClient(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste kreirali klijenta!',
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
  },
});
</script>
<style scoped></style>
