import Element from "./Element";

let elementInstance = Element();
let max = 100;
let min = 10;
function ArrayOfElements() {
  // creating a new element
  function createArrayOfElements(NumberOfElements) {
    let arrayOfElements = [];
    for (let i = 0; i < NumberOfElements; i++)
      arrayOfElements[i] = elementInstance.createElement(
        i,
        Math.floor(Math.random() * (max - min) + min)
      );
    return arrayOfElements;
  }

  function createOrderedArrayOfElements(NumberOfElements) {
    let arrayOfElements = [];
    let tmpHeight = [];
    for (let i = 0; i < NumberOfElements; i++)
      tmpHeight[i] = Math.floor(Math.random() * (max - min) + min);

    tmpHeight.sort();
    for (let i = 0; i < NumberOfElements; i++)
      arrayOfElements[i] = elementInstance.createElement(i, tmpHeight[i]);
    return arrayOfElements;
  }

  function createReversedArrayOfElements(NumberOfElements) {
    let arrayOfElements = [];
    let tmpHeight = [];
    for (let i = 0; i < NumberOfElements; i++)
      tmpHeight[i] = Math.floor(Math.random() * (max - min) + min);

    tmpHeight.sort();
    for (let i = 0; i < NumberOfElements; i++)
      arrayOfElements[i] = elementInstance.createElement(
        i,
        tmpHeight[NumberOfElements - i - 1]
      );
    return arrayOfElements;
  }

  // copying an exisiting array of elements
  function copyArray(array) {
    let tmparray = [];
    for (let i = 0; i < array.length; i++) {
      let element = elementInstance.copyElement(array[i]);
      tmparray[i] = element;
    }
    return tmparray;
  }
  function clearArrayColor(array) {
    let tmpArray = [];
    for (let i = 0; i < array.length; i++) {
      tmpArray[i] = elementInstance.clearElementColor(array[i]);
    }
    return tmpArray;
  }
  function clearArray() {
    let tmp = [];
    return tmp;
  }

  return {
    createArrayOfElements,
    copyArray,
    clearArrayColor,
    clearArray,
    createOrderedArrayOfElements,
    createReversedArrayOfElements,
  };
}
export default ArrayOfElements;
