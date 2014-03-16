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

// メッセージを追加する
function say(direction, message, arr, ym) {
    var iconfile = direction == 'left' ? 'img/popIconOwn.png' : 'img/popIconSanta.png';
    if (message == '') message = '　';
    var mes = $$('<li class="' + direction + '">' + message + '<img src="' + iconfile + '" class="' + direction + '_icon"/></li>'); 
    $$("#mes_region").append(mes);
}

// サンタのメッセージを追加
function santaSay(arr, ym) {
  var message = 'ぴーやくん、教えてくれてありがとう。プレゼントまであと1スタンプだね！ラストスパートだ！';
  say('right', message, arr, ym);
  arr.push({'message': message, 'direction': 'right'});
  localStorage[ym] = JSON.stringify(arr);
}

// 自分のメッセージを追加
function meSay(arr, ym) {
  var message = $$("#message_text").val();
  $$("#message_text").val('');
  say('left', message, arr, ym);
  arr.push({'message': message, 'direction': 'left'});
  localStorage[ym] = JSON.stringify(arr);
  setTimeout(function(){santaSay(arr, ym);}, 1400);
}

// ready時の処理
$$(document).ready(function(){
  var ym = getQueryString()['ym'];
  // localStorageを初期化
  if (!localStorage[ym]) localStorage[ym] = JSON.stringify([]);
  var arr = JSON.parse(localStorage[ym]);
  
  // localstorageからメッセージを復元
  for (var i = 0; i < arr.length; i++) {
    say(arr[i]['direction'], arr[i]['message'], arr, ym);
  }

  $$("#done").touch(function() {
    meSay(arr, ym);
  });
});
