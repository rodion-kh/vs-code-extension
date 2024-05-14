import * as ExtensionTemplates from '../templates';
import ExtensionRepository from './ExtensionRepository';
import { ucFirst } from '../util';

type TConstructor = { componentName: string; pathToFolder: string };

export default class FolderStructure {
  componentName: string;
  pathToFolder: string;
  repository: ExtensionRepository;
  constructor({ componentName, pathToFolder }: TConstructor) {
    this.componentName = ucFirst(componentName.trim());
    this.pathToFolder = pathToFolder;
    this.repository = new ExtensionRepository({
      pathToFolder: this.pathToFolder,
      componentName: this.componentName,
    });
  }

  async #createCssFile(componentName: string) {
    const fileName = `${componentName}.module.css`;
    await this.repository.writeFile(
      fileName,
      ExtensionTemplates.cssTemplate(componentName)
    );
  }

  async #createTsxFile(componentName: string) {
    const fileName = `${componentName}.tsx`;
    await this.repository.writeFile(
      fileName,
      ExtensionTemplates.tsTemplate(componentName)
    );
  }

  async #createIndexFile(componentName: string) {
    const fileName = `index.ts`;
    await this.repository.writeFile(
      fileName,
      ExtensionTemplates.indexTemplate(componentName)
    );
  }

  createFolderStructure = async (): Promise<boolean> => {
    if (await this.repository.createFolder()) {
      this.#createCssFile(this.componentName);
      this.#createTsxFile(this.componentName);
      this.#createIndexFile(this.componentName);
      return true;
    }

    return false;
  };
}
