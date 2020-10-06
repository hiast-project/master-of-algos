import ArrayOfElements from "../../Models/ArrayOfElements";

let arrayInstance = ArrayOfElements();

function Mergesort() {
  function sort(array) {
    let stateTrace = [];
    stateTrace.push({
      type: "log",
      log: " Merger sort is about to start ... ",
    });
    let arr = arrayInstance.copyArray(array);
    mergeSort(arr, 0, arr.length - 1);
    return { stateTrace };

    async function merge(arr, l, m, r) {
      stateTrace.push({
        type: "log",
        log:
          "\n l : " +
          l +
          "  m : " +
          m +
          "  r = " +
          r +
          " Start Merging while l = " +
          l +
          " and m = " +
          m +
          " and r = " +
          r,
      });

      let n1 = m - l + 1;
      let n2 = r - m;

      stateTrace.push({
        type: "log",
        log:
          " n1 : " +
          n1 +
          "  n2 : " +
          n2 +
          " \n Now the algo will store the left half \n of the array in temporary array called L[ " +
          n1 +
          " ] \n  and the Right half of the array \n in temporary array called R[ " +
          n2 +
          " ]",
      });

      let L = [];
      let R = [];
      for (let i = 0; i < n1; i++) L[i] = arr[l + i].height;
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j].height;

      let i = 0;
      let j = 0;
      let k = l;
      stateTrace.push({
        type: "log",
        log: "i : " + i + " j : " + j + " k : " + k,
      });

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          stateTrace.push({
            type: "log",
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "   " +
              "\n Checking if L[ " +
              i +
              " ] <= R[ " +
              i +
              " ] then array[ " +
              k +
              " ] = " +
              "L[ " +
              i +
              " ]",
          });

          arr[k].isPassing = true;

          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          //await events.handleChangeSingleHeight(arr[k]);

          arr[k].height = L[i];
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          arr[k].isPassing = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          //await events.handleUnChangeSingleHeight(arr[k]);

          i++;
          stateTrace.push({
            type: "log",
            log: "\n i : " + i,
          });
        } else {
          stateTrace.push({
            type: "log",
            log:
              "\n i : " +
              i +
              " , j : " +
              j +
              "   " +
              "\n While L[ " +
              i +
              "] > R[ " +
              i +
              "] then array[ " +
              k +
              " ] =" +
              "R[ " +
              j +
              " ]",
          });

          arr[k].isPassing = true;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          //await events.handleChangeSingleHeight(arr[k]);
          arr[k].height = R[j];
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
          arr[k].isPassing = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });

          //await events.handleUnChangeSingleHeight(arr[k]);

          j++;
          stateTrace.push({
            type: "log",
            log: "\n j : " + j,
          });
        }
        k++;
        stateTrace.push({
          type: "log",
          log: "\n k : " + k,
        });
      }

      while (i < n1) {
        stateTrace.push({
          type: "log",
          log:
            "\n i : " +
            i +
            " k : " +
            k +
            " n1 " +
            n1 +
            "   " +
            "\n While  i" +
            " < " +
            " n1 " +
            " then array[ " +
            k +
            " ] = " +
            "L[ " +
            i +
            " ]",
        });

        arr[k].isPassing = true;
        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });

        //await events.handleChangeSingleHeight(arr[k]);
        arr[k].height = L[i];
        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
        arr[k].isPassing = false;

        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
        //await events.handleUnChangeSingleHeight(arr[k]);

        i++;
        k++;

        stateTrace.push({
          type: "log",
          log: "\n i : " + i + " k : " + k,
        });
      }
      while (j < n2) {
        stateTrace.push({
          type: "log",
          log:
            "\n j : " +
            j +
            " k : " +
            k +
            " n2 " +
            n2 +
            "   " +
            "\n While  j " +
            " < " +
            " n2 " +
            " then array[ " +
            k +
            " ] = " +
            "R[ " +
            j +
            " ]",
        });

        arr[k].isPassing = true;
        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
        //await events.handleChangeSingleHeight(arr[k]);
        arr[k].height = R[j];
        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
        arr[k].isPassing = false;

        stateTrace.push({ type: "array", array: arrayInstance.copyArray(arr) });
        j++;
        k++;
        stateTrace.push({
          type: "log",
          log: "\n j : " + j + " k : " + k,
        });
      }
    }

    async function mergeSort(arr, l, r) {
      stateTrace.push({
        type: "log",
        log:
          " l : " +
          l +
          " r : " +
          r +
          " Starting mergeSort(arr, " +
          l +
          ", " +
          r +
          ")",
      });
      stateTrace.push({
        type: "log",
        log: " l : " + l + " r : " + r + " Checking if l < r ",
      });
      if (l < r) {
        // Same as (l+r)/2, but avoids overflow for
        // large l and h

        let m = Math.floor((r + l) / 2);

        stateTrace.push({
          type: "log",
          log:
            " l : " +
            l +
            " r : " +
            r +
            " While  l < r then let m = ( r + 1 ) / 2 = " +
            m,
        });

        stateTrace.push({
          type: "log",
          log: " l : " + l + " m : " + m + " Sort the left side from l to m",
        });
        // subsort first and second halves

        for (let i = m + 1; i <= r; i++) {
          arr[i].isVisible = true;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        //await events.handleUnVisible(arr[i]);

        await mergeSort(arr, l, m);

        for (let i = m + 1; i < r + 1; i++) {
          arr[i].isVisible = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        //events.handleVisible(arr[i]);

        for (let i = l; i < m + 1; i++) {
          arr[i].readyToMergeFromLeft = true;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        stateTrace.push({
          type: "log",
          log:
            " l : " +
            l +
            " m : " +
            m +
            " The left side from l to m is ready to merge",
        });
        //events.handleReadyToMergeFromLeft(arr[i]);

        // stateTrace.push("sort Rigth half");
        // typeTrace.push("log");
        // indexTrace.push("");

        stateTrace.push({
          type: "log",
          log:
            " m + 1 : " +
            (m + 1) +
            " r : " +
            r +
            " Now sort the right side from m + 1 to r",
        });

        await mergeSort(arr, m + 1, r);
        // for (let i = l; i < m + 1; i++) events.handleVisible(arr[i]);
        // for (let i = l; i < m + 1; i++) {
        //   stateTrace.push(arrayInstance.copyArray(arr));
        //   typeTrace.push("ready-left");
        //   indexTrace.push(i);
        // }
        //events.handleReadyToMergeFromLeft(arr[i]);

        for (let i = m; i < r + 1; i++) {
          arr[i].readyToMergeFromRight = true;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        //events.handleReadyToMergeFromRight(arr[i]);

        stateTrace.push({
          type: "log",
          log: " Start merge(arr, " + l + ", " + m + ", " + r + ")",
        });

        await merge(arr, l, m, r);

        for (let i = m; i < r + 1; i++) {
          arr[i].readyToMergeFromRight = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        //events.handleNotReadyToMergeFromRight(arr[i]);
        for (let i = l; i < m + 1; i++) {
          arr[i].readyToMergeFromLeft = false;
          stateTrace.push({
            type: "array",
            array: arrayInstance.copyArray(arr),
          });
        }
        //events.handleNotReadyToMergeFromLeft(arr[i]);
      }
    }
  }

  return { sort };
}
export default Mergesort;
