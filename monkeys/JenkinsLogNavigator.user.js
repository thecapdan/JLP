// ==UserScript==
// @name         JenkinsLogNavigator
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://jenkins.caplin.com/view/*/console
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require http://code.jquery.com/jquery-latest.js
// @require http://localhost:8000/src/Tamperer.js
// @require http://localhost:8000/src/LogParser.js

// @resource floatingCSS http://localhost:8000/style/floating-style.css
// @run-at document-end
// ==/UserScript==

var myCss = GM_getResourceText("floatingCSS");
GM_addStyle(myCss);

var testLogConfig = {
	"JS" : { 
		"logIdentifier": "Runner Report",
		"testIdentifier": "Testing ",
		"failureIdentifier": "Tests Failed.",
		"bullshitIdentifier": ""
	},
	"THUC" : {
		"logIdentifier" : "INFO net.thucydides.core.Thucydides",
		"testIdentifier" : "TEST FAILED:",
		"failureIdentifier" : "TEST FAILED:",
		"bullshitIdentifier" : ""
	}
}
tamperer = new Tamperer(testLogConfig);
tamperer.injectHTML();

tamperer.logParser.parse();