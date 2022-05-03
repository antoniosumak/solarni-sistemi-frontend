<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Dodaj proizvod ili uslugu">
    <form-wrapper title="Dodaj proizvod ili uslugu">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <div class="py-3">
            <label>Proizvod ili usluga</label>
            <v-select
              class="mt-1"
              label="name"
              :options="products"
              v-model="formData.product_id"
              :reduce="(product : any) => product.id"
            />
          </div>
          <input-field label="Količina" v-model="formData.quantity" />
        </form-divider>
        <button-wrapper text="Dodaj" />
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
import ProductService, {
  ProductNoImage,
} from '../../Products/Services/ProductService';
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
      products: [] as ProductNoImage[],
      toastStore: useToastStore(),
      formData: {
        product_id: null,
        project_id: Number(this.$route.params.id),
        quantity: 1,
      },
    };
  },

  async created() {
    try {
      await this.getAllProductsWithoutImage();
    } catch (error) {
      this.toastStore.displayToastMessage({
        toastMessage: error,
        isError: true,
      });
    } finally {
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.productService.addProductToProject(
          this.formData.project_id,
          this.formData.product_id,
          this.formData.quantity
        );
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste dodali proizvod!',
          isError: false,
        });
        this.$router.push({
          name: 'projectDetails',
          params: { id: this.formData.project_id },
        });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },
    async getAllProductsWithoutImage() {
      try {
        this.products = await this.productService.getAllProductsWithoutImage();
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
