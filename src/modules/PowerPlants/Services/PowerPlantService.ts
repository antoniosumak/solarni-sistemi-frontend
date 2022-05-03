import ApiService from '../../../core/Axios/ApiService';

export type PowerPlant = {
  id?: number;
  name: string;
  power: number;
  power_plant_type_id: number;
  powerPlantTypeName?: string;
};

export default class PowerPlantService {
  async getAllPowerPlants(): Promise<PowerPlant[]> {
    const response = await ApiService.get('/api/power-plants');

    return this._mapPowerPlants(response.data);
  }

  async getPowerPlantById(id: number): Promise<PowerPlant> {
    const response = await ApiService.get(`/api/power-plants/${id}`);

    return this._mapPowerPlant(response.data);
  }

  async createPowerPlant(powerPlant: PowerPlant): Promise<any> {
    return await ApiService.post('/api/power-plants', powerPlant);
  }

  async updatePowerPlant(powerPlant: PowerPlant): Promise<any> {
    return await ApiService.put(
      `/api/power-plants/${powerPlant.id}`,
      powerPlant
    );
  }

  async deletePowerPlant(id: number): Promise<boolean> {
    try {
      await ApiService.delete(`/api/power-plants/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  private _mapPowerPlants(response: PowerPlant[]): PowerPlant[] {
    return response.map((powerPlant: PowerPlant) =>
      this._mapPowerPlant(powerPlant)
    );
  }

  private _mapPowerPlant(powerPlant: PowerPlant): PowerPlant {
    return {
      id: powerPlant.id,
      name: powerPlant.name,
      power: powerPlant.power,
      power_plant_type_id: powerPlant.power_plant_type_id,
      ...(powerPlant.powerPlantTypeName && {
        powerPlantTypeName: powerPlant.powerPlantTypeName,
      }),
    };
  }
}
