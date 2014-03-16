//localStorage.clear();
var default_mes = {
  '201401': [
    {'message': 'ねぇ、サンタさん。きょうおかし買って欲しかったのがまんしたんだよ', 'direction': 'left'},
    {'message': 'やぁ、ぴーやくん、教えてくれてありがとう。お母さん大喜びだね！プレゼントまであと7スタンプだね！この調子この調子！', 'direction': 'right'},
    {'message': 'ありがと。がんばるよ、ぼく', 'direction': 'left'},
  ],
  '201402': [
    {'message': 'やぁ、ぴーやくん。今月のいいこと、教えて欲しいな。', 'direction': 'right'},
    {'message': '忘れてたのごめんね。ままのせんたくたたみしたよ', 'direction': 'left'},
    {'message': 'ぴーやくん、教えてくれてありがとう。プレゼントまであと1スタンプだね！ラストスパートだ！', 'direction': 'right'},
  ],
  '201403': [],
  '201404': [],
  '201405': [],
  '201406': [],
  '201407': [],
  '201408': [],
  '201409': [],
  '201410': [],
  '201411': [],
  '201412': [],
};

// getパラメータを取得
function getQueryString() {
  var result = {};
  if( 1 < window.location.search.length ) {
    var query = window.location.search.substring( 1 );
    var parameters = query.split( '&' );
    for( var i = 0; i < parameters.length; i++ ) {
      var element = parameters[ i ].split( '=' );
      var paramName = decodeURIComponent( element[ 0 ] );
      var paramValue = decodeURIComponent( element[ 1 ] );
      result[ paramName ] = paramValue;
    }
  }
  return result;
}

function santaSay(arr, ym) {
  var message = 'サンタだよ！';
  var mes = $$('<li class="right"></li>').html(message); 
  $$("#mes_region").append(mes);
  arr.push({'message': message, 'direction': 'right'});
  localStorage[ym] = JSON.stringify(arr);
}

// ready時の処理
$$(document).ready(function(){
  var ym = getQueryString()['ym'];
  // localStorageを初期化
  if (!localStorage[ym]) localStorage[ym] = JSON.stringify(default_mes[ym]);

  var arr = JSON.parse(localStorage[ym]);

  
  // localstorageからメッセージを復元
  for (var i = 0; i < arr.length; i++) {
    var mes = $$('<li class="' + arr[i]['direction'] + '"></li>').html(arr[i]['message']); 
    $$("#mes_region").append(mes);
  }

  $$("#done").touch(function() {
    //arr = JSON.parse(localStorage[ym]);
    var message = $$("#message_text").val();
    $$("#message_text").val('');
    if (message == '') message = '　';
    var mes = $$('<li class="left"></li>').html(message); 
    $$("#mes_region").append(mes);
    arr.push({'message': message, 'direction': 'left'});
    localStorage[ym] = JSON.stringify(arr);
    setTimeout(function(){santaSay(arr, ym);}, 1400);
  });
});