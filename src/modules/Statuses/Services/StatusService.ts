import ApiService from '../../../core/Axios/ApiService';

export type Status = {
  id?: number;
  name: string;
};

export default class StatusService {
  async getAllStatuses(): Promise<Status[]> {
    const response = await ApiService.get('/api/statuses');

    return this._mapServices(response.data);
  }

  private _mapServices(response: Status[]): Status[] {
    return response.map((status: Status) => this._mapService(status));
  }

  private _mapService(status: Status): Status {
    return {
      id: status.id,
      name: status.name,
    };
  }
}
