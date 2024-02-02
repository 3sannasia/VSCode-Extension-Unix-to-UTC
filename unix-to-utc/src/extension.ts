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
    async () => {
      const response = await fetch(
        "http://127.0.0.1:8001/current_utc_timestamp"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: any = await response.json();
      const cur_utc = data["date"];
      vscode.window.showInformationMessage(cur_utc, "Copy").then((value) => {
        if (value === "Copy") {
          vscode.env.clipboard.writeText(cur_utc);
          vscode.window.showInformationMessage(`Copied ${cur_utc}`);
        }
      });
    }
  );

  context.subscriptions.push(getUTCTimeCommand);
}

async function getUnixTime(context: vscode.ExtensionContext) {
  let getUnixTimeCommand = vscode.commands.registerCommand(
    "unix-to-utc.getUnixTime",
    async () => {
      const response = await fetch(
        "http://127.0.0.1:8001/current_unix_timestamp"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: any = await response.json();
      const cur_unix = data["date"].toString();
      vscode.window.showInformationMessage(cur_unix, "Copy").then((value) => {
        if (value === "Copy") {
          vscode.env.clipboard.writeText(cur_unix);
          vscode.window.showInformationMessage(`Copied ${cur_unix}`);
        }
      });
    }
  );
  context.subscriptions.push(getUnixTimeCommand);
}

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Unix to UTC Extension Activated");
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
  console.log("API started at http://127.0.0.1:8001");
  vscode.window.showInformationMessage("API started at http://127.0.0.1:8001");
  convertTime(context);
  getUTCTime(context);
  getUnixTime(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("deactivated");
  api_process.kill();
  vscode.window.showInformationMessage("Deactivated Unix to UTC");
}
