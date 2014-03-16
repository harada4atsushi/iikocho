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
  var message = 'ぴーやくん、教えてくれてありがとう。プレゼントまであと1スタンプだね！ラストスパートだ！';
  var mes = $$('<li class="right">' + message + '<img src="img/popIconSanta.png" class="right_icon"/></li>'); 
  $$("#mes_region").append(mes);
  arr.push({'message': message, 'direction': 'right'});
  localStorage[ym] = JSON.stringify(arr);
}

// ready時の処理
$$(document).ready(function(){
  var ym = getQueryString()['ym'];
  // localStorageを初期化
  if (!localStorage[ym]) localStorage[ym] = JSON.stringify([]);

  var arr = JSON.parse(localStorage[ym]);

  
  // localstorageからメッセージを復元
  for (var i = 0; i < arr.length; i++) {
    var iconfile = arr[i]['direction'] == 'left' ? 'img/popIconOwn.png' : 'img/popIconSanta.png';
    var mes = $$('<li class="' + arr[i]['direction'] + '">' + arr[i]['message'] + '<img src="' + iconfile + '" class="' + arr[i]['direction'] + '_icon"/></li>'); 
    $$("#mes_region").append(mes);
  }

  $$("#done").touch(function() {
    //arr = JSON.parse(localStorage[ym]);
    var message = $$("#message_text").val();
    $$("#message_text").val('');
    if (message == '') message = '　';
    var mes = $$('<li class="left">' + message + '<img src="img/popIconOwn.png" class="left_icon"/></li>'); 
    $$("#mes_region").append(mes);
    arr.push({'message': message, 'direction': 'left'});
    localStorage[ym] = JSON.stringify(arr);
    setTimeout(function(){santaSay(arr, ym);}, 1400);
  });
});
