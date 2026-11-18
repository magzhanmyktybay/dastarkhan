/* =========================================================
   FAQ accordion (jQuery)
   Click on a question -> its answer slides open / closed with
   .slideToggle(). The + / - indicator shows the current state.
   Used on: contact.html
   ========================================================= */
$(function () {
  'use strict';

  var $items = $('.faq-item');
  if (!$items.length) { return; }

  // Respect "reduce motion" system setting: no animation, same behaviour
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SPEED = reduceMotion ? 0 : 300;

  // All answers start collapsed (without JS they stay readable)
  $('.faq-answer').hide();

  $('.faq-toggle').on('click', function () {
    var $button = $(this);
    var $item = $button.closest('.faq-item');
    var $answer = $item.find('.faq-answer');

    // stop(true, true) finishes a running animation, so fast clicks
    // never leave the + / - sign out of sync with the answer
    $answer.stop(true, true).slideToggle(SPEED, function () {
      var isOpen = $answer.is(':visible');
      $button.attr('aria-expanded', isOpen ? 'true' : 'false');
      $item.toggleClass('is-open', isOpen);
      $button.find('.faq-icon').text(isOpen ? '\u2212' : '+');   // − or +
    });
  });
});
