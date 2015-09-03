
LogParser = function() {
	this.failingTestsArray;
	window.lp = this;
};

LogParser.prototype.hello = function() {
	console.log("HELLOOOOOO bob");

};

LogParser.prototype.parse = function() {

	var taskLinks = jQuery(".task-link");

	for(var i = 0; i < taskLinks.length; i++)
	{
		if(taskLinks[i].href.indexOf("rebuild") > -1){
			Tamperer.rebuildLink = taskLinks[i].href;
			continue;
		}
	}


	var consoleOutput = document.getElementsByClassName("console-output")[1];

	var arrayOfOutputLines = consoleOutput.innerText.split('\n');

	var failingTestSuites = 0;
	var failingTests = 0;
	var currentTests = "";
	var testNames = "";
	
	for(var i = 0; i < arrayOfOutputLines.length; i++)
	{
		
		if(arrayOfOutputLines[i].indexOf("Testing ") > -1) {
			var line = arrayOfOutputLines[i];
			currentTests = line.split(" ")[1] + " " + line.split(" ")[2] .substring(0, line.split(" ")[2] .length - 1);
		}

		if(arrayOfOutputLines[i].indexOf("git checkout -f") > -1) {
			Tamperer.currentCommitHash = arrayOfOutputLines[i].split(" ")[5];
		}

		if(arrayOfOutputLines[i].indexOf("Tests Failed.") > -1) {
			failingTestSuites++;
			testNames += currentTests + "\n";
		}

		//
		if(arrayOfOutputLines[i].indexOf("; Fails:") > -1 && arrayOfOutputLines[i].indexOf("Windows: Run") == -1) {
			var line = arrayOfOutputLines[i];
			var fails = parseInt(arrayOfOutputLines[i].split(" ")[6]);
			failingTests+= fails;
		}

	}

	//TODO if(jstests)
	Tamperer.storage.failingTestsArray = $("span[title='Failed Tests']");

	jQuery("#failing-suites").text(failingTestSuites);
	jQuery("#failing-tests").text(failingTests);
	jQuery("#failing-suite-names").text(testNames);


	jQuery("#total-test").text(failingTestSuites);



};

