$(function() {
  $(".button-collapse").sideNav();

  $('.nav-wrapper a').click(function(){
    $('.active').removeClass('active');
    $('[href="'+this.attributes.href.value+'"]').parent().addClass('active');
  });
  $('.parallax').parallax();
  $('.carousel').carousel({
    full_width: true,
    indicators: true
  });
  $('.scrollspy').scrollSpy();
});