export class SearchService {
  private static _Instance: SearchService;
  public static get Instance() {
    if (!SearchService._Instance) {
      SearchService._Instance = new SearchService();
    }
    return SearchService._Instance;
  }
  private constructor() {}

  public linearSearch(inputArr: Array<number>, key: number) {
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i] === key) return true;
    }
    return false;
  }

  public binarySearch(inputArr: Array<number>, key: number) {
    let start = 0,
      end = inputArr.length - 1;

    // Iterate while start not meets end
    while (start <= end) {
      // Find the mid index
      const mid = Math.floor((start + end) / 2);
      // If element is present at mid, return True
      if (inputArr[mid] === key) return true;
      // Else look in left or right half accordingly
      else if (inputArr[mid] < key) start = mid + 1;
      else end = mid - 1;
    }

    return false;
  }
}
