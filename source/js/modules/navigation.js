$(document).ready(function(){

	$(".menu-toggle").click(function(){
		$(".nav-main > ul").slideToggle();
	});

	// responsive subnav
	$(".nav-main li:has(ul)").addClass("menu-with-sub");
	$('.menu-with-sub').prepend("<div class=\"sub-toggle\">+</div>");

	$(".sub-toggle").click(function(){
		$(this).parent().find("ul").slideToggle();;
		$(this).parent().toggleClass("open");
	});

});