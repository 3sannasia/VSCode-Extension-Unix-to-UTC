// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec, ChildProcess } from "node:child_process";
require("node-fetch");
import path from "path";

let api_process: ChildProcess;

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

  api_process = exec(
    "python3 " + path.join(__dirname, "datetime_api.py"),
    (error, stderr) => {
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
  console.log("API started...http://127.0.0.1:8001");

  convertTime(context);
  getUTCTime(context);
  getUnixTime(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("deactivated");
  if (api_process) {
    api_process.kill();
  }
}
