export interface CUSTOMER_INFO {
  name?: string;
  dob?: string;
  idnum?: string;
  gender?: string;
  national?: string;
  hometown_province?: string;
  address?: string;
}

export interface CUSTOMER_INFO_UPDATE {
  name?: string;
  dob?: string;
  idnum?: string;
  gender?: string;
  national?: string;
  address?: string;
}

export interface SessionServiceInterface {
  getSessionInfo(query: any): Promise<number>;
}
