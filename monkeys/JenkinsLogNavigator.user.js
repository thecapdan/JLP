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
// @require http://danielo-t440.caplin.com:8000/code/JLP/src/Tamperer.js
// @require http://danielo-t440.caplin.com:8000/code/JLP/src/LogParser.js

// @resource floatingCSS http://danielo-t440.caplin.com:8000/code/JLP/style/floating-style.css
// @run-at document-end
// ==/UserScript==

var myCss = GM_getResourceText("floatingCSS");
GM_addStyle(myCss);

tamperer = new Tamperer();
tamperer.injectHTML();

tamperer.logParser.parse();