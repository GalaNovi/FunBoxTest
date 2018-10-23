'use strict';

(function () {
  var START_MARGIN = 80;
  var itemsElements = document.querySelectorAll('.item');
  var itemsAgitationsElements = document.querySelectorAll('.item__agitation');
  var maxHeightAgitationElement;

  var getMaxHeightAgitationElement = function (elements) {
    var heightsArray = [];
    for (var i = 0; i < elements.length; i++) {
      heightsArray.push(elements[i].offsetHeight);
    }
    maxHeightAgitationElement = Math.max.apply(null, heightsArray);
  };

  var setMarginItemsElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.marginBottom = maxHeightAgitationElement + START_MARGIN + 'px';
    };
  };

  getMaxHeightAgitationElement(itemsAgitationsElements);
  setMarginItemsElements(itemsElements);
})();
