export interface BlacklistRequestData {
  db_Id: number;
  Adi: string;
}

export interface BlacklistItem {
  [key: string]: string | number | null | undefined;
  Id: number;
  Adi: string;
  Soy: string;
  Aciklama: string;
}

export interface BlacklistResponse {
  isSucceded: boolean;
  message: string | null;
  messageList: string[];
  value: BlacklistItem[];
}

export interface BlacklistDataProps {
  requestData: BlacklistRequestData;
}

export interface BlacklistAddUpdateRequest {
  db_Id: number;
  Id: number;
  Adi: string;
  Soy: string;
  Aciklama: string;
}
