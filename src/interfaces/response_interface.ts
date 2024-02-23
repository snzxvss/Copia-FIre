export interface ResponseInterface {
    success: boolean;
    status: number;
    msg: string;
    data?: any;
    accessToken?: string;
    recoveryToken?: string;
  }