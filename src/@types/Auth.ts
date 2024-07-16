interface IAuthRequestProps {
  name?: string;
  userId: string;
  userPw: string;
}

interface IAuthResponse {
  success: boolean;
  admin: boolean;
  manager: boolean;
  staff: boolean;
  accessToken: string;
  refreshToken: string;
}

export type { IAuthRequestProps, IAuthResponse };
