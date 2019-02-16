function FigureItOut() {
	var elmo = "The American Public School System!";
	document.getElementById("answer").innerHTML = elmo;
	document.getElementById("revealButton").innerHTML = "Hide answer";
	document.getElementById("revealButton").onClick = "hideAnswer()";
}
function hideAnswer() {
	document.getElementById("answer") = "";
	document.getElementById("revealButton").innerHTML = "Reveal answer";
	document.getELementById("revealButton").onClick = "FigureItOut()"
}
