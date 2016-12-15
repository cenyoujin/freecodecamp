$(function(){
	function tog(v){return v?'addClass':'removeClass';} 
	$(document).on('input', '.clearable', function(event) {
		$(this)[tog(this.value)]("x");
	}).on('mousemove', '.clearable', function(event) {
		$(this)[tog(this.offsetWidth-18<event.clientX-this.getBoundingClientRect().left)]("onX");
	}).on('click', '.onX', function(e) {
		e.preventDefault();
		$(this).removeClass('x onX').val('').change();
	});

	$(document).on('click', '#search-btn', function(event){ 
		$('this').removeClass('x onX');
		var searchCont = $('.clearable').val();
		console.log(searchCont);
		if(searchCont){
			$('li').remove();
			$.ajax( {
		    	url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchCont + "&format=json&callback=?",
		    	type:'GET',
		    	dataType:'JSON',
		    	success:function(data){	
		    		for(var i=0;i<10;i++){
		    			var $liContent = "<li class='result-list'><a href="+data[3][i]+"><h3>"+data[1][i]+"</h3><p>"+data[2][i]+"</p></a></li>";
		    			$('#result-ul').append($liContent);
		    		}
		    		console.log(data);
		    	}
		    }).done(function(){
				$('h1').css('margin-top', '2%');
		    }
		    )
		} ;
	})

	$(document).keydown(function(event){  
	    if(event.keyCode===13){  
	       $("#search-btn").click();  
	    }  
	 });  
})




