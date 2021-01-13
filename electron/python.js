const { ipcMain, dialog } = require("electron");
const PS = require("python-shell");

module.exports = (mainWindow) => {
  // alert(__dirname)
  // dialog.showMessageBoxSync(mainWindow, {
  //   title: 'sembarang',
  //   message: __dirname
  // })
  PS.PythonShell.run(__dirname + "/../python/dummy.py", {}, (error) => {
    console.log(error)
  }).stdout.on('data', (data) => {
    mainWindow.send("sensor-data", data);
  });
};
