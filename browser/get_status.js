var IsIndexPage = true;

function GetStatus(){
	//get status
	synchronousXmlHttpRequest(
			get_status
		,	PublicArmordRPC
		,	'POST'
		,	function(response){show_status(response);}	//and show this
	);
}//else do not run.
