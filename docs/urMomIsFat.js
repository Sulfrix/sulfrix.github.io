var urmom = prompt("On a scale from one to ten, how fat is your mom?");
var urmom = urmom / 2
var urmom = urmom * 2
if (urmom != NaN) {
    alert("Hah.");
    var mymomscale = Math.round(urmom / 2);
    var mymomstring = "You see, my mom is ";
    var mymomstring = mymomstring.concat(mymomscale);
    alert(mymomstring)
    window.location.replace("https://theslaymann.github.io/");
}
else {
    alert("oh my god you fucking idiot you're supposed to type a number!");
}
