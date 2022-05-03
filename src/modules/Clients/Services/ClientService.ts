import ApiService from '../../../core/Axios/ApiService';

export type Client = {
  id?: number;
  name: string;
  surname: string;
  oib: string;
  email: string;
  phone: string;
  county: string;
  post_code: string;
  address: string;
  fullName?: string;
  billing_location_number: string;
};

export default class ClientService {
  async getAllClients(): Promise<Client[]> {
    const response = await ApiService.get('/api/clients');

    return this._mapClients(response.data);
  }

  async getClientById(id: number): Promise<Client> {
    const response = await ApiService.get(`/api/clients/${id}`);

    return this._mapClient(response.data);
  }

  async createClient(client: Client): Promise<any> {
    return await ApiService.post('/api/clients', client);
  }

  async updateClient(client: Client): Promise<any> {
    return await ApiService.put(`/api/clients/${client.id}`, client);
  }

  async deleteClient(id: number): Promise<boolean> {
    try {
      await ApiService.delete(`/api/clients/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  private _mapClients(response: Client[]): Client[] {
    return response.map((client: Client) => this._mapClient(client));
  }

  private _mapClient(client: Client): Client {
    return {
      id: client.id,
      name: client.name,
      surname: client.surname,
      fullName: `${client.name} ${client.surname}`,
      oib: client.oib,
      email: client.email,
      phone: client.phone,
      county: client.county,
      post_code: client.post_code,
      address: client.address,
      billing_location_number: client.billing_location_number,
    };
  }
}
