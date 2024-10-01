function incrementHannah() {
	a = document.getElementById("swearHannah").innerHTML;
	document.getElementById("swearHannah").innerHTML = parseInt(a) + 1;
}

function incrementMatt() {
	a = document.getElementById("swearMatt").innerHTML;
	document.getElementById("swearMatt").innerHTML = parseInt(a) + 1;
}

function sworeHannah() {
	openOverlay("Hannah")
}

function sworeMatt() {
	openOverlay("Matt")
}

function closeOverlay() {
	document.getElementById("overlay").style.display = "none";
	clearInterval(interval)
}

function openOverlay(name) {
	document.getElementById("curser").innerHTML = name;
	document.getElementById("overlay").style.display = "block";
	interval = setInterval(checkIfCustom, 10);
}

function checkIfCustom() {
	if (document.getElementById("swear").value == "other") {
		document.getElementById("customSwear").style.display = "block"
	} else {
		document.getElementById("customSwear").style.display = "none"
	}
}

function submitForm() {
	if (document.getElementById("swear").value != "name") {
		output = "<tr><th>" + document.getElementById("curser").innerHTML + "</th><th>";
		if (document.getElementById("swear").value == "other") {
			if (document.getElementById("inputSwear").value.trim() == "") {
				window.alert("Input a swear!");
				return 0;
			} else {
				output += document.getElementById("inputSwear").value + "</th><th>";
			}
		} else {
			output += document.getElementById("swear").value + "</th><th>";
		}
		const date = new Date();
		output += date;
		if (document.getElementById("curser").innerHTML == "Hannah") {
			incrementHannah()
		} else {
			incrementMatt()
		}
		document.getElementById("historyTable").innerHTML = output + document.getElementById("historyTable").innerHTML;
		updateUtang();
		closeOverlay();
	} else {
		window.alert("Select a swear!");
	}
}

function save() {
	const text = document.getElementById("swearHannah").innerHTML + "\n" + document.getElementById("swearMatt").innerHTML + "\n" + document.getElementById("historyTable").innerHTML
	const blob = new Blob([text], { type: "text/plain" });
	
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "save.txt";
	link.click();
}

function load() {
	const fileInput = document.getElementById("fileInput");
	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const fileContent = e.target.result;
			const lines = fileContent.split("\n");
			var output = ""
			for (let i = 0; i < lines.length; i++) {
				if (i == 0) {
					document.getElementById("swearHannah").innerHTML = lines[0];
				} else if (i == 1) {
					document.getElementById("swearMatt").innerHTML = lines[1];
				} else {
					output += lines[i]
				}
			}
			document.getElementById("historyTable").innerHTML = output;
			updateUtang();
		};
		reader.readAsText(file);
	} else {
		alert("Please select a .txt file to upload.");
	}
}

function subLoad() {
	document.getElementById("fileInput").click();
}

function updateUtang() {
	hannah = parseInt(document.getElementById("swearHannah").innerHTML)
	matt = parseInt(document.getElementById("swearMatt").innerHTML)
	if (hannah > matt) {
		utangan = "Current utangan: Hannah";
		utang = hannah - matt + "Php";
	} else if (hannah < matt) {
		utangan = "Current utangan: Matt";
		utang = matt - hannah + "Php"
	} else {
		utangan = "No current utangan";
		utang = "No current utang";
	}
	document.getElementById("utangan").style.display = "inline-block"
	document.getElementById("utang").style.display = "inline-block"
	document.getElementById("utangan").innerHTML = utangan;
	document.getElementById("utang").innerHTML = utang
}

function changeTheme() {
	if (document.getElementById("lilac") != null) {
		document.getElementById("lilac").id = "brown";
		document.getElementById("html").style.background = '#f9c377';
		const a = document.getElementsByClassName("p")
		for (let i = 0; i < a.length; i++) {
			a[i].style.color = "#ae4b30";
		}
	} else if (document.getElementById("brown") != null) {
		document.getElementById("brown").id = "lilac";
		document.getElementById("html").style.background = 'rgba(184,158,195,1)';
		const a = document.getElementsByClassName("p")
		for (let i = 0; i < a.length; i++) {
			a[i].style.color = "#633975";
		}
	}
}

var interval = ""
