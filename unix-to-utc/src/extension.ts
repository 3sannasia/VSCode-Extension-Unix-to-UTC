// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


function convertTime(context: vscode.ExtensionContext) {
	let convertTimeCommand = vscode.commands.registerCommand('unix-to-utc.convertTime', () => {
		vscode.window.showInformationMessage('convertTime activated!');
	});
	context.subscriptions.push(convertTimeCommand);
}

function getUTCTime(context: vscode.ExtensionContext) {
	let getUTCTimeCommand = vscode.commands.registerCommand('unix-to-utc.getUTCTime', () => {
		vscode.window.showInformationMessage('getUTCTime activated!');
	});
	context.subscriptions.push(getUTCTimeCommand);
}

function getUnixTime(context: vscode.ExtensionContext) {
	let getUnixTimeCommand = vscode.commands.registerCommand('unix-to-utc.getUnixTime', () => {
		vscode.window.showInformationMessage('getUnixTime activated!');
	});
	context.subscriptions.push(getUnixTimeCommand);
}



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "unix-to-utc" is now active!');

	convertTime(context);
	getUTCTime(context);
	getUnixTime(context);

}

// This method is called when your extension is deactivated
export function deactivate() {}
