$(function(){
	var streamArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	$.ajax({
		url: 'https://wind-bow.gomix.me/twitch-api/streams/'+'freecodecamp',
		type: 'GET',
		//dataType: 'JSON',
	})
	.done(function(data) {
		console.log(data);
		var stream = data.stream;
		if(stream){
			var loginStaus = 'Online';
			var followers = stream.channel.followers;
			var logo = stream.channel.logo;
			var links = stream.channel.url;
			var info = stream.channel.status;
			console.log(status);
		}else{
			var loginStaus = 'Offline';
		}
		//var 
	});
})