import ArrayOfElements from "../../Models/ArrayOfElements";

let arrayInstance = ArrayOfElements();

function BubbleSort() {
  function swaping(tmp1, tmp2) {
    let tmp = tmp1.height;
    tmp1.height = tmp2.height;
    tmp2.height = tmp;
  }

  function sort(array) {
    let stateTrace = [];

    let arr = arrayInstance.copyArray(array);
    //await events.handleLog("Bubble sort is about to start");
    stateTrace.push({ type: "log", log: "Bubble sort is about to start" });
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        stateTrace.push({
          type: "log",
          log:
            "\n i : " +
            i +
            " , j : " +
            j +
            "   " +
            "\n Checking if arr[" +
            j +
            "] > arr[" +
            (j + 1) +
            "]",
        });

        if (arr[j].height > arr[j + 1].height) {
          stateTrace.push({
            type: "log",
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "   " +
              "\n While arr[" +
              j +
              "] > arr[" +
              (j + 1) +
              "]  Then swap them ",
          });

          arr[j].isSwaping = true;
          arr[j + 1].isSwaping = true;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
          //await events.handleChangeHeight(arr[j], arr[j + 1]);
          swaping(arr[j], arr[j + 1]);
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
          stateTrace.push({
            type: "log",
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "   " +
              "\n Finish swaping" +
              "  arr[" +
              j +
              "] and  arr[" +
              (j + 1) +
              "]",
          });

          arr[j].isSwaping = false;
          arr[j + 1].isSwaping = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          //await events.handleUnChangeHeight(arr[j], arr[j + 1]);
        }
        stateTrace.push({
          type: "log",
          log:
            "\n i : " +
            i +
            " , j : " +
            j +
            "   " +
            "\n While arr[" +
            j +
            "] < arr[" +
            (j + 1) +
            "]  Then continue ",
        });
      }
      stateTrace.push({
        type: "log",
        log:
          "\n i : " +
          i +
          " , j : " +
          (arr.length - i - 1) +
          "   " +
          "\n Now while arr[" +
          (arr.length - i - 1) +
          "] is in ther correct order the let it be green",
      });

      arr[arr.length - i - 1].isFinal = true;
      stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
      //await events.handleFinal(arr[arr.length - i - 1]);
    }

    stateTrace.push({
      type: "log",
      log:
        "\n After N-1 elements of the array is ordered \n then the elemnt arr[0] is eventualy in the right place",
    });

    arr[0].isFinal = true;
    stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
    //events.handleFinal(arr[0]);
    console.log(stateTrace);
    return { stateTrace };
  }
  //for (var k = 0; k < arr.length; k++) console.log(arr[k].height);
  return { sort };
}

export default BubbleSort;
