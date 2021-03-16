const { app, BrowserWindow} = require('electron');
const path = require('path');

setTimeout(function(){
    require(path.join(__dirname,"./ipc_communications"))();
},500);


app.commandLine.appendSwitch("use-cmd-decoder","validating") //prevent graphical glitches (hopefully)
app.commandLine.appendSwitch("use-gl","desktop"); //prevent graphical glitches (hopefully)

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
 //   resizable: false,
//        frame: false ,
    webPreferences: {
      enableRemoteModule:false,
      preload: path.join(__dirname,'./preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      allowRunningInsecureContent: false,
      sandbox: true,
    }/*,
    icon: "/view_resources/img/aliwa_icon_256.png" */// crashes on startup | __dirname is not needed here
  });

  win.loadFile('index.html')
//  win.setMenu(null)
//  win.setIcon(__dirname+"/view_resources/img/aliwa_icon_256.png") // no crash but default icon remains | __dirname is needed here

    }
 

 
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//prevent external links
app.on('web-contents-created', (event, contents) => {  
        contents.on('will-navigate', (event, navigationUrl) => {
            event.preventDefault()});
    });

app.on('activate', () => {   
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
    
    
    

    
   
//    contextBridge.exposeInMainWorld("app", {}
//        ipcRenderer_invoke: (channel) => ipcRenderer.invoke("channel",channel)
//        );

//
//ipcRenderer_handle: (channel,...params) => ipcRenderer.handle(channel, async (event, ...params) => {
//        console.log(event);
//        console.log(params);
//        }),






//    const electron = require('electron'),
//            ipc = electron.ipcMain;
//    require(".logic/wallet")();        
//    /* remaining code
//     .
//     .
//     */
//////Receive and reply to synchronous message
////ipc.on('helloSync', (event, args) => {
//// //do something with args
//// event.returnValue = 'Hi, sync reply';
////});
//
////Receive and reply to asynchronous message
//    ipc.on('get_overview', (event, args) => {
////        event.sender.send('asynReply', 'Hi, asyn reply');
//    console.log("fetch overview....")
//    });




});

