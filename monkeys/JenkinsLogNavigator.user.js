// ==UserScript==
// @name         JenkinsLogNavigator
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://jenkins.caplin.com/view/*/console
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// @require http://danielo-t440.caplin.com:8000/code/JLP/src/LogParser.js
// @run-at document-body
// ==/UserScript==

var LP = new LogParser();
LP.hello();