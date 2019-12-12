var notifArea = document.createElement('div');
var style = document.createElement('style');
if (window.localStorage.getItem('notifications') == null || window.localStorage.getItem('notifications') == "undefined") {
	window.localStorage.setItem('notifications', '[]')
}
style.innerHTML = `
	.notifArea {
		position: fixed;
		bottom: 0px;
		right: 26px;
		width: 30%;
		margin: 3px;
	}
	.notification {
		padding: 10px;
		border-radius: 5px;
		margin: 3px;
		width: 100%;
		background: #353535;
		color: #ffffff;
	}
	.closeButton {
		background: #454545;
		padding: 4px;
		border-radius: 5px;
		color: #ffffff;
		margin-left: 10px;
	}
`;
notifArea.classList.add('notifArea');
notifArea.id = 'notifArea';
notifArea.append(style);
document.body.append(notifArea);

class Notifsys {
	constructor (key) {
		this.storageKey = key
		
	}
	get notifList() {
		return JSON.parse(window.localStorage.getItem(this.storageKey))
	}
	set notifList(notifList) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(notifList))
	}
	appendNotif (content, refresh) {
		let tmpnotif = {}
		let tmplist = this.notifList
		tmpnotif.content = content
		tmplist.push(tmpnotif)
		this.notifList = tmplist
		if (refresh == true) {
			refreshNotifications()
		}
	}
}

var notifsys = new Notifsys('notifications')

function removeNotif(notifID) {
	if (typeof notifID !== "number") {
		return console.error(this + ": TypeError, expected number, got " + typeof notifID)
	}
	let x = notifsys.notifList
	x.splice(notifID, 1)
	notifsys.notifList = x
}

function refreshNotifications() {
	let notifArea = document.getElementById('notifArea');
	notifArea.innerHTML = ""
	notifArea.appendChild(style)
	let notifs = notifsys.notifList;
	for (i in notifs) {
		let x = notifs[i];
		let y = document.createElement('div');
		let text = document.createElement('div');
		let closeButton = document.createElement('button');
		text.id = i
		closeButton.addEventListener('click', evt=>{
			console.log(evt)
			let x = evt.path[1].id
			x = parseInt(x, 10)
			console.log(x)
			removeNotif(x)
			refreshNotifications()
		}
		)
		text.innerHTML = x.content;
		closeButton.classList.add('closeButton')
		closeButton.innerHTML = 'Dismiss'
		text.appendChild(closeButton)
		y.appendChild(text)
		y.classList.add('notification')
		notifArea.appendChild(y)
	}
	;
}
;

refreshNotifications()
