import * as vscode from "vscode"
import * as path from "path"
import { extensionContext } from "./extension";

export interface DubDependencyInfo {
	name: string;
	version: string;
	path: string;
	description: string;
	homepage: string;
	authors: string[];
	copyright: string;
	license: string;
	subPackages: string[];
	hasDependencies: boolean;
	root: boolean;
}

export class DubDependency extends vscode.TreeItem {
	constructor(info: DubDependencyInfo, command?: vscode.Command, icon?: string);
	constructor(info: string, command?: vscode.Command, icon?: string);
	constructor(info: DubDependencyInfo | string, command?: vscode.Command, icon?: string) {
		super(typeof info == "string" ? info : info.name + ":  " + info.version,
			typeof info == "string" ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
		if (typeof info == "object") {
			this.info = info;
			this.iconPath = {
				light: extensionContext.asAbsolutePath(path.join("images", "dependency-light.svg")),
				dark: extensionContext.asAbsolutePath(path.join("images", "dependency-dark.svg"))
			};
			this.command = {
				command: "code-d.viewDubPackage",
				title: "Open README",
				tooltip: "Open README",
				arguments: [info.path, info.name]
			};
			this.contextValue = info.root ? "root" : "dependency";
		}
		if (command)
			this.command = command;
		if (icon)
			this.iconPath = {
				light: extensionContext.asAbsolutePath(path.join("images", icon + "-light.svg")),
				dark: extensionContext.asAbsolutePath(path.join("images", icon + "-dark.svg"))
			};
	}

	info?: DubDependencyInfo;
	command?: vscode.Command;
}
