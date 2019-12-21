var music = new Audio('/gmodloadMusic.mp3')

music.play()

var fields = {
    serverName: document.getElementById('ServerName'),
    loadingStatus: document.getElementById('LoadingStatus'),
    filesNeeded: 0,
    currentFiles: 0,
}


function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    fields.serverName.innerHTML = servername
}

function SetStatusChanged(status) {
    fields.loadingStatus.innerHTML = status
}

function SetFilesTotal(total) {
    fields.currentFiles = total
}

function SetFilesNeeded(needed) {
    fields.filesNeeded = needed
    refreshProgress()
}

function refreshProgress() {
    var calculated
    let currentFiles = fields.currentFiles
    let filesNeeded = fields.filesNeeded
    calculated = ((currentFiles - filesNeeded) / currentFiles) * 100
    document.getElementById('progress').style = `width: ${calculated}%`
}