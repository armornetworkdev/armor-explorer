//config:
var CoinTicker			= 'AMX';
var PublicArmordRPC		= '127.0.0.1:58081';	//./armord --bytecoind-bind-address=0.0.0.0:58081 --p2p-bind-address=0.0.0.0:58080 --data-folder="folderPath" --CORS
//var HTTPCridentials		= 'usr:pass';			//when --CORS, then header CORS «Access-Control-Allow-Origin="*"», and basic authorization not working, in this case.
//This arguments, not working: https://github.com/armornetworkdev/armor/blob/24872f0652e195f0c73dfc1754735afb0ea45d83/src/main_bytecoind.cpp#L36-L37 
//Because of this, need to make something like --CORS=armorRPCExernalIP, here: https://github.com/armornetworkdev/armor/blob/24872f0652e195f0c73dfc1754735afb0ea45d83/src/Core/Config.cpp#L65

//	By default, armord RPC working over HTTP.
var ArmordRPCProtocol			= 'http://';

//	HTTTS-proxy (for example 'node-http-proxy'), can be used to host Armord RPC over HTTPS.
//	This need to send XMLHttpRequests over HTTPS, when browser-version is available over HTTPS too, else XHR will be blocked by browser.
//var ArmordRPCProtocol			= 'https://';	//uncomment this line, and comment previous, to use HTTPS protocol, for XHR.

var PublicArmordRPCurl	= 	ArmordRPCProtocol	+(
											(typeof HTTPCridentials !== 'undefined')	//if HTTPCridentials was defined
												? HTTPCridentials + '@'		//use this in URL
												: ''						//else skip
										)
										+PublicArmordRPC					//add IP:PORT
										+'/json_rpc'						//and add his, to url
;	//http://usr:pass@IP:PORT/json_rpc

var GETorPOST			= 'POST';
//end config



function synchronousXmlHttpRequest(JSONRequest, URL, GETorPOST, callback, user, password){
	console.log('run');
	GETorPOST = GETorPOST || 'POST';
	var xhr = new XMLHttpRequest();
//	xhr.withCredentials = (typeof HTTPCridentials !== 'undefined') ? true : false;	//use HTTPCridentials in URL or not?
	xhr.open(GETorPOST, URL);
	xhr.setRequestHeader("Content-type", "application/json");
//	xhr.setRequestHeader("Authorization", "Basic " + btoa(HTTPCridentials));		//another way, by adding header. But when --CORS, and when «Access-Control-Allow-Origin="*"», this not working too.
	xhr.onreadystatechange = function() {
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			console.log('xhr.response', xhr.response);
			console.log('JSON.parse(xhr.response)', JSON.parse(xhr.response));
			callback(xhr.response);
		}
	}
	xhr.send(JSONRequest);
}

/*
synchronousXmlHttpRequest(
	'{"jsonrpc": "2.0", "id": "0","method": "get_status"}',
	PublicArmordRPCurl,
	'POST',
	function(x){console.log(x);}	//callback function for response.
);
*/


function asynchronousXmlHttpRequest(JSONRequest, URL, GETorPOST) {
  GETorPOST = GETorPOST || 'POST';
  var xhr = new XMLHttpRequest();
  return new Promise(function(resolve, reject){
    xhr.onreadystatechange = function(e){
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        console.warn('request_error');
      }
    };
    xhr.open(GETorPOST, URL, true);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSONRequest);
  });
}

/*
asynchronousXmlHttpRequest(
	'{"jsonrpc": "2.0", "id": "0","method": "get_status"}',
	PublicArmordRPCurl,
	'POST'
).then(
	function(res){
		console.log("The result is", res);	//function for respunce, after resolve promise.
	}
);
*/


//inpt of RPC calls
var get_status = '{"jsonrpc": "2.0", "id": "0","method": "get_status"}';	//output: {"id":"0","jsonrpc":"2.0","result":{"top_block_hash":"5310d148dceefc0865fbed843b392c633745341bc252bdfd8e58feca7c66358d","transaction_pool_version":3019,"outgoing_peer_count":4,"incoming_peer_count":0,"lower_level_error":"","top_block_height":19058,"top_block_difficulty":4583633,"top_block_cumulative_difficulty":192516199414,"top_block_timestamp":1613532547,"top_block_timestamp_median":1613529213,"recommended_fee_per_byte":100,"next_block_effective_median_size":98872,"recommended_max_transaction_size":98872,"top_known_block_height":19058,"already_generated_coins":18093740254869}}

