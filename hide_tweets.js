var aList = null;
chrome.extension.sendMessage({text:"OnHider"},function(reponse){
	initHider(reponse);
});
chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
	if( message.text == "InitHider" ){
		initHider(message);
	}
});

function CheckAndHideItems(){
	if( aList != null ){
		$('.stream-item:not(.blacktweet_checked)', $('.stream-items')).each(function(){
			$(this).addClass('blacktweet_checked');
			var text = $(this).find('.tweet-text').text().toLowerCase();
			for( key in aList ){
				if( text.indexOf(aList[key].toLowerCase())  != -1){
					$(this).hide().addClass('blacktweet_hidden');
				}
			}
		});
	}
}

function ShowItems(){
	$('.stream-item.blacktweet_checked.blacktweet_hidden', $('.stream-items')).removeClass('blacktweet_checked blacktweet_hidden').show();
}

function initHider(response){
	if( response.blacklist ){
		PrepareList(response.blacklist)
		$(window).scroll(function(){
			CheckAndHideItems();
		});
		CheckAndHideItems();
	}
	else {
		ShowItems();
	}
}
function PrepareList(list){
	aList = list.split(",");
	for(k in aList){
		aList[k] = $.trim(aList[k]);
		if( aList[k].length < 3 ){
			delete aList[k];
		}
	}
}