import { app, BrowserWindow } from "electron";

export default async (context: Context) => {
    await new Promise(resolve => {
        app.on("ready", resolve);
    });

    const mainWin = new BrowserWindow({
        width: 604,
        height: 490,
        center: true,
        resizable: false,
        show: false,
        webPreferences: {
            autoplayPolicy: "no-user-gesture-required",
            nodeIntegration: true,
        },
    });

    mainWin.center();

    void mainWin.loadURL(context.runtime.startURL);

    context.wins.main = mainWin;
};
