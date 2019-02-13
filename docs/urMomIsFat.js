var urmom = prompt("On a scale from one to ten, how fat is your mom?");
if (urmom != NaN) {
    alert("Hah.");
    var mymomscale = Math.round(urmom / 2);
    var mymomstring = "You see, my mom is ";
    var mymomstring = mymomstring.concat(mymomscale);
    alert(mymomstring)
}
else {
    alert("oh my god you fucking idiot you're supposed to type a number!");
}
