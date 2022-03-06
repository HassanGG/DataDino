export interface Dataset {
  id: string;
  name: string;
  description?: string;
  datapointPrice: number;
  datapointCount: number;
  uploadedAt: string;
  archived: boolean;
}

export interface PostDataset {
  name: string;
  description?: string;
  datapointPrice: number;
  datapointCount: number;
  uploadedAt: string;
  archived: boolean;
}

export interface PatchDataset {
  name?: string;
  description?: string;
  datapointPrice?: number;
  datapointCount?: number;
  archived?: boolean;
}
