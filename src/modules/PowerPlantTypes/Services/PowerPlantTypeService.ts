import ApiService from '../../../core/Axios/ApiService';

export type PowerPlantType = {
  id?: number;
  name: string;
};

export default class PowerPlantTypeService {
  async getAllPowerPlantTypes(): Promise<PowerPlantType[]> {
    const response = await ApiService.get('/api/power-plant-types');

    return this._mapPowerPlants(response.data);
  }

  async getPowerPlantTypeById(id: number): Promise<PowerPlantType> {
    const response = await ApiService.get(`/api/power-plant-types/${id}`);

    return this._mapPowerPlant(response.data);
  }

  async createPowerPlantType(powerPlantType: PowerPlantType): Promise<any> {
    return await ApiService.post('/api/power-plant-types', powerPlantType);
  }

  async updatePowerPlantType(powerPlantType: PowerPlantType): Promise<any> {
    return await ApiService.put(
      `/api/power-plant-types/${powerPlantType.id}`,
      powerPlantType
    );
  }

  async deletePowerPlantType(id: number): Promise<boolean> {
    try {
      await ApiService.delete(`/api/power-plant-types/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  private _mapPowerPlants(response: PowerPlantType[]): PowerPlantType[] {
    return response.map((powerPlantType: PowerPlantType) =>
      this._mapPowerPlant(powerPlantType)
    );
  }

  private _mapPowerPlant(powerPlantType: PowerPlantType): PowerPlantType {
    return {
      id: powerPlantType.id,
      name: powerPlantType.name,
    };
  }
}
