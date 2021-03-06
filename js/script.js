// DEMO DATA
localStorage['201401'] = JSON.stringify([
    {'message': 'ねぇ、サンタさん。きょうおかし買って欲しかったのがまんしたんだよ', 'direction': 'left'},
    {'message': 'やぁ、教えてくれてありがとう。お母さん大喜びだね！プレゼントまであと11スタンプだ！', 'direction': 'right'},
    {'message': 'ありがと。がんばるよ、ぼく', 'direction': 'left'}
]);
 localStorage['201402'] = JSON.stringify([
    {'message': '元気にしてるかい？今月のいいこと、教えて欲しいな。', 'direction': 'right'},
    {'message': '忘れてたのごめんね。ままのせんたくたたみしたよ', 'direction': 'left'},
    {'message': '教えてくれてありがとう。プレゼントまであと10スタンプだね！この調子この調子！', 'direction': 'right'}
]);

 window.addEventListener("load", function() {
    setTimeout(function() {
        scrollBy(0, 1);
    }, 100);
}, false);


$(function(){

	var date  = new Date();
	var year  = date.getFullYear() ;
	var month = ('0'+(date.getMonth()+1)).slice(-2);

	var stamp_load = function(){
		if(! localStorage) return;
		var count = 0;
		for(var i = 1; i <= 12; i++) {
			var m = ('0'+i).slice(-2);
			if(localStorage[year+m] && JSON.parse(localStorage[year+m]).length){
				$('#stamp_list #month_'+m).find('img').attr('src', './img/hatClear.png');
				count++;
			}
		}
		localStorage.count = count;
		if(count == 12){
			$('#congratulation').show();
			(new Audio('./sound/congratulation.mp3')).play();
			localStorage.clear();
		}
	}

	stamp_load();

	$('#stamp_list td').on('click', function(){
		var month = $(this).attr('id').replace('month_', '');
		window.location = 'index.html?ym='+year+month;
	});

	$('#clear').on('click', function(){
		localStorage.clear();
		location.reload();
	});
});
