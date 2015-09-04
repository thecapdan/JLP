Tamperer = function(){
	this.logParser = new LogParser();
};

Tamperer.storage = {};
Tamperer.currentTestIndex = -1;
Tamperer.currentCommitHash;
Tamperer.commitUrls = {
	CT: "https://stash.caplin.com/projects/CAPCT/repos/ct/commits/"
}

Tamperer.stats = {
	failingSuites : 1,
	failingTests : 1,
	failingTests : []
};

Tamperer.prototype.injectHTML = function(){

	var newHTML         = document.createElement ('div');
	newHTML.innerHTML   = '             								\
		<div id="floatdiv" class="floating">  \
			<div class="floating-title">Output Navigator</div>\
			<button onclick="Tamperer.goToSummary()" class="floating-button summary floating-button-large">Go to summary</button>\
		    <div class="navigating">	\
		        <button onclick="Tamperer.previousFailingTest()" class="floating-button previous-test">&lt;</button>	\
		        <span class="middle-text">Failure	\
		            <span class="test-counter">	\
		                <span id="current-test">0</span>	\
		                <span>/</span>	\
		                <span id="total-test">0</span>	\
		            </span>	\
		        </span>	\
		        <button onclick="Tamperer.nextFailingTest()" class="floating-button next-test">&gt;</button>	\
		    </div>	\
		    <button onclick="Tamperer.endOfLog()" class="floating-button end-log floating-button-large">Go to end of log</button>\
		    <div class="other-buttons">\
		    <button onclick="Tamperer.goToStashCommit()" class="floating-button floating-button-small">Stash</button>\
			<button onclick="Tamperer.rebuildJob()" class="floating-button floating-button-small">Rebuild</button>\
		    </div>\
		</div>\
	';






	document.body.appendChild (newHTML);

	var newHTML2         = document.createElement ('div');
	newHTML2.innerHTML   = '				\
	<div class="console-output summary">						\
		<div class="summary-title">Summary</div>	\
		<div class="summary-heading">Failing/Erroring test suites: <span id="failing-suites"></span></div>	\
		<div class="summary-heading">Number of failing tests:  <span id="failing-tests"></span> </div>	\
		<div class="summary-heading">Suite names:  <span id="failing-suite-names"></span> </div>	\
		<div class="summary-heading">Suggestion:  <span id="suggestion"></span> </div>	\
	</div>									\
	';

	var mainPanel = jQuery("#main-panel")[0];
	var consoleOutputElement = jQuery(".console-output")[0]
	mainPanel.insertBefore(newHTML2, consoleOutputElement);
};


Tamperer.goToSummary = function(){
	var heightOfSummary = jQuery(".summary-title")[0].offsetTop - 34; 
	scrollTo(0, heightOfSummary);
};

Tamperer.goToStashCommit = function(){
	var url = Tamperer.commitUrls["CT"]; //TODO -remove hardcoding
	url += Tamperer.currentCommitHash;
	window.open(url, "_blank");
};

Tamperer.previousFailingTest = function(){
	if(Tamperer.currentTestIndex > 0){
		Tamperer.currentTestIndex--;
	}

	var heightOfNextFailingTest = Tamperer.storage.failingTestsArray[Tamperer.currentTestIndex].offsetTop -200;
	scrollTo(0, heightOfNextFailingTest);

	jQuery("#current-test").text(Tamperer.currentTestIndex + 1);
};

Tamperer.nextFailingTest = function(){
	if(Tamperer.storage.failingTestsArray.length > Tamperer.currentTestIndex + 1){
		Tamperer.currentTestIndex++;
	}

	var heightOfNextFailingTest = Tamperer.storage.failingTestsArray[Tamperer.currentTestIndex].offsetTop -200;
	scrollTo(0, heightOfNextFailingTest);

	jQuery("#current-test").text(Tamperer.currentTestIndex + 1);
};

Tamperer.endOfLog = function(){
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
};

Tamperer.rebuildJob = function(){
	var url = Tamperer.rebuildLink;
	window.open(url, "_blank");
};



