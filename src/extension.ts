// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Extension from './classes/ExtensionModel';

const extension = new Extension(vscode);

// // This method is called when your extension is activated
export const activate = (context: vscode.ExtensionContext) => {
  let disposable = vscode.commands.registerCommand(
    'cg.folderStructure',
    extension.init
  );

  context.subscriptions.push(disposable);
};

// This method is called when your extension is deactivated
export const deactivate = () => {};
