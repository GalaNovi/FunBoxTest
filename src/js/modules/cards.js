'use strict';

(function () {
  var ESC_CODE = 32;
  var ENTER_CODE = 13;
  var cardsElements = document.querySelectorAll('.item');

  var onCardElementMouseout = function (evt) {
    evt.currentTarget.blur();
  };

  var onChosenCardElementClick = function (evt) {
    evt.currentTarget.classList.remove('item--chosen');
    evt.currentTarget.addEventListener('click', onDefaultCardElementClick);
    evt.currentTarget.addEventListener('mouseleave', onCardElementMouseout);
    evt.currentTarget.addEventListener('keydown', onDefaultCardElementPressKey);
  };

  var onChosenCardElementPressKey = function (evt) {
    if (evt.keyCode === ESC_CODE || evt.keyCode === ENTER_CODE) {
      evt.preventDefault();
      evt.currentTarget.classList.remove('item--chosen');
      evt.currentTarget.addEventListener('keydown', onDefaultCardElementPressKey);
      evt.currentTarget.addEventListener('click', onDefaultCardElementClick);
      evt.currentTarget.addEventListener('mouseleave', onCardElementMouseout);
    }
  };

  var onChosenCardElementMouseout = function (evt) {
    if (evt.currentTarget.classList.contains('item--chosen-click')) {
      evt.currentTarget.removeEventListener('click', onDefaultCardElementClick);
      evt.currentTarget.removeEventListener('mouseleave', onChosenCardElementMouseout);
      evt.currentTarget.removeEventListener('keydown', onDefaultCardElementPressKey);
      evt.currentTarget.classList.remove('item--chosen-click');
      evt.currentTarget.classList.add('item--chosen');
      evt.currentTarget.addEventListener('click', onChosenCardElementClick);
      evt.currentTarget.addEventListener('keydown', onChosenCardElementPressKey);
      evt.currentTarget.blur();
    }
  };

  var onCardElementBlur = function (evt) {
    if (evt.currentTarget.classList.contains('item--chosen-click')) {
      evt.currentTarget.removeEventListener('click', onDefaultCardElementClick);
      evt.currentTarget.removeEventListener('mouseleave', onChosenCardElementMouseout);
      evt.currentTarget.removeEventListener('keydown', onDefaultCardElementPressKey);
      evt.currentTarget.classList.remove('item--chosen-click');
      evt.currentTarget.classList.add('item--chosen');
      evt.currentTarget.addEventListener('keydown', onChosenCardElementPressKey);
      evt.currentTarget.addEventListener('click', onChosenCardElementClick);
    }
  };

  var onDefaultCardElementClick = function (evt) {
    if (!evt.currentTarget.classList.contains('item--disabled')) {
      evt.currentTarget.classList.toggle('item--chosen-click');
      evt.currentTarget.removeEventListener('mouseleave', onCardElementMouseout);
      evt.currentTarget.addEventListener('mouseleave', onChosenCardElementMouseout);
      evt.currentTarget.addEventListener('blur', onCardElementBlur);
    }
  };

  var onDefaultCardElementPressKey = function (evt) {
    if (!evt.currentTarget.classList.contains('item--disabled') && evt.keyCode === ESC_CODE || evt.keyCode === ENTER_CODE) {
      evt.preventDefault();
      evt.currentTarget.classList.toggle('item--chosen-click');
      evt.currentTarget.removeEventListener('mouseleave', onCardElementMouseout);
      evt.currentTarget.addEventListener('mouseleave', onChosenCardElementMouseout);
      evt.currentTarget.addEventListener('blur', onCardElementBlur);
    }
  };

  var addCardsListeners = function (cards) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', onDefaultCardElementClick);
      cards[i].addEventListener('keydown', onDefaultCardElementPressKey);
    }
  };

  addCardsListeners(cardsElements);
})();
