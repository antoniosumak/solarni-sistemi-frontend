<template>
  <toast-component
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <delete-modal
    delete-type="klijenta"
    v-if="isDeleteModalOpened"
    :delete-info="deleteText"
    @toggle-modal="toggleDeleteModal"
    @cancel-action="toggleDeleteModal"
    @delete-action="deleteDocument"
  />

  <delete-modal
    delete-type="proizvoda"
    v-if="isProductDeleteModalOpened"
    :delete-info="deleteText"
    @toggle-modal="toggleProductDeleteModal"
    @cancel-action="toggleProductDeleteModal"
    @delete-action="deleteProduct"
  />
  <main-section>
    <loader v-if="isLoading" />
    <div v-else>
      <div class="flex items-center justify-between w-full">
        <h2 class="text-2xl font-bold">{{ projectDetails.name }}</h2>
        <p
          :class="`${
            projectDetails?.status?.name === 'Gotovo'
              ? 'bg-success'
              : 'bg-warning'
          } p-2 rounded-md text-white`"
        >
          {{ projectDetails?.status?.name }}
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div class="bg-white card p-4 rounded-md space-y-1">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center justify-between space-x-2">
              <archive-icon class="w-5 text-primary" />
              <h2 class="text-xl font-bold">Projekt</h2>
            </div>
            <pencil-icon class="w-5 text-primary" @click="editProject" />
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Adresa</h2>
            <p>{{ projectDetails.address }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Snaga priključka</h2>
            <p>{{ projectDetails?.connection_power }} kW</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Broj čestice</h2>
            <p>{{ projectDetails.particle_number }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Katastarska općina</h2>
            <p>{{ projectDetails?.cadastral_municipality }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Status projekta</h2>
            <p>{{ projectDetails?.status?.name }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Ukupni trošak</h2>
            <p>
              {{
                projectDetails.products.reduce(
                  (partialSum, a) => partialSum + a.price * a.quantity,
                  0
                )
              }}
              kn
            </p>
          </div>
        </div>
        <div class="bg-white card p-4 rounded-md space-y-1">
          <div class="flex items-center space-x-2 mb-1.5">
            <user-icon class="w-5 text-primary" />
            <h2 class="text-xl font-bold">Klijent</h2>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Ime</h2>
            <p>{{ projectDetails?.client?.name }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Prezime</h2>
            <p>{{ projectDetails?.client?.surname }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Email</h2>
            <p>{{ projectDetails?.client?.email }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Telefon</h2>
            <p>{{ projectDetails?.client?.phone }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Adresa</h2>
            <p>{{ projectDetails?.client?.address }}</p>
          </div>
        </div>
        <div class="bg-white card p-4 rounded-md space-y-1">
          <div class="flex items-center space-x-2 mb-1.5">
            <lightning-bolt-icon class="w-5 text-primary" />
            <h2 class="text-xl font-bold">Elektrana</h2>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Tip</h2>
            <p>{{ projectDetails?.power_plant?.name }}</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Snaga</h2>
            <p>{{ projectDetails?.power_plant?.power }} kW</p>
          </div>
          <div
            class="w-full rounded-md grid grid-cols-2 items-center bg-sectionBackground py-2 px-4"
          >
            <h2 class="text-md font-bold">Tip elektrane</h2>
            <p>{{ projectDetails?.power_plant?.powerPlantTypeName }}</p>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <create-button-wrapper
          :contains-filter="true"
          route-name="projectAddProduct"
        >
          <h2 class="text-2xl font-bold mb-4">
            Proizvodi i usluge
          </h2></create-button-wrapper
        >
        <dynamic-table
          :table-data="projectDetails.products"
          :table-headers="tableHeaders"
          :hide-edit="true"
          @delete-method="toggleProductDeleteModal"
        />
      </div>
      <div class="mt-8">
        <create-button-wrapper
          :contains-filter="true"
          route-name="createDocument"
          :id="projectDetails.id"
        >
          <h2 class="text-2xl font-bold mb-4">
            Dokumenti
          </h2></create-button-wrapper
        >
        <dynamic-table
          :table-data="documents"
          :table-headers="documentTableHeaders"
          :hide-edit="true"
          @delete-method="toggleDeleteModal"
        />
      </div>
    </div>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import { useToastStore } from '../../../core/Store/toastStore';
import ProjectService, { ProjectDetailsDto } from '../Services/ProjectService';
import DynamicTable from '../../../core/components/DynamicTable.vue';
import {
  ArchiveIcon,
  UserIcon,
  LightningBoltIcon,
  PencilIcon,
} from '@heroicons/vue/solid';
import CreateButtonWrapper from '../../../core/components/CreateButtonWrapper.vue';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import DocumentService, {
  Document,
} from '../../Documents/Services/DocumentService';
import DeleteModal from '../../../core/components/DeleteModal.vue';
import { Product } from '../../Products/Services/ProductService';
import Loader from '../../../core/components/Loader.vue';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    ArchiveIcon,
    UserIcon,
    LightningBoltIcon,
    CreateButtonWrapper,
    ToastComponent,
    DeleteModal,
    Loader,
    PencilIcon,
  },
  data() {
    return {
      id: Number(this.$route.params.id),
      projectService: new ProjectService(),
      projectDetails: {} as ProjectDetailsDto,
      documentService: new DocumentService(),
      documents: [] as Document[],
      toastStore: useToastStore(),
      isDeleting: false,
      isDeleteModalOpened: false,
      isProductDeleteModalOpened: false,
      selectedDocument: {} as Document,
      selectedProduct: {} as Product,
      deleteText: '',
      isLoading: false,
      tableHeaders: {
        photo: 'Slika',
        code: 'Šifra',
        name: 'Naziv',
        price: 'Cijena',
        quantity: 'Kolicina',
        total: 'Ukupno',
        description: 'Opis',
      },
      documentTableHeaders: {
        name: 'Naziv',
        document: 'Dokument',
      },
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getProjectDetails();
      await this.getProjectDocuments();
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
    async getProjectDetails() {
      try {
        this.projectDetails = await this.projectService.getProjectDetails(
          this.id
        );
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }

      console.log(this.projectDetails);
    },

    async getProjectDocuments() {
      try {
        this.documents = await this.documentService.getProjectDocuments(
          this.id
        );
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    toggleDeleteModal(document?: Document) {
      this.isDeleteModalOpened = !this.isDeleteModalOpened;
      if (document) {
        this.selectedDocument = document;
        this.deleteText = document.name;
      }
    },

    toggleProductDeleteModal(product?: Product) {
      this.isProductDeleteModalOpened = !this.isProductDeleteModalOpened;
      if (product) {
        this.selectedProduct = product;
        this.deleteText = product.name;
      }
    },

    async deleteDocument() {
      if (this.selectedDocument.id) {
        try {
          await this.documentService.deleteDocument(this.selectedDocument.id);
          this.toastStore.displayToastMessage({
            toastMessage: 'Dokument uspješno obrisan!',
            isError: false,
          });

          this.toggleDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        } finally {
          this.documents = await this.documentService.getProjectDocuments(
            this.id
          );
        }
      }
    },

    async deleteProduct() {
      if (this.selectedProduct.id) {
        try {
          await this.projectService.deleteProjectProduct(
            this.id,
            this.selectedProduct.id
          );
          this.toastStore.displayToastMessage({
            toastMessage: 'Proizvod uspješno obrisan!',
            isError: false,
          });

          this.toggleProductDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        } finally {
          await this.getProjectDetails();
        }
      }
    },

    editProject() {
      this.$router.push({ name: 'editProject', params: { id: this.id } });
    },
  },
});
</script>
<style scoped>
.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
