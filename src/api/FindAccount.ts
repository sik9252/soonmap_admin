import { httpClient } from '.';
import { useMutation } from '@tanstack/react-query';

export interface FindAccountDataType {
  code?: string;
  receiver?: string;
  token?: string;
}

export interface CertificateConfirmResponse {
  id?: string;
  confirmToken?: string;
}

export function useFindIdEmailValidateRequest() {
  return useMutation((data: FindAccountDataType) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/id`,
      data,
    }),
  );
}

export function useFindIdCertificateConfirmRequest() {
  return useMutation((data: FindAccountDataType) =>
    httpClient<CertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/id/confirm`,
      data,
    }),
  );
}

export function useFindPasswordValidateRequest() {
  return useMutation((data: FindAccountDataType) =>
    httpClient({
      method: 'POST',
      url: `/admin/find/pw`,
      data,
    }),
  );
}

export function useFindPasswordCertificateConfirmRequest() {
  return useMutation((data: FindAccountDataType) =>
    httpClient<CertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/find/pw/confirm`,
      data,
    }),
  );
}

export function useChangePasswordRequest() {
  return useMutation((data: FindAccountDataType) =>
    httpClient<CertificateConfirmResponse>({
      method: 'POST',
      url: `/admin/change/pw`,
      data,
    }),
  );
}
