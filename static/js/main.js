$(function() {
  $('.button-collapse').click(function(){
    Materialize.toast("Responsive navbar isn't ready yet!",5000)
  });
  $('.parallax').parallax();
  $('.carousel').carousel({
    full_width: true,
    indicators: true
  });
  $('.scrollspy').scrollSpy();
});