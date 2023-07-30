import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError, AxiosError } from 'axios';

export const useAxios = axios.create({
  baseURL: 'http://15.164.249.28:8080',
  withCredentials: true,
});

export async function httpClient<T>(config: AxiosRequestConfig) {
  try {
    const response: AxiosResponse<T> = await useAxios.request(config);
    return response;
  } catch (error) {
    if (isAxiosError<AxiosError>(error)) {
      throw new Error(error?.response?.data?.message ?? '알 수 없는 문제가 발생했습니다.');
    }
  }
}

useAxios.interceptors.request.use((config) => {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN) config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;

  return config;
});

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

useAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as MyAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response = await useAxios.post<{ accessToken: string }>('/admin/refresh', {
          refreshToken,
        });

        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);

          // 실패한 요청에 대한 액세스 토큰 업데이트 후 요청 다시 실행
          if (originalRequest && originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            return useAxios.request(originalRequest);
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
