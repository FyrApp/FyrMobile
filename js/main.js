$(document).ready(function() {

	function urlencode(args) {
		var str = [];
		for(var p in args) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(args[p]));
		return str.join("&");
	}

	function request(path, args, callback){
		$.ajax({
			dataType: "json",
			url: 'http://example.com/' + path,
			data: urlencode(args),
			success: callback
		});
	}
	
	function changePage(page, preload){
		$(".page").hide()
		$(".content").scrollTop()
		$(".content").append('<div class="loading"><div id="bowlG"><div id="bowl_ringG"><div class="ball_holderG"><div class="ballG"></div></div></div></div><p>Loading</p></div>')
		//after preload function, us .remove() as callback
		$(".loading").remove()
		$("." + page).show()
		hideMenu()
		$(".tile").each(function(){
			
			if ($(this).data("page") == page) {
				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected");
			}
		})
	}
	
	$(".menu .tile").click(function(){
		changePage($(this).data('page'))
	})
	
	$(".content").height($(window).height()-43)
	
	/* START INFINISCROLL FUCNTIONALITY */
	var load_more = false;
	$('.content').scroll(function(){
		if ($('.content').prop('scrollHeight') - $('.content').scrollTop() == $('.content').height() && !load_more){
			$('.content').append('<div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>'); //load more spinner
			load_more = true
			
			//request data
			$('.windows8').remove();
			//append data to content
			
			load_more = false
		}
	});
	/* START INFINISCROLL FUCNTIONALITY */
	
	/* START SLIDER FUNCTIONALITY */	
	var hammertime = $(document).hammer();
	
	var menu_out = false;
	hideMenu()
	
	var shareit_out = false;
	hideshareit()
	
	hammertime.on("swiperight", function(ev) {
		if (shareit_out) {
			hideshareit();
		} else if (!menu_out) {
			showMenu()
		}
	});
	
	hammertime.on("swipeleft", function(ev) {
		if (menu_out) {
			hideMenu();
		}
	});
	
	$('.slide_toggle').click(function() {
		if (!menu_out) {
			showMenu();
		} else {
			hideMenu();
		}		
	});
	
	$('.shareit_toggle').click(function() {
		if (!shareit_out) {
			showshareit();
		} else {
			hideshareit();
		}		
	});
	
	function showMenu(){
		$('.menu').show()
		$('.main').animate({
			left: '81%'
		}, 250, function() {
			menu_out = true;
		});
	}
	
	function hideMenu(){
		$('.main').animate({
			left: '0'
		}, 250, function() {
			menu_out = false;
			$('.menu').hide()
		});
	}
	
	function showshareit(){
		$('.shareit').show()
		$('.main').animate({
			left: '-81%'
		}, 250, function() {
			shareit_out = true;
		});
	}
	
	function hideshareit(){
		$('.shareit').animate({
			right: '0'
		}, 250, function() {
			$('.main').animate({
				left: '0'
			}, 250, function() {
				shareit_out = false;
				$('.shareit').hide()
			});
		});
	}
	/* STOP SLIDER FUNCTIONALITY */

});