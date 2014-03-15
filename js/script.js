// DEMO
/*
localStorage[201401] = true;
localStorage[201402] = true;
localStorage[201403] = true;
localStorage[201404] = true;
localStorage[201405] = true;
localStorage[201406] = true;
localStorage[201407] = true;
localStorage[201408] = true;
localStorage[201409] = true;
localStorage[201410] = true;
 */
 
$(function(){

	var date  = new Date();
	var year  = date.getFullYear() ;
	var month = ('0'+(date.getMonth()+1)).slice(-2);

	var stamp_load = function(){
		if(! localStorage) return;
		var count = 0;
		for(var i = 1; i <= 12; i++) {
			var m = ('0'+i).slice(-2);
			if(localStorage[year+m]){
				$('#stamp_list #month_'+m).find('img').attr('src', './img/hatClear.png');
				count++;
			}
		}
		if(count == 12){
			$('#congratulation').show();
			(new Audio('./sound/congratulation.mp3')).play();
			localStorage.clear();
		}
	}

	stamp_load();

	$('#stamp_list td').on('click', function(){
		var month = $(this).attr('id').replace('month_', '');
		//localStorage[year+month] = true;
		window.location = 'index.html?ym='+year+month;
	});
});