var get_raw_block = function(HashOrHeight_or_depth){
	return '{"jsonrpc": "2.0", "id": "0","method": "get_raw_block", "params": {'+
					(
						(HashOrHeight_or_depth.length === 64)            //if hash
							? '"hash":'	                //get_raw_block by "block_hash" in first parameter. 
							: '"height_or_depth":'		//or get_raw_block by height_or_depth (positive "block_number" or negative "depth")+'}}'
					)+'"'+HashOrHeight_or_depth+'"}}'
	;
}
//response: {"id":"0","jsonrpc":"2.0","result":{"block":{"header":{"major_version":4,"minor_version":9,"timestamp":1613537912,"previous_block_hash":"294ec99d7dfbff0ee00ed8898fe024ffaced9897f80b8b02622ecedaff3bd960","binary_nonce":"9d230100","nonce":74653,"height":19097,"hash":"0451a4b5aea1e623fdf44064da0489b8679e93078efa39030045d9e4988f1b16","reward":945029424,"cumulative_difficulty":192694748345,"difficulty":4099920,"base_reward":945029424,"block_size":368,"transactions_size":249,"already_generated_coins":18130596736332,"already_generated_transactions":72996,"already_generated_key_outputs":465982,"block_capacity_vote":100000,"block_capacity_vote_median":100000,"size_median":0,"effective_size_median":0,"timestamp_median":1613533650,"transactions_fee":0},"raw_header":{"major_version":4,"minor_version":9,"previous_block_hash":"294ec99d7dfbff0ee00ed8898fe024ffaced9897f80b8b02622ecedaff3bd960","root_block":{"major_version":1,"minor_version":0,"timestamp":1613537912,"previous_block_hash":"294ec99d7dfbff0ee00ed8898fe024ffaced9897f80b8b02622ecedaff3bd960","nonce":"9d230100","transaction_count":1,"coinbase_transaction_branch":[],"coinbase_transaction":{"version":1,"unlock_block_or_timestamp":0,"inputs":[],"outputs":[],"extra":"032100ae1ab96067cb7ed32e590bf71de82035456a69fb198be147cf63a591d108f9df"},"blockchain_branch":[]},"coinbase_transaction":{"version":1,"unlock_block_or_timestamp":0,"inputs":[{"type":"coinbase","height":19097}],"outputs":[{"amount":29000,"type":"key","public_key":"7072171a206bf09b0e9cf3fff93595779f75dad1294cbaece2804947c8726c50"},{"amount":424,"type":"key","public_key":"4a9248fb864ffeda5e3d57db14d6790c3bfc1a9f36e2a430b549ed4e50b6b16d"},{"amount":5000000,"type":"key","public_key":"2df88ab8fb4a768874249496dc09167f116d1caf1b442f1af1c7b5ae2f7f30e1"},{"amount":40000000,"type":"key","public_key":"33597dcecba7b44345c1074b79505efa406c464c6c72627c76672c78c4f8780f"},{"amount":900000000,"type":"key","public_key":"f6d359ead456ee1b4e194fee4eb64ef8d197be42fa80a598693fafb11b7d058b"}],"extra":"01d307638f7e85aead322f4fa780b4083cb1bcda31e692ef0bd568f9e528e77d4d0403a08d060211000000079e9b5db7000000000000000000"},"transaction_hashes":[]},"raw_transactions":[],"transactions":[{"unlock_block_or_timestamp":0,"unlock_time":0,"amount":945029424,"fee":0,"public_key":"d307638f7e85aead322f4fa780b4083cb1bcda31e692ef0bd568f9e528e77d4d","anonymity":0,"extra":"01d307638f7e85aead322f4fa780b4083cb1bcda31e692ef0bd568f9e528e77d4d0403a08d060211000000079e9b5db7000000000000000000","hash":"5fe73019a27dfbaf634d83db493c609e2922164a06b29a9c4a6346c6bfdd4305","prefix_hash":"5fe73019a27dfbaf634d83db493c609e2922164a06b29a9c4a6346c6bfdd4305","inputs_hash":"8f1c1db8c4405174c3a5f8b0354dacf2dd8589d5a4d9f9e2012c56ef2115bba1","coinbase":true,"block_height":19097,"block_hash":"0451a4b5aea1e623fdf44064da0489b8679e93078efa39030045d9e4988f1b16","timestamp":1613537912,"size":249,"binary_size":249}],"output_stack_indexes":[[34,18,5114,8723,19899]]},"orphan_status":false,"depth":-1}}

