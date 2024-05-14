export interface IContext {
  authority: string;
  fragment: string;
  fsPath: string;
  path: string;
  query: string;
  scheme: string;
}

export type TWriteFileData = string | NodeJS.ArrayBufferView | Uint8Array;
