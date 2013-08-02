chrome.browserAction.onClicked.addListener(function(tab) {
	if ( localStorage["active"] == 1 ){
		localStorage["active"] = 0;
	}
	else {
		localStorage["active"] = 1;	
	}

	chrome.tabs.query({'active': true,'currentWindow':true}, function(tab){
		var response = getResponseData();
	  	chrome.tabs.sendMessage(tab[0].id, {text:"InitHider", blacklist: response.blacklist }, null);

	});

	setIcon();

});

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
	if( message.text == "OnHider" ){
		sendResponse(getResponseData());
	}
});

function getResponseData(){
	localStorage["active"] = localStorage["active"] === undefined ? 0 : localStorage["active"];
	return localStorage["active"] == 1 ? {blacklist: localStorage["black_words"]} : {blacklist: null};
}

function setIcon(){
	var text = localStorage["active"] == 1 ? 'on' : 'off';
	chrome.browserAction.setBadgeText ( { text: text } );
}
setIcon();