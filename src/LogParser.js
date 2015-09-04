
LogParser = function() {
	this.failingTestsArray;
	window.lp = this;
};

LogParser.prototype.hello = function() {
	console.log("HELLOOOOOO bob");

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


	var testType = "JS";
	/*
	what kind of tests am i running
	 */
	for(var i = 0; i < arrayOfOutputLines.length; i++)
	{
		if(arrayOfOutputLines[i].indexOf("git checkout -f") > -1) {
			Tamperer.currentCommitHash = arrayOfOutputLines[i].split(" ")[5];
		}

		if(arrayOfOutputLines[i].indexOf("Runner Report") > -1) 
		{
			testType = "JS";
			Tamperer.storage.testType = "JS";
			continue;
		}

		//INFO net.thucydides.core.Thucydides
		//
		if(arrayOfOutputLines[i].indexOf("INFO net.thucydides.core.Thucydides") > -1) 
		{
			testType = "THUC";
			Tamperer.storage.testType = "THUC";
			continue;
		}
	}






	// JS TESTS
	// 
			var failingTestSuites = 0;
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
					failingTestSuites++;
					testNames += '<li>' + currentTests + '</li>';
				}

				//
				if(arrayOfOutputLines[i].indexOf("; Fails:") > -1 && arrayOfOutputLines[i].indexOf("Windows: Run") == -1) {
					var fails = parseInt(arrayOfOutputLines[i].split(" ")[6]);
					failingTests+= fails;
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
				if(arrayOfOutputLines[i].indexOf("TEST FAILED:") > -1) {
					failingTestSuites++;
					failingTests++;
					testNames += '<li>' + arrayOfOutputLines[i].substr(13) + '</li>';
					console.log("failure line: " + i);
					console.log("output length: " + arrayOfOutputLines.length);
					Tamperer.storage.failingTestsArray.push("a failing test");

					Tamperer.storage.testLocationPercentages.push(i / arrayOfOutputLines.length);

				}
			}

			testNames = '<ul>' + testNames + '</ul>';
		}

			jQuery("#failing-suites").text(failingTestSuites);
			jQuery("#failing-tests").text(failingTests);
			jQuery("#failing-suite-names").html(testNames);


			jQuery("#total-test").text(failingTestSuites);


			if(failingTests === 0 && failingTestSuites > 0){
				jQuery(".summary-heading #suggestion")[0].textContent = "Smells like bullshit... Rebuild";
			}

			else {
				jQuery(".summary-heading #suggestion")[0].textContent = "Looks like real failures, Jim... Investigate";
			}


};

