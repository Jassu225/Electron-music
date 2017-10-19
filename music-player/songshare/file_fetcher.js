let file_count = 0;     // For counting no. of files added
function fetchFiles(){
    var path = dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    });

    if(file_count >= 100){
        alert('Cannot add more files. Maximum limit reached.');
        return;
    }
    if(path){
        for(var i = 0; i < path.length; i++){
            var i1 = path[i].lastIndexOf('/');
            var i2 = path[i].lastIndexOf('\\');
            var index = i1 > i2 ? i1 : i2 ;
            var stats = fs.statSync(path[i]);
            sender_container.innerHTML += `<div class="file" path="${path[i]}">` +
                                            `<p class="file-name">${path[i].slice(-1 * (path[i].length - index - 1))}</p>` +
                                            `<p style="display:inline-block;width:60px;padding-left:20px;">${formatBytes(stats.size)}</p>` +
                                            `<p style="width:20px;line-height:16px;float:right;font-size:30px;cursor:pointer;margin-right:12px;" onclick="removeFile(this)">&times;</p>` +
                                          `</div>`;
        }
    }
}

function formatBytes(bytes,decimals) {      // Function to convert file-size into human readable format
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }