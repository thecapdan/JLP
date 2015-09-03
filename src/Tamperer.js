Tamperer = function(){
	this.logParser = new LogParser();
	this.logParser.hello();
};

Tamperer.prototype.injectHTML = function(){

	var newHTML         = document.createElement ('div');
	newHTML.innerHTML   = '             								\
	<div id="floatdiv" class="floating">  								\
		<div class="floating-title">Log Navigator</div>					\
		<button onclick="goToStashCommit()" class="floating-button">Go to stash commit</button>		\
	    <button onclick="previousFailingTest()" class="floating-button">previous failing test</button>	\
		<button onclick="nextFailingTest()" class="floating-button">next failing test</button>		\
		<button onclick="Tamperer.endOfLog()" class="floating-button">Go to end of log</button>		\
	</div>                           									\
	';

	document.body.appendChild (newHTML);

	// floatingMenu.add('floatdiv',  
	// {  
	//             // Represents distance from left or right browser window  
	//             // border depending upon property used. Only one should be  
	//             // specified.  
	//             // targetLeft: 0,  
	//             targetRight: 10,  
	  
	//             // Represents distance from top or bottom browser window  
	//             // border depending upon property used. Only one should be  
	//             // specified.  
	//             targetTop: 75,  
	//             // targetBottom: 0,  
	  
	//             // Uncomment one of those if you need centering on  
	//             // X- or Y- axis.  
	//             // centerX: true,  
	//             // centerY: true,  
	  
	//             // Remove this one if you don't want snap effect  
	//             snap: true  
	// });

};

Tamperer.endOfLog = function(){
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
};

