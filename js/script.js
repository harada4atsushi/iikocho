// DEMO
localStorage[201401] = true;
localStorage[201402] = true;
  
$(function(){

	var date  = new Date();
	var year  = date.getFullYear() ;
	var month = ('0'+(date.getMonth()+1)).slice(-2);

	var img = '<img src="./img/santa.png" />';

	var stamp_load = function(){
		if(! localStorage) return;
		var count = 0;
		for(var i = 1; i <= 12; i++) {
			var m = ('0'+i).slice(-2);
			if(localStorage[year+m]){
				$('#stamp_list #month_'+m).append(img);
				count++;
			}
		}
		if(count == 12){
			$('#congratulation').show();
			(new Audio('./sound/congratulation.mp3')).play();
		}
	}

	stamp_load();

	$('#stamp_list li').on('click', function(){
		var month = $(this).attr('id').replace('month_', '');
		localStorage[year+month] = true;
		window.location = 'message.html?ym='+year+month;
	});
});
