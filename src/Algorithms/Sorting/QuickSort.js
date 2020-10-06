import ArrayOfElements from "../../Models/ArrayOfElements";
function QuickSort() {
  let arrayInstance = ArrayOfElements();

  function sort(array) {
    let stateTrace = [];
    let arr = arrayInstance.copyArray(array);
    stateTrace.push({ type: "log", log: "Quick sort about to start ..." });
    quickSort(arr, 0, arr.length - 1);
    return { stateTrace };

    async function quickSort(arr, low, high) {
      stateTrace.push({
        log:
          " \n low : " +
          low +
          " , high : " +
          high +
          " \n Applying quickSort on arr while low = " +
          low +
          " and high = " +
          high,
        type: "log",
      });

      if (low < high) {
        stateTrace.push({
          log:
            "\n low : " +
            low +
            " , high : " +
            high +
            "\n" +
            "While low < high then partition( arr, low,  high )",
          type: "log",
        });
        let pi = await partition(arr, low, high);

        stateTrace.push({
          log: "Sorting the left side of the array",
          type: "log",
        });
        for (let i = pi; i <= high; i++) {
          arr[i].isVisible = true;
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
        }
        //events.handleUnVisible(arr[i]);
        stateTrace.push({
          log:
            "Now recursivley apply quickSort( arr, " +
            low +
            ", " +
            (pi - 1) +
            " ) which is the left side of arr",
          type: "log",
        });
        await quickSort(arr, low, pi - 1);

        for (let i = low; i < pi + 1; i++) {
          stateTrace.push({
            log: "Checking if arr[" + i + "] is a pivot element",
            type: "log",
          });
          if (arr[i].isPivot == true) {
            stateTrace.push({
              log:
                "\n i : " +
                i +
                "\n" +
                "While arr[i] is a pivot element the set it as ordered element",
              type: "log",
            });
            arr[i].isFinal = true;
            stateTrace.push({
              array: arrayInstance.copyArray(arr),
              type: "array",
            });
          }
          //await events.handleFinal(arr[i]);
          if (arr[i].isFinal == false) {
            arr[i].isFinal = true;
            stateTrace.push({
              array: arrayInstance.copyArray(arr),
              type: "array",
            });
            //await events.handleFinal(arr[i]);
          }
        }

        stateTrace.push({
          log: "Done sorting the left side of the array",
          type: "log",
        });
        for (let i = pi; i <= high; i++) {
          arr[i].isVisible = false;
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          //events.handleVisible(arr[i]);
        }

        stateTrace.push({
          log:
            "Now recursivley apply quickSort( arr, " +
            (pi + 1) +
            ", " +
            high +
            " )",
          type: "log",
        });

        await quickSort(arr, pi + 1, high);

        for (let i = pi + 1; i <= high; i++) {
          stateTrace.push({
            log:
              "\n i : " + i + "\n" + "Checking if arr[ i] is a pivot element",
            type: "log",
          });
          if (arr[i].isPivot == true) {
            arr[i].isFinal = true;
            stateTrace.push({
              array: arrayInstance.copyArray(arr),
              type: "array",
            });
            stateTrace.push({
              log:
                "\n i : " +
                i +
                "\n" +
                "While arr[i] is a pivot element the set it as an ordered element",
              type: "log",
            });
            //events.handleFinal(arr[i]);
          }
          if (arr[i].isFinal == false) {
            arr[i].isFinal = true;
            stateTrace.push({
              array: arrayInstance.copyArray(arr),
              type: "array",
            });
            //events.handleFinal(arr[i]);
          }
        }
      }
    }
    async function partition(arr, low, high) {
      stateTrace.push({
        log: "Start partition( arr, " + low + ", " + high + " )",
        type: "log",
      });

      stateTrace.push({
        log: "Set arr[" + high + "] as a pivot element",
        type: "log",
      });
      let pivot = arr[high].height;

      arr[high].isPivot = true;
      stateTrace.push({
        array: arrayInstance.copyArray(arr),
        type: "array",
      });
      //await events.handlePivot(arr[high]);

      let i = low - 1;

      stateTrace.push({
        log: "Set i = low - 1 = " + i,
        type: "log",
      });

      for (let j = low; j < high; j++) {
        stateTrace.push({
          type: "log",
          log: "\n i : " + i + " , j : " + j + "\n",
        });
        arr[j].isPassing = true;
        stateTrace.push({
          array: arrayInstance.copyArray(arr),
          type: "array",
        });
        //await events.handleChangeColorPassing(arr[j]);

        stateTrace.push({
          log:
            "\n i : " + i + " , j : " + j + "\n" + "Checking if arr[j] < pivot",
          type: "log",
        });
        if (arr[j].height < pivot) {
          stateTrace.push({
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "\n" +
              "While  arr[j] < pivot then i++",
            type: "log",
          });
          i++;
          arr[i].isPassing = true;
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          //await events.handleChangeColorPassing(arr[i]);

          stateTrace.push({
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "\n" +
              " Swaping arr[i ] and arr[ j]",
            type: "log",
          });
          arr[i].isPassing = false;
          arr[j].isPassing = false;
          arr[i].isSwaping = true;
          arr[j].isSwaping = true;
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          swap(arr[i], arr[j]);
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          //await events.handleChangeHeight(arr[i], arr[j]);

          arr[i].isSwaping = false;
          arr[j].isSwaping = false;

          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          //await events.handleUnChangeHeight(arr[i], arr[j]);

          // stateTrace.push({
          //   array: arrayInstance.copyArray(arr),
          //   type: "uncolorpassing",
          //   index: i,
          // });
          //events.handleUnChangeColorPassing(arr[i]);

          stateTrace.push({
            log: "\n i : " + i + " , j : " + j + "\n" + " Move to arr[i + 1]",
            type: "log",
          });
          arr[i + 1].isPassing = true;
          stateTrace.push({
            array: arrayInstance.copyArray(arr),
            type: "array",
          });
          //await events.handleChangeColorPassing(arr[i + 1]);
        }

        arr[j].isPassing = false;
        stateTrace.push({
          array: arrayInstance.copyArray(arr),
          type: "array",
        });
        //await events.handleUnChangeColorPassing(arr[j]);
      }

      stateTrace.push({
        log:
          "\n i : " +
          i +
          " , high : " +
          high +
          "\n" +
          "Now swaping arr[i + 1] and arr[high]",
        type: "log",
      });
      arr[i + 1].isSwaping = true;
      arr[high].isSwaping = true;
      stateTrace.push({
        array: arrayInstance.copyArray(arr),
        type: "array",
      });
      //await events.handleChangeHeight(arr[i + 1], arr[high]);
      swap(arr[i + 1], arr[high]);
      stateTrace.push({
        array: arrayInstance.copyArray(arr),
        type: "array",
      });

      arr[i + 1].isSwaping = false;
      arr[high].isSwaping = false;
      stateTrace.push({
        array: arrayInstance.copyArray(arr),
        type: "array",
      });
      //await events.handleUnChangeHeight(arr[i + 1], arr[high]);

      stateTrace.push({
        type: "log",
        log: "\n i : " + i + "\n" + " Set arr[i + 1] as ordered element",
      });
      arr[i + 1].isFinal = true;
      stateTrace.push({
        array: arrayInstance.copyArray(arr),
        type: "array",
      });
      //await events.handleFinal(arr[i + 1]);

      stateTrace.push({
        type: "log",
        log: "\n i : " + i + "\n" + "Now return i + 1",
      });

      return i + 1;
    }
  }

  function swap(tmp1, tmp2) {
    let tmp = tmp1.height;
    tmp1.height = tmp2.height;
    tmp2.height = tmp;
  }

  return { sort };
}

export default QuickSort;
