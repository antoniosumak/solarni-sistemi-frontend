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
    @delete-action="deleteClient"
  />
  <main-section title="Klijenti">
    <loader v-if="isLoading" />
    <div v-else>
      <create-button-wrapper route-name="createClient" />
      <dynamic-table
        :table-headers="tableHeaders"
        title="Klijenti"
        :table-data="clients"
        @edit-method="editClient"
        @delete-method="toggleDeleteModal"
      />
    </div>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import DynamicTable from '../../../core/components/DynamicTable.vue';
import CreateButtonWrapper from '../../../core/components/CreateButtonWrapper.vue';
import ClientService, { Client } from '../Services/ClientService';
import Loader from '../../../core/components/Loader.vue';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Modal from '../../../core/components/Modal.vue';
import DeleteModal from '../../../core/components/DeleteModal.vue';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    CreateButtonWrapper,
    Loader,
    ToastComponent,
    Modal,
    DeleteModal,
  },
  data() {
    return {
      clientService: new ClientService(),
      clients: [] as Client[],
      toastStore: useToastStore(),
      isLoading: false,
      isDeleteModalOpened: false,
      deleteText: '',
      selectedClient: {} as Client,
      tableHeaders: {
        name: 'Ime',
        surname: 'Prezime',
        email: 'Email',
        oib: 'OIB',
        phone: 'Broj telefona',
        address: 'Adresa',
        county: 'Općina',
        post_code: 'Poštanski broj',
        billing_location_number: 'Broj obračunskog mjesta',
      },
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllClients();
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
    async getAllClients() {
      try {
        this.clients = await this.clientService.getAllClients();
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    editClient(id: number) {
      this.$router.push({ name: 'editClient', params: { id: id } });
    },

    async deleteClient() {
      if (this.selectedClient.id) {
        try {
          await this.clientService.deleteClient(this.selectedClient.id);
          this.toastStore.displayToastMessage({
            toastMessage: 'Klijent uspješno obrisan!',
            isError: false,
          });
          await this.getAllClients();
          this.toggleDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        }
      }
    },

    toggleDeleteModal(client?: Client) {
      this.isDeleteModalOpened = !this.isDeleteModalOpened;
      if (client) {
        this.selectedClient = client;
        this.deleteText = `${client.name} ${client.surname}`;
      }
    },
  },
});
</script>
<style scoped></style>
