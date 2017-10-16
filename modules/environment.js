var shell = require('node-cmd');
var env = {

    getUserName: ()=>{
        var user = "";
        switch(process.platform){
            case 'darwin':      //MAC OS
            case 'freebsd':
            case 'linux':
            case 'sunos': user = process.env["USER"];
                          break;
            case 'win32': user = process.env["USERNAME"];
        }
        return user;
    },
    getDriveLetter: (path)=>{
        var drive ="Linux_Root";
        if (process.platform == 'win32')
            drive = path.charAt(0);
        return drive;
    },
    mkdir: (path,callback)=>{
        shell.get(`mkdir "${path}"`,(err,output,stderr)=>{
            callback(output,err);
        });
    },
}
module.exports = env;