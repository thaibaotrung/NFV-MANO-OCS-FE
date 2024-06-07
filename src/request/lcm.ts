import axios from 'axios';
import { axiosRequest } from 'request';

export const lcmRequest = {
  getVnfList: (name?: any) => axiosRequest.get(`vnf_instances/list?name=${!!name ? name : ''}`, {}),
  getVnfdList: () => axiosRequest.get('vnf_instances/listVnfd', {}),
  postCreateVnf: (body: any) => axiosRequest.post('vnf_instances', body),
  deleteVnf: (param: any) => axiosRequest.delete(`vnf_instances/delete/${param}`),
  instantiateVnf: (param: any) => axiosRequest.get(`vnf_instances/instantiate/${param}`),
  terminateVnf: (param: any) => axiosRequest.get(`vnf_instances/terminate/${param}`),
  healingVnf: (param: any) => axiosRequest.get(`vnf_instances/healing/${param}`),
  getVnfcList: (param: any) => axiosRequest.get(`vnf_instances/listVnfc/${param}`),
  getLcmOpoccList: (param: any) => axiosRequest.get(`vnf_instances/listLcmOpocc/${param}`),
  getScaleVnf: (param: any) => axiosRequest.get(`vnf_instances/listDeployment/${param}`),
  scaleVnfc: (name: any, vncfcName: any, numberScale: any) =>
    axiosRequest.post(`vnf_instances/scale/${name}?vnfcName=${vncfcName}`, {
      numberofinstance: numberScale,
    }),
  addVnfd: () => axiosRequest.post('vnf_instances/vnfd', {}),
  findVnfByName: (param: any) => axiosRequest.get(`vnf_instances/name/${param}`),
};
