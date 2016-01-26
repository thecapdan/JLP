
LogParser = function(config) {
	this.config = config;
	this.testConfig = null;
	this.failingTestsArray;
	window.lp = this;
};

LogParser.prototype._getTestConfigForThisLog = function(){

};

LogParser.prototype.parse = function() {
	/*
	find rebuild link
	 */
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

	var testType = null;
	/*
	what kind of tests am i running
	 */
	for(var i = 0; i < arrayOfOutputLines.length; i++)
	{
		if(arrayOfOutputLines[i].indexOf("git checkout -f") > -1) {
			Tamperer.currentCommitHash = arrayOfOutputLines[i].split(" ")[5];
		}

		for(type in this.config) {
			var testIdentifier = this.config[type].logIdentifier;
			if(arrayOfOutputLines[i].indexOf(testIdentifier) > -1) {
				this.testConfig = this.config[type];
				Tamperer.storage.testType = testType = type;
				break;
			}
		}

		if(testType != null){
				break;
			}
	}

	var failingTests = 0;
	var currentTests = "";
	var testNames = "";
	if(testType == "JS") {

			
			for(i = 0; i < arrayOfOutputLines.length; i++)
			{
				var line = arrayOfOutputLines[i];
				if(arrayOfOutputLines[i].indexOf("Testing ") > -1) {
					currentTests = line.split(" ")[1] + " " + line.split(" ")[2] .substring(0, line.split(" ")[2] .length - 1);
				}

				if(arrayOfOutputLines[i].indexOf("Tests Failed.") > -1) {
					failingTests++;
					testNames += '<li>' + currentTests + '</li>';
				}

			}

			testNames = '<ul>' + testNames + '</ul>';
			//TODO if(jstests)
			Tamperer.storage.failingTestsArray = $("span[title='Failed Tests']");


		}

		else if(testType == "THUC"){
			Tamperer.storage.failingTestsArray = [];
			Tamperer.storage.testLocationPercentages = [];
			for(i = 0; i < arrayOfOutputLines.length; i++)
			{				
				if(arrayOfOutputLines[i].indexOf(this.testConfig.failureIdentifier) > -1) {
					//failingTestSuites++;
					console.log(arrayOfOutputLines[i]);
					debugger;
					failingTests++;
					testNames += '<li>' + arrayOfOutputLines[i].substr(13) + '</li>';
					Tamperer.storage.failingTestsArray.push("a failing test");

					Tamperer.storage.testLocationPercentages.push(i / arrayOfOutputLines.length);

				}
			}

			testNames = '<ul>' + testNames + '</ul>';
		}

			jQuery("#failing-tests").text(failingTests);
			jQuery("#failing-suite-names").html(testNames);


			jQuery("#total-test").text(failingTests);


			if(failingTests === 0 ){
				jQuery(".summary-heading #suggestion")[0].textContent = "Smells like bullshit... Rebuild";
			}

			else {
				jQuery(".summary-heading #suggestion")[0].textContent = "Looks like real failures, Jim... Investigate";
			}


};

