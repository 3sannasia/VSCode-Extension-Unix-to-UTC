// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as child_process from "child_process";

function replaceUnixWithUTC(context: vscode.ExtensionContext): void {
  const replaceUnix = vscode.commands.registerCommand(
    "unix-to-datetime-to-epoch.replace_unix",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);
        const unix = parseFloat(text);

        if (
          isNaN(unix) ||
          unix < 0 ||
          selection.isEmpty ||
          !selection.isSingleLine
        ) {
          vscode.window.showInformationMessage(
            "Please select a valid unix timestamp!"
          );
          return;
        }

        const datetime = UnixToDatetime(unix);
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
            vscode.window.showInformationMessage(`Copied ${datetime}`);
          }
        });
      }
    }
  );
  context.subscriptions.push(convert);
}

function replaceDatetimeWithUnix(context: vscode.ExtensionContext) {
  const replace_datetime = vscode.commands.registerCommand(
    "unix-to-datetime-to-epoch.replace_datetime",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        var text = document.getText(selection);

        if (text.at(0) == '"' && text.at(text.length - 1) == '"') {
          text = text.slice(1, text.length - 1);
        }

        const date = DatetimeToDate(text);
        const unix = DateToUnix(date);

        if (isNaN(unix)) {
          vscode.window.showInformationMessage(
            "Please select a valid datetime!"
          );
          return;
        }

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, unix.toString());
        });
      }
    }
  );
  context.subscriptions.push(replace_datetime);
}

// function showUnixFromUTC(context: vscode.ExtensionContext) {
//   const convert = vscode.commands.registerCommand(
//     "unix-to-datetime-to-epoch.show_unix",
//     () => {
//       const editor = vscode.window.activeTextEditor;

//       if (editor) {
//         const document = editor.document;
//         const selection = editor.selection;

//         var text = document.getText(selection);

//         if (text.at(0) == '"' && text.at(text.length - 1) == '"') {
//           text = text.slice(1, text.length - 1);
//         }

//         const date = DatetimeToDate(text);
//         const unix = DateToUnix(date);

//         if (isNaN(unix)) {
//           vscode.window.showInformationMessage(
//             "Please select a valid datetime!"
//           );
//           return;
//         }
//         vscode.window
//           .showInformationMessage(unix.toString(), "Copy")
//           .then((value) => {
//             if (value === "Copy") {
//               vscode.env.clipboard.writeText(unix.toString());
//               vscode.window.showInformationMessage(`Copied ${unix}`);
//             }
//           });
//       }
//     }
//   );
//   context.subscriptions.push(convert);
// }

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Unix to UTC activated");

  // Commands to convert between Unix time and Python datetime objects
  showUnixFromUTC(context);
  showDatetimeFromUnix(context);

  replaceUnixWithUTC(context);
  replaceDatetimeWithUnix(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  vscode.window.showInformationMessage("Deactivated unix-to-utc");
}
