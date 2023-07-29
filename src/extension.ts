"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("Welcome to unix-to-utc!");
  const replace = vscode.commands.registerCommand("unix-to-utc.replace", () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      if (selection.isEmpty) {
        vscode.window.showInformationMessage("Please select a unix timestamp!");
        return;
      }

      const text = document.getText(selection);

      console.log(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, "Poof");
      });
    }
  });
  context.subscriptions.push(replace);

  const convert = vscode.commands.registerCommand("unix-to-utc.convert", () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      if (selection.isEmpty) {
        vscode.window.showInformationMessage("Please select a unix timestamp!");
        return;
      }

      const text = document.getText(selection);

      console.log(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, "CONVERT INSTEAD");
      });
    }
  });
  context.subscriptions.push(convert);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let HelloWorld = vscode.commands.registerCommand(
    "unix-to-utc.HelloWorld",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Unix to UTC!");
    }
  );
  context.subscriptions.push(HelloWorld);
}

// This method is called when your extension is deactivated
export function deactivate() {}
