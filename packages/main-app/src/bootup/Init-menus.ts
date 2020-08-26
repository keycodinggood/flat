import { Menu, MenuItemConstructorOptions } from "electron";

export default (context: Context) => {
    const fileMenu: IMenu = {
        label: "File",
        submenu: [{ role: "close" }],
    };
    if (context.runtime.isWin) {
        fileMenu.submenu = [{ role: "quit" }];
    }

    const editMenu: IMenu = {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
        ],
    };
    if (context.runtime.isWin) {
        editMenu.submenu.push({ role: "delete" }, { type: "separator" }, { role: "selectAll" });
    } else {
        editMenu.submenu.push(
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
        );
    }

    const windowMenu: IMenu = {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }],
    };
    if (context.runtime.isWin) {
        windowMenu.submenu.push({ role: "close" });
    } else {
        windowMenu.submenu.push(
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
        );
    }

    const template: MenuItemConstructorOptions[] = [
        editMenu,
        fileMenu,
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        windowMenu,
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

type IMenu = {
    label: string;
    submenu: MenuItemConstructorOptions[];
};
