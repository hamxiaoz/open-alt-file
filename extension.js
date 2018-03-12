// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "open-alt-file" is now active!');

  ["extension.openSpec",
    "extension.openSass",
    "extension.openHtml",
    "extension.openOriginal"
  ].map((command) => vscode.commands.registerCommand(command, () => handleCommand(command)))
    .forEach((registedCommand) => context.subscriptions.push(registedCommand));
}

function handleCommand(command) {
  const doc = vscode.window.activeTextEditor.document;

  const sourcePath = getSourcePath(doc.uri.fsPath);
  if (sourcePath === undefined) {
    return;
  }

  const path = getNewPath(sourcePath, command);

  if (!fs.existsSync(path)) {
    createFile(fs, path);
  }

  openFileInEditor(vscode, path);
}

function getSourcePath(filePath) {
  const result = /(\S*\.(component|service|directive|pipe))\./.exec(filePath);
  return result ? result[1] : undefined;
}

function getNewPath(sourcePath, command) {
  let suffix;
  switch (command) {
    case 'extension.openSpec':
      suffix = '.spec.ts';
      break;
    case 'extension.openSass':
      suffix = '.scss';
      break;
    case 'extension.openHtml':
      suffix = '.html';
      break;
    case 'extension.openOriginal':
      suffix = '.ts';
      break;
  }
  return sourcePath + suffix;
}

function createFile(fs, path) {
  try {
    fs.closeSync(fs.openSync(path, 'w'))
  } catch (error) {
    console.error(error)
  }
}

function openFileInEditor(vscode, path) {
  try {
    const document = vscode.workspace.openTextDocument(path);
    vscode.window.showTextDocument(document, 1);
  } catch (error) {
    vscode.window.showErrorMessage('Unable to open ' + path)
    console.error(error)
  }
}

exports.activate = activate;
exports.getSourcePath = getSourcePath;