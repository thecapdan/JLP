
LogParser = function() {
	this.failingTestsArray;
	window.lp = this;
};

LogParser.prototype.hello = function() {
	console.log("HELLOOOOOO bob");

};

LogParser.prototype.parse = function() {
	var consoleOutput = document.getElementsByClassName("console-output")[0];

	var arrayOfOutputLines = consoleOutput.innerText.split('\n');
	
	for(var i = 0; i < arrayOfOutputLines.length; i++)
	{
		var arr = [];
		if(arrayOfOutputLines[i].indexOf("Failed")) {

		}
	}

	//TODO if(jstests)
	this.failingTestsArray = $("span[title='Failed Tests']");


};

