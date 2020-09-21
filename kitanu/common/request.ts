import axios, { AxiosRequestConfig, AxiosBasicCredentials } from 'axios';

/**
 * getRequest
 */
export const getRequest = (url: string, params: any = {}, auth?: AxiosBasicCredentials) => {
  const p: AxiosRequestConfig = {
    method: 'get',
    url,
    params,
  };
  if (auth) {
    p.auth = auth;
  }
  return axios(p)
    .then((res: { data: any }) => {
      return res.data;
    })
    .catch((err: { response: any }) => {
      const { response } = err;
      const { status } = response;
      return { error: err, data: response.data, status };
    });
};

/**
 * postRequest
 */
export const postRequest = (url: string, params: any = {}) => {
  return axios({
    method: 'post',
    url,
    data: { ...params },
  })
    .then((res: { data: any }) => {
      return res.data;
    })
    .catch((err: { response: any }) => {
      const { response } = err;
      const { status } = response;
      return { error: err, data: response.data, status };
    });
};

/**
 * deleteRequest
 */
export const deleteRequest = (url: string, params: any = {}) => {
  return axios({
    method: 'delete',
    url,
    data: {
      ...params,
    },
  })
    .then((res: { data: any }) => {
      return res.data;
    })
    .catch((err: { response: any }) => {
      const { response } = err;
      const { status } = response;
      return { error: err, data: response.data, status };
    });
};

/**
 * putRequest
 */
export const putRequest = (url: string, params = {}) => {
  return axios({
    method: 'put',
    url,
    data: {
      ...params,
    },
  })
    .then((res: { data: any }) => {
      return res.data;
    })
    .catch((err: { response: any }) => {
      const { response } = err;
      const { status } = response;
      return { error: err, data: response.data, status };
    });
};
