import type * as vscode from 'vscode';
import { IContext } from '../interface';
import FolderStructure from './ExtensionFolderStructure';

type TVscode = typeof vscode;

export default class ExtensionModel {
  editor: TVscode;
  constructor(vscode: TVscode) {
    this.editor = vscode;
  }

  init = async (context: undefined | IContext) => {
    if (context) await this.openContextMenu(context);
    else this.editor.window.showErrorMessage('Click to folder in side bar!');
  };

  async openContextMenu(context: IContext) {
    let response = await this.editor.window.showInputBox();

    if (!response)
      this.editor.window.showErrorMessage('No component name passed');
    else {
      const folderStructure = new FolderStructure({
        componentName: response,
        pathToFolder: context.fsPath,
      });

      const result = await folderStructure.createFolderStructure();

      if (result)
        this.editor.window.showInformationMessage('Components create');
      else this.editor.window.showErrorMessage('Doesnt create component');
    }
  }
}
