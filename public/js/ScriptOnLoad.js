//Fix incorrect URLs for search-requests:
if(window.location.href.indexOf('search') !== -1){			//if keyword "search" found in url
	var request = window.location.href.split('search');		//split url by word "search", into array
	request = request[request.length-1];					//and take last element, with search-request
	while(													//if this beginning from 
			request[0] === '/'								//	"/",
		||	request[0] === '='								//	"=", 
		||	request[0] === '?'								//	"?",
		||	request[0] === '&'								//	"&"
	){
		request = request.substring(1, request.length);		//remove first char at beginning
	}
	while(request.substring(0, 3) === '?q='){				//if this beginning from "?q="
		request = request.substring(3,request.length)			//remove "?q=" at baginning
	}
	if(window.location.origin+'/search/'+request !== window.location.href)
	{
		window.location.href = window.location.origin+'/search/'+request;	//	http://blahblah.com/?search/hash -> http://blahblah.com/search/hash
	}
}

//search on input, and submit-value
var form = document.getElementById('search');
	form.addEventListener(
		'submit',
		function (e) {
			e.preventDefault();
			var hash = document.getElementById('hash');
			hash.value && (window.location.href='/search/'+hash.value);
		}
	)
;
