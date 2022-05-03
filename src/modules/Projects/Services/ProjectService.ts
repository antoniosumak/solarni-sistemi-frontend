import ApiService from '../../../core/Axios/ApiService';
import { Client } from '../../Clients/Services/ClientService';
import { PowerPlant } from '../../PowerPlants/Services/PowerPlantService';
import { Product } from '../../Products/Services/ProductService';

export type Status = {
  id?: number;
  name: string;
};

export type Project = {
  id?: number;
  name: string;
  address: string;
  comment: string;
  power_plant: PowerPlant;
  particle_number: string;
  status_id: number;
  cadastral_municipality: string;
  client: Client;
  status: Status;
  connection_power: number;
};

export type CreateEditProject = {
  id?: number;
  name: string;
  address: string;
  comment: string;
  particle_number: string;
  status_id: number;
  client_id?: number;
  power_plant_id?: number;
  cadastral_municipality: string;
  connection_power: number;
};

export type ProjectDto = {
  id?: number;
  name: string;
  address: string;
  comment: string;
  powerPlantName: string;
  status_id: number;
  particle_number: string;
  cadastral_municipality: string;
  clientName: string;
  statusName: string;
  connection_power: number;
};

export type ProjectDetails = {
  id?: number;
  name: string;
  address: string;
  comment: string;
  power_plant: PowerPlant;
  particle_number: string;
  cadastral_municipality: string;
  client: Client;
  status: Status;
  products: Product[];
  connection_power: number;
};

export type ProjectDetailsDto = {
  id?: number;
  name: string;
  address: string;
  comment: string;
  power_plant: PowerPlant;
  particle_number: string;
  cadastral_municipality: string;
  client: Client;
  status: Status;
  products: Product[];
  connection_power: number;
};

export default class ProjectService {
  async getAllProjects(): Promise<ProjectDto[]> {
    const response = await ApiService.get('/api/projects');

    return this._mapProjects(response.data);
  }

  async createProject(project: CreateEditProject): Promise<any> {
    return await ApiService.post('/api/projects', project);
  }

  async updateProject(project: CreateEditProject): Promise<any> {
    return await ApiService.put(`/api/projects/${project.id}`, project);
  }
  async getProjectById(id: number): Promise<CreateEditProject> {
    const response = await ApiService.get(`/api/projects/${id}/edit`);

    return response.data;
  }

  async getProjectsByStatus(statusId: number): Promise<ProjectDto[]> {
    const response = await ApiService.get(`/api/projects/${statusId}`);

    return this._mapProjects(response.data);
  }

  async getProjectDetails(id: number): Promise<ProjectDetails> {
    const response = await ApiService.get(`/api/projects/${id}/details`);

    return this._mapProjectDetails(response.data);
  }

  async deleteProjectProduct(
    projectId: number,
    productId: number
  ): Promise<boolean> {
    try {
      await ApiService.delete(
        `/api/projects/${projectId}/product/${productId}/delete`
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      await ApiService.delete(`/api/projects/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private _mapProjects(response: Project[]): ProjectDto[] {
    return response.map((project: Project) => this._mapProject(project));
  }

  private _mapProject(project: Project): ProjectDto {
    return {
      id: project.id,
      name: project.name,
      address: project.address,
      comment: project.comment,
      powerPlantName: project.power_plant.name,
      particle_number: project.particle_number,
      cadastral_municipality: project.cadastral_municipality,
      clientName: `${project.client.name} ${project.client.surname}`,
      status_id: project.status_id,
      statusName: project.status.name,
      connection_power: project.connection_power,
    };
  }

  private _mapProjectDetails(project: ProjectDetails): ProjectDetailsDto {
    return {
      id: project.id,
      name: project.name,
      address: project.address,
      comment: project.comment,
      particle_number: project.particle_number,
      cadastral_municipality: project.cadastral_municipality,
      status: project.status,
      power_plant: project.power_plant,
      client: project.client,
      products: project.products,
      connection_power: project.connection_power,
    };
  }
}
