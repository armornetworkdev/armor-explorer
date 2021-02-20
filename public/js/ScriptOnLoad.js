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
