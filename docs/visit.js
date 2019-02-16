http = new XMLHttpRequest;
url = "https://discordapp.com/api/webhooks/546392929091059722/TuHqYe5mZXqgfIZzdaj-gh7Z9GySCyNKNjlVHX0gDfutH07XdL-CwC0wsupeYees_dDN/slack";
http.open("POST", url, true);
http.setRequestHeader('Content-Type', 'application/json');
http.send(JSON.stringify({text: "Someone has visited the website."}))
