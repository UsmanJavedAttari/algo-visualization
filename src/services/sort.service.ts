export class SortService {
  private static _Instance: SortService;
  public static get Instance() {
    if (!SortService._Instance) {
      SortService._Instance = new SortService();
    }
    return SortService._Instance;
  }
  private constructor() {}

  public bubbleSort(inputArr: Array<number>) {
    const len = inputArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        if (inputArr[i] > inputArr[i + 1]) {
          const tmp = inputArr[i];
          inputArr[i] = inputArr[i + 1];
          inputArr[i + 1] = tmp;
          swapped = true;
        }
      }
    } while (swapped);
    return inputArr;
  }

  public insertionSort(inputArr: Array<number>) {
    const n = inputArr.length;
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      const current = inputArr[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current < inputArr[j]) {
        inputArr[j + 1] = inputArr[j];
        j--;
      }
      inputArr[j + 1] = current;
    }
    return inputArr;
  }

  public selectionSort(inputArr: Array<number>) {
    const n = inputArr.length;

    for (let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      let min = i;
      for (let j = 0; j < n; j++) {
        if (inputArr[j] < inputArr[min]) {
          min = j;
        }
      }
      if (min != i) {
        // Swapping the elements
        const tmp = inputArr[i];
        inputArr[i] = inputArr[min];
        inputArr[min] = tmp;
      }
    }
    return inputArr;
  }

  private merge(arr1: Array<number>, arr2: Array<number>) {
    const sorted: Array<number> = [];

    while (arr1.length && arr2.length) {
      if (arr1[0] < arr2[0]) sorted.push(arr1.shift()!);
      else sorted.push(arr2.shift()!);
    }

    return sorted.concat(arr1.slice().concat(arr2.slice()));
  }

  public mergeSort(inputArr: Array<number>) {
    if (inputArr.length <= 1) return inputArr;
    const mid = Math.floor(inputArr.length / 2);
    const left: Array<number> = this.mergeSort(inputArr.slice(0, mid));
    const right: Array<number> = this.mergeSort(inputArr.slice(mid));

    return this.merge(left, right);
  }

  public countSort(arr: Array<number>, min: number, max: number) {
    let i;
    let z = 0;
    const count = [];

    for (i = min; i <= max; i++) {
      count[i] = 0;
    }

    for (i = 0; i < arr.length; i++) {
      count[arr[i]]++;
    }

    for (i = min; i <= max; i++) {
      while (count[i]-- > 0) {
        arr[z++] = i;
      }
    }
    return arr;
  }

  private swap(items: Array<number>, leftIndex: number, rightIndex: number) {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  private partition(items: Array<number>, left: number, right: number) {
    const pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
  public quickSort(items: Array<number>, left: number, right: number) {
    let index;
    if (items.length > 1) {
      index = this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.quickSort(items, index, right);
      }
    }
    return items;
  }
}
