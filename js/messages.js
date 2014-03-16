var messages = [
  '１年間、よくがんばったね。クリスマスにプレゼントを持っていくよ。楽しみにしていてね。',
  '教えてくれてありがとう。プレゼントまであと１スタンプ、ラストスパートだ！',
  'いい子にしているんだね。プレゼントまであと2スタンプ、もうすぐだね！',
  '教えてくれてありがとう。だんだんクリスマスが近づいてきたね。あと3スタンプがんばろう！',
  '教えてくれてありがとう。プレゼントまであと4スタンプ、この調子この調子！',
  'いい子にしているんだね。えらいぞ！プレゼントまであと5スタンプだ！',
  '教えてくれてありがとう。プレゼントまであと6スタンプ、あと半分だね！',
  '教えてくれてありがとう。サンタさんはうれしいよ！プレゼントまであと7スタンプだ！',
  '教えてくれてうれしいな。プレゼントまであと8スタンプ。がんばろう！',
  'いい子にしているんだね。えらいぞ！プレゼントまであと9スタンプだ！',
  '教えてくれてありがとう。プレゼントまであと10スタンプだね！この調子この調子！',
  'やぁ、教えてくれてありがとう。サンタさんもうれしいよ！プレゼントまであと11スタンプだ！',
]

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
  var message = messages[12 - localStorage.count];
  say('right', message, arr, ym);
  arr.push({'message': message, 'direction': 'right'});
  localStorage[ym] = JSON.stringify(arr);
}

// 自分のメッセージを追加
function meSay(arr, ym) {
  if(! JSON.parse(localStorage[ym]).length){
    localStorage.count = Number(localStorage.count) + 1;
  }
  var message = $$("#message_text").val();
  if(! message.length) return false;
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
    $$('#back').css('top', '0px');
  });

  $$("#message_text").touch(function() {
    $$("#message_text")[0].focus();
  });  
});
