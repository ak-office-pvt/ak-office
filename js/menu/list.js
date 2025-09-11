// js/menu/list.js
$(document).ready(function() {
  $('#btnNav').click(function() {
    $('.nav').toggleClass('active');
  });
  $('.nav__overlay').click(function() {
    $('.nav').removeClass('active');
  });
});
