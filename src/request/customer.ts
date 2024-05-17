import { AxiosCSRequest } from 'request';
import { DEFAULT_API_URL } from 'config';

class CustomerApi extends AxiosCSRequest {
  getMyCustomers = (params: any) => {
    return this.get('/all', {
      params,
    });
  };
  getCustomerDetails = (custommerId: any) => {
    return this.get(`/${custommerId}`);
  };
  editCustomer = (custommerId: any, params: any) => {
    return this.put(`/${custommerId}`, params);
  };

  createCustomer = (params: any) => {
    return this.post('/', params);
  };
}

export const customerAPI = new CustomerApi(`${DEFAULT_API_URL}/api/customer`);
