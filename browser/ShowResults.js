function InsertDataInColumn(
	Title			//title string
,	DataArray		//array with strings
,	Search			//true, when search, switch classed "col" (index) and "col-6" (search) for "divs"
){
	var Rows			= document.getElementsByClassName('row');
	var NumberOfRows	= Rows.length;
	var LastRow			= Rows[NumberOfRows-1];

	var element = document.createElement('div');
	var divClass = ( (Search) ? 'col-6' : 'col' ) ;
	element.classList.add( divClass );
	
	var h3 = document.createElement('h3');
	h3.innerText = Title;
	element.appendChild(h3)
	
	for(var i = 0; i<DataArray.length; i++){
		var record = document.createElement('div');
		record.classList.add('card');
		record.classList.add('p-3');
		record.classList.add('bg-light');
		record.classList.add('mb-2');
	
		var content = document.createElement('div');
		content.innerHTML = DataArray[i];
		record.appendChild(content);

		element.appendChild(record);
	}

	LastRow.appendChild(element);
}

//show status, using function in "show_result.js"
function show_status(JSONStatus){

	document.getElementsByClassName('row')[document.getElementsByClassName('row').length-1].innerHTML = '';

	console.log(JSONStatus);
	var response = JSON.parse(JSONStatus);
	InsertDataInColumn(
		'Network status'
	,	[
				(
					'Top block height: '+	response.result.top_block_height+
					' (known: '+			response.result.top_known_block_height		+')'
				)
			,	('Top block hash: <a href="'+(window.location.pathname)+'#search?q='+response.result.top_block_hash	+'">'+	response.result.top_block_hash	+'</a>'		)
			,	('Top block difficulty: '				+		response.result.top_block_difficulty												)
			,	('Total amount of coins: '				+		(response.result.already_generated_coins / 100000000).toFixed(8)		+' '+CoinTicker			)
			,	(
					'Top block timestamp: '				+		response.result.top_block_timestamp							+
					' - '								+		timeDifference(response.result.top_block_timestamp)			+
					' (median: '						+		response.result.top_block_timestamp_median					+
					' - '								+		timeDifference(response.result.top_block_timestamp_median)	+')'
				)
		]
	);
}

function ShowBlock(JSONBlock){


	var response = JSON.parse(JSONBlock);
	console.log('response', response);

	document.getElementsByClassName('row')[document.getElementsByClassName('row').length-1].innerHTML = '';
	
	InsertDataInColumn(
		'Found block:'
	,	[
				(
					'Block number: '						+	
					'<a href="'+(window.location.pathname)+'#search?q='+response.result.block.header.height+'">'+response.result.block.header.height+'</a>'
				)
			,	('Hash: '								+
					'<a href="'+(window.location.pathname)+'#search?q='+response.result.block.header.hash+'">'+response.result.block.header.hash+'</a>'
				)
			,	(
					'<div>Status:&nbsp;'+
						(
							(response.result.orphan_status)
								?	'<span class="badge bg-danger">Orphan</span>'
								:	(response.result.orphan_status === false && response.result.depth > -10)
									?	'<span class="badge bg-warning text-dark">Pending</span>'
									:	'<span class="badge bg-success">Valid</span>'
						)
					+'</div>'
				)
			,	(
					'Previous block hash: '+'<a href="'+(window.location.pathname)+'#search?q='+response.result.block.header.previous_block_hash+'">'+response.result.block.header.previous_block_hash+'</a>'
				)
			,	(	'Reward: '+( response.result.block.header.base_reward / 100000000 ).toFixed(8)+' '+CoinTicker )
			,	(	'Block size: '+response.result.block.header.block_size )
			,	(	'Transactions size: '+response.result.block.header.transactions_size )
			,	(	'Transactions fee: '+(response.result.block.header.transactions_size / 100000000).toFixed(8) +' '+CoinTicker)
			
			,	(
					'Timestamp: '						+		response.result.block.header.timestamp						+
					' - '								+		timeDifference(response.result.block.header.timestamp)
				)
		]
		,	'col-6'
	);
	
	
	//show transactions.
	var transactionsInBlock = response.result.block.raw_header.transaction_hashes;
	var transactons = [];	//generate strings, to insert in column
	for(var i = 0; i<transactionsInBlock.length; i++){
		transactons.push('<a href="'+(window.location.pathname)+'#search?q='+transactionsInBlock[i]+'">'+transactionsInBlock[i]+'</a>');
	}
	
	InsertDataInColumn(
			'Transactions in block:'
		,	transactons	//array
		,	'col-6'
		,	false
	);
}


function ShowTransaction(JSONTransaction){

	document.getElementsByClassName('row')[document.getElementsByClassName('row').length-1].innerHTML = '';

	var response = JSON.parse(JSONTransaction);
	console.log('response', response);
	
	InsertDataInColumn(
		'Found transaction:'
	,	[
				('Hash: '								+		response.result.transaction.hash													)
			,	(
					'Block: '							+
					'<a href="'+(window.location.pathname)+'#search?q='+response.result.transaction.block_height+'">'+response.result.transaction.block_height+'</a>'
				)
			,	(
					'Block hash: '						+
					'<a href="'+(window.location.pathname)+'#search?q='+response.result.transaction.block_hash+'">'+response.result.transaction.block_hash+'</a>'
				)
			,	(
						'Amount: '
					+	'<span '
//warning in title tooltip, on hover:
					+		'class="tooltip2"'
					+	'>'
					+		(response.result.transaction.amount / 100000000 ).toFixed(8)			+		' '+ CoinTicker	//value, inside span
//warning in title tooltip, on hover:
					+		'<font class="tooltiptext2">It does not mean that this is the amount that is actually transferred, it\'s sum of outputs for this tx.</font>'

//warning with text:
//					+		' <font class="badge bg-warning text-dark">It does not mean that this is the amount that is actually transferred, it\'s sum of outputs for this tx.</font>'
					+	'</span>'
				)
			,	('Fee: '								+		(response.result.transaction.fee  / 100000000 ).toFixed(8)				+		' '+ CoinTicker					)
			,	('Anonymity: '							+		response.result.transaction.anonymity												)
			,	('Coinbase: '							+		response.result.transaction.coinbase												)
			,	(
					'Timestamp: '						+		response.result.transaction.timestamp		+
					' - '								+		timeDifference(response.result.transaction.timestamp)
				)
			,	(
					'Size: '							+		response.result.transaction.size			+
					' (binary size: '					+		response.result.transaction.binary_size		+ ')'
				)
		]
	);
}