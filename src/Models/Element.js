function Element() {
  function createElement(index, height) {
    // the equation x = random * (max - min) + min  for get values of x between 100 and 90 while random between 0 and 1

    return {
      height,
      index,
      isInit: true,
      isSwaping: false,
      isFinal: false,
      isPivot: false,
      isPassing: false,
      isVisible: false,
      isSingleChange: false,
      readyToMergeFromLeft: false,
      readyToMergeFromRight: false,
    };
  }

  function copyElement(element) {
    return {
      height: element.height,
      index: element.index,
      isInit: element.isInit,
      isSwaping: element.isSwaping,
      isFinal: element.isFinal,
      isPivot: element.isPivot,
      isPassing: element.isPassing,
      isVisible: element.isVisible,
      isSingleChange: element.isSingleChange,
      readyToMergeFromLeft: element.readyToMergeFromLeft,
      readyToMergeFromRight: element.readyToMergeFromRight,
    };
  }
  function clearElementColor(element) {
    return {
      height: element.height,
      index: element.index,
      isInit: true,
      isSwaping: false,
      isFinal: false,
      isPivot: false,
      isPassing: false,
      isVisible: false,
      isSingleChange: false,
      readyToMergeFromLeft: false,
      readyToMergeFromRight: false,
    };
  }

  return { createElement, copyElement, clearElementColor };
}

export default Element;
