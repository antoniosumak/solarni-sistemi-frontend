<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Uredi projekt">
    <loader v-if="isLoading" />
    <form-wrapper title="Uredi projekt">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field label="Naziv" v-model="formData.name" />
          <input-field label="Adresa" v-model="formData.address" />
          <input-field label="Napomena" v-model="formData.comment" />
          <div class="py-3">
            <label>Elektrana</label>
            <v-select
              :options="powerPlants"
              label="name"
              :reduce="(powerPlant) => powerPlant.id"
              v-model="formData.power_plant_id"
            />
          </div>
          <input-field
            label="Broj čestice"
            v-model="formData.particle_number"
          />
          <input-field
            label="Katastarska općina"
            v-model="formData.cadastral_municipality"
          />
          <input-field
            label="Snaga priključka"
            v-model="formData.connection_power"
          />
          <div class="py-3">
            <label>Klijent</label>
            <v-select
              :options="clients"
              label="fullName"
              :reduce="(client) => client.id"
              v-model="formData.client_id"
            />
          </div>
          <div class="py-3">
            <label>Status</label>
            <v-select
              :options="statuses"
              label="name"
              :reduce="(status) => status.id"
              v-model="formData.status_id"
            />
          </div>
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
import ButtonWrapper from '../../../core/components/FormElements/ButtonWrapper.vue';
import InputField from '../../../core/components/FormElements/InputField.vue';
import ClientService, { Client } from '../../Clients/Services/ClientService';
import PowerPlantService, {
  PowerPlant,
} from '../../PowerPlants/Services/PowerPlantService';
import StatusService from '../../Statuses/Services/StatusService';
import ProjectService, {
  CreateEditProject,
  Status,
  Project,
} from '../Services/ProjectService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Loader from '../../../core/components/Loader.vue';
export default defineComponent({
  components: {
    MainSection,
    FormWrapper,
    FormDivider,
    ButtonWrapper,
    InputField,
    ToastComponent,
    Loader,
  },

  data() {
    return {
      projectService: new ProjectService(),
      clientService: new ClientService(),
      powerPlantService: new PowerPlantService(),
      statusService: new StatusService(),
      clients: [] as Client[],
      powerPlants: [] as PowerPlant[],
      statuses: [] as Status[],
      project: {} as Project,
      toastStore: useToastStore(),
      id: Number(this.$route.params.id),
      isLoading: false as boolean,
      formData: {
        id: 0,
        name: '',
        address: '',
        comment: '',
        power_plant_id: 1,
        particle_number: '',
        cadastral_municipality: '',
        client_id: 1,
        status_id: 1,
        connection_power: 0,
      } as CreateEditProject,
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllClients();
      await this.getAllPowerPlants();
      await this.getAllStatuses();
      await this.getProject();
    } catch (error) {
      this.toastStore.displayToastMessage({
        toastMessage: error,
        isError: false,
      });
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.projectService.updateProject(this.formData);
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste uredili projekt!',
          isError: false,
        });
        this.$router.push({ name: 'projectDetails', params: { id: this.id } });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: false,
        });
      } finally {
      }
    },

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

    async getAllPowerPlants() {
      try {
        this.powerPlants = await this.powerPlantService.getAllPowerPlants();
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    async getAllStatuses() {
      try {
        this.statuses = await this.statusService.getAllStatuses();
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    async getProject() {
      try {
        const response = await this.projectService.getProjectById(this.id);
        this.formData = response;
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
