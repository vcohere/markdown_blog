$(document).ready(function() {
	console.info('%c So you like to look under the hood uh ?', 'color: #424242');
	$('.mail_cover').hide();

	$('.fa-envelope-o').click(function() {
		$('.mail_cover').fadeIn(700);
		$('.head_wrap').animate({'position': 'absolute'});
		$(window).scrollTop(0);
		$('body').css('overflow', 'hidden');
	});
	$('.mail_cover .close').click(function() {
		$('.mail_cover').fadeOut(300);
		$('body').css('overflow', 'auto');
	});
	$('.project .fa-info-circle').click(function() {
		$('.project').removeClass('flipped');
		$(this).parent().parent().addClass('flipped');
		$(this).parent().parent().focus();
		console.log('plop');
	});
	$('.project .fa-minus-square-o').click(function() {
		$('.project').removeClass('flipped');
	});
});
