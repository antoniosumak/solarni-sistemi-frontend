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
    @delete-action="deleteProject"
  />
  <main-section title="Projekti">
    <loader v-if="isLoading" />
    <div v-else>
      <create-button-wrapper route-name="createProject" :contains-filter="true">
        <v-select
          class="w-[150px]"
          placeholder="Status"
          :options="statuses"
          label="name"
          :reduce="(status : any) => status.id"
          v-model="statusId"
        />
      </create-button-wrapper>
      <dynamic-table
        title="Projekti"
        :table-headers="tableHeaders"
        :table-data="projects"
        @edit-method="editProject"
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
import ProjectService, { ProjectDto } from '../Services/ProjectService';
import { useToastStore } from '../../../core/Store/toastStore';
import Loader from '../../../core/components/Loader.vue';
import StatusService, { Status } from '../../Statuses/Services/StatusService';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import DeleteModal from '../../../core/components/DeleteModal.vue';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    CreateButtonWrapper,
    Loader,
    ToastComponent,
    DeleteModal,
  },
  data() {
    return {
      projectService: new ProjectService(),
      statusService: new StatusService(),
      projects: [] as ProjectDto[],
      statuses: [] as Status[],
      statusId: null,
      isLoading: false,
      toastStore: useToastStore(),
      isDeleteModalOpened: false,
      selectedProject: {} as ProjectDto,
      deleteText: '',
      tableHeaders: {
        name: 'Naziv',
        address: 'Adresa',
        comment: 'Napomena',
        powerPlantName: 'Elektrana',
        connection_power: 'Snaga priključka',
        particle_number: 'Broj čestice',
        cadastral_municipality: 'Katastarska općina',
        clientName: 'Klijent',
        statusName: 'Status',
      },
    };
  },

  watch: {
    async statusId(value) {
      if (value === null) {
        this.isLoading = true;
        try {
          await this.getAllProjects();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        } finally {
          this.isLoading = false;
        }
      } else {
        this.isLoading = true;
        try {
          this.projects = await this.projectService.getProjectsByStatus(value);
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        } finally {
          this.isLoading = false;
        }
      }
    },
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllProjects();
      await this.getAllStatuses();
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
    async getAllProjects() {
      try {
        this.projects = await this.projectService.getAllProjects();
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

    async deleteProject() {
      if (this.selectedProject.id) {
        try {
          await this.projectService.deleteProject(this.selectedProject.id);
          this.toastStore.displayToastMessage({
            toastMessage: 'Projekt uspješno obrisan!',
            isError: false,
          });
          await this.getAllProjects();
          await this.getAllStatuses();
          this.toggleDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        }
      }
    },

    toggleDeleteModal(project?: ProjectDto) {
      this.isDeleteModalOpened = !this.isDeleteModalOpened;
      if (project) {
        this.selectedProject = project;
        this.deleteText = project.name;
      }
    },

    editProject(id: number) {
      this.$router.push({ name: 'projectDetails', params: { id: id } });
    },
  },
});
</script>
<style scoped></style>