var get_raw_transaction = function(TxHashToSearch){
	return '{"jsonrpc": "2.0", "id": "0","method": "get_raw_transaction", "params": {"hash":"'+TxHashToSearch+'"} }';
}
//response: {"id":"0","jsonrpc":"2.0","result":{"transaction":{"unlock_block_or_timestamp":0,"unlock_time":0,"amount":301756900,"fee":243100,"anonymity":6,"hash":"a10c89ea0b4b2ddb122bcf7bdb19643494defb7bc6c5ce9f02fe4b68cfa55f6f","prefix_hash":"5e6f52dfcb95b33a73fbbd4d385afa79bc64c1cf808dd4ca8b5fa1251fdc33f3","inputs_hash":"d1a23e02faf9eadc352402b8e16661114d17672596e293fc62950703cd4b4d25","coinbase":false,"block_height":19096,"block_hash":"294ec99d7dfbff0ee00ed8898fe024ffaced9897f80b8b02622ecedaff3bd960","timestamp":1613537858,"size":1264,"binary_size":1264},"raw_transaction":{"version":4,"unlock_block_or_timestamp":0,"inputs":[{"type":"key","amount":2000000,"output_indexes":[4120,652,497,1384,1164,130,51],"key_image":"2b785415b4936a21a8b31e173eeb9eb1249e21f972b546b02d25cbb14c441cb9"},{"type":"key","amount":300000000,"output_indexes":[335,1513,450,381,74,630,131],"key_image":"e30e4121da5710c51e7cd103cc457cc2c7f32bb699f366c259b18ebae6063ee3"}],"outputs":[{"type":"key","amount":900,"public_key":"ebb1289e855f96526a91d6bdb6c3b8f85475e328ac94e9c23aaf78e18cd9b2a9","encrypted_secret":"782a6d90d8db27c40b458233cde8fdc5d6b09e9b742c866d6f85ea777343724b","encrypted_address_type":"b8"},{"type":"key","amount":757000,"public_key":"6410cbeb2903b355451f1e83caa39a24bb90d6bb5bbed30edc3cfd954023387e","encrypted_secret":"882241dd26fcbaf098afbad7e64c6cc33c7534767ff45705195ef7058ca9d792","encrypted_address_type":"3a"},{"type":"key","amount":999000,"public_key":"8a2c5796d3e1bd23fc998c3da0a0573cbaad89857ca0d2e1093596f258242440","encrypted_secret":"b82f0b4240ab4a92be4325fd2f7cde1e4f6f492fe861846b68b0d20b0bc03395","encrypted_address_type":"ad"},{"type":"key","amount":1000000,"public_key":"c13df8248984cb2d5ea443250e60f0fb4f02e2c5a1a034663b5f045184df682f","encrypted_secret":"0c5c15f95ffef843e4b2eee3471b7427039c4467b1562cc71f13d3e5750a04c1","encrypted_address_type":"6b"},{"type":"key","amount":9000000,"public_key":"06fd09a35292f745e7345e3df61dc3d0985faf5f2c0e318323e2137c64026910","encrypted_secret":"72c65a6758ad7818c44ddd74fe527038ed42ae250b8e58dea9da9a0a97c4d43b","encrypted_address_type":"4e"},{"type":"key","amount":90000000,"public_key":"fdffa98a5ca1e81c546f5c0d1eb665baeab30b908c7910db72435bb8a1f40abf","encrypted_secret":"660b60c865053b622851a8308896fec6f4dee76c4944660703b68f769c36384e","encrypted_address_type":"06"},{"type":"key","amount":200000000,"public_key":"889c2a3d720b9a529f3da9c19b6a9b09e9603f75f6e652c17cf2922dfcd749ec","encrypted_secret":"a596f303c00128ddbdd08f00c48f257fc97031593cc11dc8ea60debb3236a0d3","encrypted_address_type":"9a"}],"extra":""},"mixed_public_keys":[["f8e00ac81ec7b52a026d89121b3dc5e2ab17697398e4e0a22f3b4594c1ff265d","5c36690d75c58997ca9b08c573b3c322fc22f0b2ae9035162d6c81d439d2eb45","0cbd8e9659096b70ea2383e8b034134c12d3ef45e0f3b376b5abd1ac20ba6722","6cd7e08ad5c195474f7588f83b31f486abf3d266ec5eaa065b34876fce2319c8","c4ee3cf73a32be8cfe3e7f44ec11f78854338991a52ea2b192d1d68883664473","31f218b849638390052fbba1fbe0aa11c9be534648cbd1aced176311d2bd9820","1c7b25be1b70cd7eb5088280cee6b072cc166132d86b3e1ee5f6f094a1539fc9"],["ccc1a16f6b7994439ca2b2d14a53b5584b9a5eba5fa9a636f4bd53e2304712f9","bf3b0921caee0aea7a6f761a35d79f6e0227e0c52930c525a7363af493c5c8bf","1a922c182b4f4b6af1a00a200ef09b321f0fc003dcc9b9a9e9779f5c3df4e5df","046d7b1dae36ba92e6768b16610d59e8c3c9ac3a8cf1bcd6ede0f34a5893a224","d598382dfd84923fad7b9d8d541a68f4e9695327ca819f6acdfb8f8d8937caa9","0e7a32c184a6cdecdc653c252634fb0648bd6697d5cc3af64ff2435d28e2133b","c1d80da7d0229a06a1285b412231d884a045a2a95c35274ab948122709f248e7"]],"mixed_outputs":[[{"amount":2000000,"public_key":"f8e00ac81ec7b52a026d89121b3dc5e2ab17697398e4e0a22f3b4594c1ff265d","stack_index":0,"global_index":0,"height":6662,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"5c36690d75c58997ca9b08c573b3c322fc22f0b2ae9035162d6c81d439d2eb45","stack_index":0,"global_index":0,"height":8061,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"0cbd8e9659096b70ea2383e8b034134c12d3ef45e0f3b376b5abd1ac20ba6722","stack_index":0,"global_index":0,"height":9419,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"6cd7e08ad5c195474f7588f83b31f486abf3d266ec5eaa065b34876fce2319c8","stack_index":0,"global_index":0,"height":14063,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"c4ee3cf73a32be8cfe3e7f44ec11f78854338991a52ea2b192d1d68883664473","stack_index":0,"global_index":0,"height":18586,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"31f218b849638390052fbba1fbe0aa11c9be534648cbd1aced176311d2bd9820","stack_index":0,"global_index":0,"height":18981,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":2000000,"public_key":"1c7b25be1b70cd7eb5088280cee6b072cc166132d86b3e1ee5f6f094a1539fc9","stack_index":0,"global_index":0,"height":19080,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false}],[{"amount":300000000,"public_key":"ccc1a16f6b7994439ca2b2d14a53b5584b9a5eba5fa9a636f4bd53e2304712f9","stack_index":0,"global_index":0,"height":5615,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"bf3b0921caee0aea7a6f761a35d79f6e0227e0c52930c525a7363af493c5c8bf","stack_index":0,"global_index":0,"height":11872,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"1a922c182b4f4b6af1a00a200ef09b321f0fc003dcc9b9a9e9779f5c3df4e5df","stack_index":0,"global_index":0,"height":13196,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"046d7b1dae36ba92e6768b16610d59e8c3c9ac3a8cf1bcd6ede0f34a5893a224","stack_index":0,"global_index":0,"height":15377,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"d598382dfd84923fad7b9d8d541a68f4e9695327ca819f6acdfb8f8d8937caa9","stack_index":0,"global_index":0,"height":15782,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"0e7a32c184a6cdecdc653c252634fb0648bd6697d5cc3af64ff2435d28e2133b","stack_index":0,"global_index":0,"height":18506,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false},{"amount":300000000,"public_key":"c1d80da7d0229a06a1285b412231d884a045a2a95c35274ab948122709f248e7","stack_index":0,"global_index":0,"height":19081,"unlock_block_or_timestamp":0,"unlock_time":0,"index_in_transaction":0,"transaction_hash":"","key_image":"","address":"","dust":false}]]}}



