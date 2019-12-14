console.log(this + ": Loading notification system")
var notifArea = document.createElement('div');
var style = document.createElement('link');
if (window.localStorage.getItem('notifications') == null || window.localStorage.getItem('notifications') == "undefined") {
	window.localStorage.setItem('notifications', '[]')
}
var closingAnimations = 0
style.rel = 'stylesheet'
style.href = 'styles/css/notifications.css'
notifArea.classList.add('notifArea');
notifArea.id = 'notifArea';
document.body.append(style);
document.body.append(notifArea);

class Notifsys {
	constructor(key) {
		this.storageKey = key

	}
	get notifList() {
		return JSON.parse(window.localStorage.getItem(this.storageKey))
	}
	set notifList(notifList) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(notifList))
	}
	appendNotif(content, refresh) {
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
	let notifs = notifsys.notifList;
	for (i in notifs) {
		let x = notifs[i];
		let y = document.createElement('div');
		let text = document.createElement('div');
		let closeButton = document.createElement('button');
		text.id = i
		closeButton.addEventListener('click', evt => {
			evt.path[0].classList.add('closingNotif')
			evt.path[2].classList.add('closingNotif')
			let x = evt.path[1].id
			x = parseInt(x, 10)
			removeNotif(x)
			closingAnimations += 1
			setTimeout(function () {
				evt.path[2].classList.add('closedNotif')
				closingAnimations -= 1
				if (closingAnimations <= 0) {
					refreshNotifications()
				}
			}, 1000)

		})
		y.addEventListener('click', evt => {
			console.log(evt.path)
		})
		text.innerHTML = x.content;
		closeButton.classList.add('closeButton')
		closeButton.innerHTML = 'Dismiss'
		text.classList.add('text')
		y.classList.add('notification')
		notifArea.appendChild(y)
		y.appendChild(text)
		text.appendChild(closeButton)
	};
};

refreshNotifications()
