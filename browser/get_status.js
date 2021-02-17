var IsIndexPage = true;

function GetStatus(){
	//get status
	synchronousXmlHttpRequest(
			get_status
		,	'http://192.168.8.109:58081/json_rpc'
		,	'POST'
		,	function(response){show_status(response);}	//and show this
	);
}//else do not run.