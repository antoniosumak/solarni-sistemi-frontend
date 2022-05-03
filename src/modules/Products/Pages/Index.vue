<template>
  <toast-component
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Proizvodi i usluge">
    <loader v-if="isLoading" />
    <div v-else>
      <create-button-wrapper route-name="createProduct" />
      <dynamic-table
        :table-headers="tableHeaders"
        :table-data="products"
        title="Proizvodi i usluge"
        @edit-method="editProduct"
      />
    </div>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import DynamicTable from '../../../core/components/DynamicTable.vue';
import CreateButtonWrapper from '../../../core/components/CreateButtonWrapper.vue';
import ProductService, { Product } from '../Services/ProductService';
import Loader from '../../../core/components/Loader.vue';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import { useToastStore } from '../../../core/Store/toastStore';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    CreateButtonWrapper,
    Loader,
    ToastComponent,
  },
  data() {
    return {
      productService: new ProductService(),
      products: [] as Product[],
      isLoading: false,
      toastStore: useToastStore(),
      tableHeaders: {
        photo: 'Slika',
        code: 'Šifra',
        name: 'Naziv',
        price: 'Cijena',
        description: 'Opis',
      },
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllProducts();
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async getAllProducts() {
      try {
        this.products = await this.productService.getAllProducts();
      } catch (error) {}
    },

    editProduct(id: number) {
      this.$router.push({ name: 'editProduct', params: { id: id } });
    },
  },
});
</script>
<style scoped></style>
