"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// Helper functions
function DatetimeToDate(pythonDateTimeString: string): Date {
  // Split the string into date and time parts
  const [datePart, timePart] = pythonDateTimeString.split(" ");

  // Split the date part into year, month, and day components
  const [year, month, day] = datePart.split("-").map(Number);

  // Split the time part into hour, minute, and second components
  const [hour, minute, second] = timePart.split(":").map(Number);

  // Create a new UTC Date object using the components
  // Note: Months in JavaScript's Date are 0-indexed, so we need to subtract 1 from the month value.
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  return date;
}

// Helper function to convert Python datetime object to Unix time
function DateToUnix(dateTime: Date): number {
  // Get the number of milliseconds since January 1, 1970 (Unix epoch time)
  const unixTimestamp = dateTime.getTime();

  // Convert milliseconds to seconds and return the Unix timestamp as a number
  return unixTimestamp / 1000;
}

// Helper function to convert Unix time to Python datetime object
function UnixToDatetime(unixTime: number): string {
  // Convert Unix time (in seconds) to milliseconds by multiplying with 1000
  const milliseconds = unixTime * 1000;

  // Create a new Date object using the milliseconds
  const date = new Date(milliseconds);

  // Get individual components of the date
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  // Format the date as a string in the Python datetime object format
  const pythonDateTimeFormat = `"${year}-${padZero(month)}-${padZero(
    day
  )} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}"`;

  return pythonDateTimeFormat;
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

function replaceUnixWithUTC(context: vscode.ExtensionContext): void {
  const replace_unix = vscode.commands.registerCommand(
    "unix-to-utc.replace_unix",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);
        const unix_float = parseFloat(text);

        if (
          isNaN(unix_float) ||
          unix_float < 0 ||
          selection.isEmpty ||
          !selection.isSingleLine
        ) {
          vscode.window.showInformationMessage(
            "Please select a valid unix timestamp!"
          );
          return;
        }

        const datetime = UnixToDatetime(unix_float);
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, datetime);
        });
      }
    }
  );

  context.subscriptions.push(replace_unix);
}

function showDatetimeFromUnix(context: vscode.ExtensionContext): void {
  const convert = vscode.commands.registerCommand(
    "unix-to-utc.show_datetime",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);
        const unix_float = parseFloat(text);

        if (
          isNaN(unix_float) ||
          unix_float < 0 ||
          selection.isEmpty ||
          !selection.isSingleLine
        ) {
          vscode.window.showInformationMessage(
            "Please select a valid unix timestamp!"
          );
          return;
        }

        const datetime = UnixToDatetime(unix_float);

        vscode.window.showInformationMessage(datetime, "Copy").then((value) => {
          if (value === "Copy") {
            vscode.env.clipboard.writeText(datetime);
          }
          vscode.window.showInformationMessage(`Copied ${datetime}`);
        });
      }
    }
  );
  context.subscriptions.push(convert);
}

// FIX
function replaceDatetimeWithUnix(context: vscode.ExtensionContext) {
  const replace_datetime = vscode.commands.registerCommand(
    "unix-to-utc.replace_datetime",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, "to_replace");
        });
      }
    }
  );
  context.subscriptions.push(replace_datetime);
}

function showUnixFromUTC(context: vscode.ExtensionContext) {}

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Welcome to unix-to-utc!");

  // Commands to convert between Unix time and Python datetime objects
  replaceUnixWithUTC(context);
  replaceDatetimeWithUnix(context);

  showUnixFromUTC(context);
  showDatetimeFromUnix(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
