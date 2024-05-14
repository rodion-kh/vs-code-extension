import fs from 'node:fs/promises';
import path from 'node:path';

import { TWriteFileData } from '../interface';

type TConstructor = { pathToFolder: string; componentName: string };

export default class ExtensionRepository {
  pathToFolder: string;
  componentName: string;
  constructor({ pathToFolder, componentName }: TConstructor) {
    this.pathToFolder = pathToFolder;
    this.componentName = componentName;
  }

  #getPathToFolder(nameFile = '') {
    return path.join(this.pathToFolder, this.componentName, nameFile);
  }

  async #checkExistsDirectory(path: string): Promise<boolean> {
    try {
      const stat = await fs.stat(path);
      if (stat.isDirectory()) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  createFolder = async (): Promise<boolean> => {
    const folderName = this.#getPathToFolder();

    try {
      if (!(await this.#checkExistsDirectory(folderName))) {
        await fs.mkdir(folderName);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  writeFile = (fileName: string, data: TWriteFileData) => {
    const filePath = this.#getPathToFolder(fileName);
    return fs.writeFile(filePath, data, { encoding: 'utf-8' });
  };
}
