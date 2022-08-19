export type FileType = {
  fileCopyUri: string | null;
  size: number;
  name: string;
  type: 'image/png' | 'text/comma-separated-values' | 'text/csv';
  uri: string;
};
export type ImageObjectType = {name: string; url: string};

export type DocumentObjectType = {
  name: string;
  url: string;
  header?: string;
  data?: string;
};
