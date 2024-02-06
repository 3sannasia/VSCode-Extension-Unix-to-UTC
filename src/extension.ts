// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec, ChildProcess } from "node:child_process";
require("node-fetch");
import path from "path";

let api_process: ChildProcess;

function showCopyWindow(text: string) {
  vscode.window.showInformationMessage(text, "Copy").then((value) => {
    if (value === "Copy") {
      vscode.env.clipboard.writeText(text);
      vscode.window.showInformationMessage(`Copied ${text}`);
    }
  });
}

async function convertTime(context: vscode.ExtensionContext) {
  let convertTimeCommand = vscode.commands.registerCommand(
    "unix-to-utc.convertTime",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);
        console.log(text);
        console.log("http://127.0.0.1:8001/convert/" + text.toString()) + "/";
        const response = await fetch(
          `http://127.0.0.1:8001/convert/${text.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: any = await response.json();
        const converted_time = data["date"];
        showCopyWindow(converted_time.toString());
        // editor.edit((editBuilder) => {
        //   editBuilder.replace(selection, converted_time.toString());
        // });
      }
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
      showCopyWindow(cur_utc.toString());
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
      showCopyWindow(cur_unix.toString());
    }
  );
  context.subscriptions.push(getUnixTimeCommand);
}

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Unix to UTC is now active");
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
  convertTime(context);
  getUTCTime(context);
  getUnixTime(context);
}

export function deactivate() {
  console.log("Deactivated extension. Killing API process.");
  api_process.kill("SIGINT");
}
