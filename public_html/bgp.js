
var lastGameId = 0;
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
	  	var url = details.url;
		if(url.indexOf("preguntados.com") >= 0 && url.indexOf("games") >= 0){
			console.log("URL = "+url);
			
			if(lastGameId != getGameId(url)){
				if(url.indexOf("answers")>=0){
					url = url.slice(0,-7)
				}
				console.log("lastGameId " + lastGameId + "  getgameid" + getGameId(details.url) );
				lastGameId = getGameId(details.url);

				$.getJSON(details.url, function(data) {
  				console.log(data);
				var numb = findAnswerNumber(data);
				var text = findAnswer(data,numb);
				console.log((numb+1)+". şık");
				console.log(text);
				});
				
			}
		}

	},
        {urls: ["<all_urls>"]},
        ["blocking"]);

function getGameId(url){
	var urlArr = url.split("/");

	return urlArr[7];

}

function findAnswerNumber(json){
	return json.spins_data.spins[0].questions[0].question.correct_answer;
}

function findAnswer(json,number){
	return json.spins_data.spins[0].questions[0].question.answers[number];
}
