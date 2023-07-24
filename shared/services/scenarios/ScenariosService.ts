import axios from '@/shared/configs/axios/instances/default';
import { Scenario } from './ScenariosService.model';
class ScenariosService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  getScenarios() {
    return axios.get<Scenario[]>(`${this.VERCEL_API_URL}/scenarios`);
  }

  getScenarioById(scenarioId: string) {
    return axios.get(`${this.VERCEL_API_URL}/scenarios/${scenarioId}`);
  }
}

export const scenariosService = new ScenariosService();
