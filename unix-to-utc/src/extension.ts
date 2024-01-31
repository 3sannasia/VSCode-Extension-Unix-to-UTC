// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "node:child_process";
require("node-fetch");
import path from "path";

async function convertTime(context: vscode.ExtensionContext) {
  let convertTimeCommand = vscode.commands.registerCommand(
    "unix-to-utc.convertTime",
    () => {
      vscode.window.showInformationMessage("convertTime activated!");
    }
  );

  context.subscriptions.push(convertTimeCommand);
}

async function getUTCTime(context: vscode.ExtensionContext) {
  let getUTCTimeCommand = vscode.commands.registerCommand(
    "unix-to-utc.getUTCTime",
    () => {
      vscode.window.showInformationMessage("getUTCTime activated!");
    }
  );
  // const response = await fetch("http://127.0.0.1:8000/current_utc_timestamp");
  // const data = await response.json();
  // console.log(data);
  context.subscriptions.push(getUTCTimeCommand);
}

function getUnixTime(context: vscode.ExtensionContext) {
  let getUnixTimeCommand = vscode.commands.registerCommand(
    "unix-to-utc.getUnixTime",
    () => {
      vscode.window.showInformationMessage("getUnixTime activated!");
    }
  );
  context.subscriptions.push(getUnixTimeCommand);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "unix-to-utc" is now active!');
  console.log("current path is: ", __dirname);
  const path1 = path.relative(
    __dirname,
    "/home/margpi/Desktop/VSCode-Extension-unix-to-utc/unix-to-utc/dist/api.sh"
  );
  console.log(path1);
  const child = exec(
    path.join(__dirname, "api.sh"),
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Script execution resulted in an error: ${stderr}`);
        return;
      }
    }
  );

  convertTime(context);
  getUTCTime(context);
  getUnixTime(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("deactivated");
  // const child = exec()
}
