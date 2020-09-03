var wordIndex = 0;
var currentList;
var keywords = {};
keywords.get = new Keyword("audio/get.mp3");
keywords.wi = new Keyword("audio/wi.mp3");
keywords.fi = new Keyword("audio/fi.mp3");
keywords.anywhere = new Keyword("audio/anywhere.mp3");
keywords.you = new Keyword("audio/you.mp3");
keywords.go = new Keyword("audio/go.mp3");

function getwifi(text) {
	let wordsToPlay = [];
	let words = text.match(/\w+/g);
	for (i of words) {
		console.log(i);
		if (keywords[i]) {
			wordsToPlay.push(new Keyword(keywords[i].filepath));
		}
	}
	console.log(wordsToPlay);
	setTimeout(function () {
		playwords(wordsToPlay);
	}, 1000);
}

function playwords(words) {
	wordIndex = 0;
	currentList = words;
	playNext();
}

function playNext() {
	if (wordIndex < currentList.length) {
		if (currentList[wordIndex].audio) {
			if (!currentList[wordIndex].audio.playing) {
				currentList[wordIndex].audio.play();
			}
			if (wordIndex + 1 <= currentList.length) {
				setTimeout(function () {
					wordIndex += 1;
					playNext();
				}, currentList[wordIndex].audio.duration * 900);
			}
		}
	}
}

function getwififrominput() {
	getwifi(document.getElementById("inputbox").value);
}

function updatePreview() {
	let text = document.getElementById("inputbox").value;
  let errors = 0;
  let unknownwords = [];
	let words = text.match(/\w+/g);
	for (i in words) {
		if (!Object.keys(keywords).includes(words[i])) {
      errors++;
      unknownwords.push(words[i])
			words.splice(i);
		}
  }
	text = words.join(" ");
  if (errors > 0) {
    text = text + `<div style="color: red;">${unknownwords.join(", ")}</div>`
  }
	document.getElementById("validDisplay").innerHTML = text;
}
