export interface BlacklistRequestData {
  db_Id: number;
  Adi: string;
  tip?: number;
}

export interface BlacklistItem {
  [key: string]: string | number | null | undefined;
  Id: number;
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
  Aciklama?: string;
}
