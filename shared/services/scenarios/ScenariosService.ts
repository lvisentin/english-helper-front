import axios from 'axios';
import { userService } from '../user/UserService';
import { Scenario } from './ScenariosService.model';
class ScenariosService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  getScenarios() {
    return axios.get<Scenario[]>(`${this.VERCEL_API_URL}/scenarios`, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  getScenarioById(scenarioId: string) {
    return axios.get(`${this.VERCEL_API_URL}/scenarios/${scenarioId}`, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }
}

export const scenariosService = new ScenariosService();
