function Search(){
	var WhatToSearch = window.location.hash.split("search?q=")[1];
	//Try to search block
	synchronousXmlHttpRequest(
			get_raw_block(WhatToSearch)
		,	'http://192.168.8.109:58081/json_rpc'
		,	'POST'
		,	function(blockresponse){
				obj = JSON.parse(blockresponse);
				if(obj.hasOwnProperty("result")){
					ShowBlock(blockresponse);				//then show this block
				}else if(
						!obj.hasOwnProperty("result")		//or
					&&	obj.hasOwnProperty("error")			//on error
				){
					if(
							(obj.error).hasOwnProperty("code")	//if block not found
						&&	obj.error.code === -5
						&&	obj.error.message === "Block not found in either main or side chains request_hash="+WhatToSearch
					){
						if(WhatToSearch.length === 64){			//and if hash
							SearchTransaction(WhatToSearch);		//try to search transaction.
						}
					}
				}
				else{
					console.log('something else');
				}
			}
	);
}//else do not run.

function SearchTransaction(TxHashToSearch){
	synchronousXmlHttpRequest(
			get_raw_transaction(TxHashToSearch)
		,	'http://192.168.8.109:58081/json_rpc'
		,	'POST'
		,	function(txresponse){
				ShowTransaction(txresponse);	//then show this block
			}
	);
}