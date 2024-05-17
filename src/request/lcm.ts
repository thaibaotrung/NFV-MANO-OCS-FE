import { axiosRequest } from 'request';

export const lcmRequest = {
  getVnfList: () => axiosRequest.get('vnf_instances/list', {}),
  getVnfdList: () => axiosRequest.get('vnf_instances/listVnfd', {}),
  postCreateVnf: (body: any) => axiosRequest.post('vnf_instances', body),
  deleteVnf: (param: any) => axiosRequest.delete(`vnf_instances/delete/${param}`),
};
