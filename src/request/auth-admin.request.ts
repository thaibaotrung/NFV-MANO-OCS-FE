import { DEFAULT_API_URL } from 'config';
import { AxiosCSRequest } from 'request';

class AuthAdminAPI extends AxiosCSRequest {
  login = async (body: any): Promise<any> => {
    return await this.post(`/api/admin/login`, body);
  };
}

const authAdminAPI = new AuthAdminAPI(`${DEFAULT_API_URL}`);

export default authAdminAPI;
