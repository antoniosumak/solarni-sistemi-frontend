<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Kreiraj proizvod">
    <form-wrapper title="Unesi proizvod">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Šifra" v-model="formData.code" />
          <input-field label="Naziv" v-model="formData.name" />
          <input-field label="Cijena" type="number" v-model="formData.price" />
          <input-field label="Opis" v-model="formData.description" />
          <input-field
            id="productImage"
            name="productImage"
            label="Photo"
            type="file"
            @change-event="handleFileSubmit"
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
import FormWrapper from '../../../core/components/FormElements/FormWrapper.vue';
import FormDivider from '../../../core/components/FormElements/FormDivider.vue';
import InputField from '../../../core/components/FormElements/InputField.vue';
import ButtonWrapper from '../../../core/components/FormElements/ButtonWrapper.vue';
import ProductService, { Product } from '../Services/ProductService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
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
      productService: new ProductService(),
      toastStore: useToastStore(),
      formData: {
        code: '',
        name: '',
        price: 0,
        description: '',
        photo: {} as File,
      } as Product,
    };
  },

  methods: {
    async handleSubmit() {
      const formData = new FormData();
      formData.append('code', this.formData.code);
      formData.append('name', this.formData.name);
      formData.append('price', String(this.formData.price));
      formData.append('description', this.formData.description);
      formData.append('productImage', this.formData.photo);
      try {
        await this.productService.createProduct(formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste kreirali proizvod!',
          isError: false,
        });
        this.$router.push({ name: 'products' });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    handleFileSubmit(e: any) {
      this.formData.photo = e.target.files[0];
    },
  },
});
</script>
<style>
::-webkit-file-upload-button {
  outline: none;
  border: 1px solid #e5e7eb;
  padding: 0.4125rem 0.6125rem;
  border-radius: 10px;
}
</style>
