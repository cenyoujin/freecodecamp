//https://static-cdn.jtvnw.net/jtv-static/404_preview-60x60.png   icon not display
//var streamArr = ["ESL_SC2", "OgamingSC2","haha", "freecodecamp"];
function dataPre(){
	var streamArr = ["ESL_SC2", "OgamingSC2","cretetion","freecodecamp","cretetion","freecodecamp","storbeck","habathcx","RobotCaleb", "noobs2ninjas","haha12145jh"];
	var type = ['users','streams'];
	for (var i=0,len = streamArr.length;i<len;i++){
			getPreInfo(streamArr[i],'streams');
	}
}

function getPreInfo(element,type){
	$.ajax({
			url: 'https://wind-bow.gomix.me/twitch-api/'+type+'/'+element,
			type: 'GET',
			dataType: 'JSON',
		})
		.done(
			function(data){
				display(data,element);
			}
		);
}

function display(data,element) {
				var stream = data.stream;
				if(stream){
					var loginStaus = 'Online';
					var $name = stream.channel.display_name;
					var $logo = stream.channel.logo;
					var $links = stream.channel.url;
					var $status = stream.channel.status;
					var $hml = "<li class='strealist online-list'><div class='row text-center'>"
								+"<div class='col-sm-1 center'><img src="+$logo+"></div>"
								+"<div class='col-sm-2 center'><a href="+$links+">"+$name+"</a></div>"
								+"<div class='col-sm-8 center'>"+$status+"</div>"
								"</div></li>";
					$('.strea').append($hml);
				}else{
					getOfflineInfo(element);
				}
	}

function getOfflineInfo(element){
	$.ajax({
			url: 'https://wind-bow.gomix.me/twitch-api/channels/'+element,
			type: 'GET',
			dataType: 'JSON',
		})
		.done(
			function(data){
				console.log(data);
				var $loginStaus = 'Offline';
				if(data.status === 404||null){
					var $logo = 'https://static-cdn.jtvnw.net/jtv-static/404_preview-60x60.png';
					var $hml = "<li class='strealist notexist'><div class='row text-center'>"
								+"<div class='col-sm-1 center'><img src="+$logo+"></div>"
								+"<div class='col-sm-2 center'>"+element+"</div>"
								+"<div class='col-sm-8 center'>Not Exist</div>"
								"</div></li>";
					$('.strea').append($hml);
				}else{
					var $logo = data.logo;
					var $links = data.url;
					var $hml = "<li class='strealist offline-list'><div class='row text-center'>"
									+"<div class='col-sm-1 center'><img src="+$logo+"></div>"
									+"<div class='col-sm-2 center'><a href="+$links+">"+element+"</a></div>"
									+"<div class='col-sm-8 center'>"+$loginStaus+"</div>"
									"</div></li>";
					$('.strea').append($hml);
				}
			}
		);
}



$(document).ready(function(){
	dataPre();
	$(document).on('click',"#Online",function(){
		$('.hidden').removeClass('hidden');
		$('.offline-list').addClass('hidden');
		$('.notexist').addClass('hidden');
	});
	$(document).on('click',"#Offline",function(){
		$('.hidden').removeClass('hidden');
		$('.online-list').addClass('hidden');
		$('.notexist').addClass('hidden');
	});
	$(document).on('click',"#All",function(event){
		$('.hidden').removeClass('hidden');
		
	});
	
});
