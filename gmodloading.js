var IN_ENGINE = navigator.userAgent.indexOf( "Valve Source Client" ) != -1;

var music = new Audio("/gmodloadMusic.mp3");
music.volume = 0.5;
music.play();

if (outerWidth > 2560 && outerHeight > 1440) {
	document.all[0].setAttribute("style", "zoom: 150%");
}

function miniconsole(text, hoverText) {
	let ele = document.createElement("div");
	ele.className = "logMessage";
	let hoverMessage = document.createElement("div");
	hoverMessage.className = "logHover";
	//hoverMessage.innerHTML = hoverText
	let anchor = document.getElementById("anchor");
	ele.innerHTML = text;
	document.querySelector(".miniConsole").insertBefore(ele, anchor);
	ele.appendChild(hoverMessage);
	ele.scrollIntoView();
}

var fields = {
	serverName: document.getElementById("ServerName"),
	loadingStatus: document.getElementById("LoadingStatus"),
	filesNeeded: 0,
	currentFiles: 0,
};

function GameDetails(
	servername,
	serverurl,
	mapname,
	maxplayers,
	steamid,
	gamemode
) {
	fields.serverName.innerHTML = servername;
	miniconsole("Welcome to " + servername, "GameDetails()");
	miniconsole("Current Map: " + mapname + " on " + gamemode);
	document.documentElement.style.backgroundImage = `url("gmodBackgrounds/${mapname}.jpg")`;
}

function SetStatusChanged(status) {
	fields.loadingStatus.innerHTML = status;
	miniconsole(status, "SetStatusChanged()");
}

function SetFilesTotal(total) {
	fields.currentFiles = total;
}

function SetFilesNeeded(needed) {
	fields.filesNeeded = needed;
	refreshProgress();
}

function refreshProgress() {
	var calculated;
	let currentFiles = fields.currentFiles;
	let filesNeeded = fields.filesNeeded;
	calculated = ((currentFiles - filesNeeded) / currentFiles) * 100;
	document.getElementById("progress").style = `width: ${calculated}%`;
}

function devMode() {
	GameDetails("Garry's Mod", "penis", "gm_construct", 12, undefined, "Sandbox");
	SetFilesTotal(100);
	SetFilesNeeded(25);
	SetStatusChanged("[Dev Mode] Loading text goes here");
	miniconsole("Developer mode enabled.")
}

function DownloadingFile(file) {
	SetStatusChanged("Downloading: " + file)
}

if (!IN_ENGINE) {
	devMode()
}



var clickevent = function(e) {
	music.play()
	document.removeEventListener("click", clickevent)
}

document.addEventListener("click", clickevent)

