import { data } from '@/data';
import { delay, resolveObjPath } from '@/globals';
import { AlgoOptionsModel } from '@/models';
import { SearchService, SortService } from '@/services';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { Chart } from 'chart.js';

// Constants
const ALGOS = [
  'Bubble Sort',
  'Insertion Sort',
  'Selection Sort',
  'Merge Sort',
  'Count Sort',
  'Quick Sort',
  'Linear Search',
  'Binary Search'
];
const N_VALUES = [
  '10',
  '100',
  '1000',
  '2000',
  '3000',
  '5000',
  '10000',
  '100000',
  '1000000'
];

// Fields
const loading = ref(false);
const sortSrv = SortService.Instance;
const searchSrv = SearchService.Instance;
const algoOps = reactive(new AlgoOptionsModel());
const results = reactive(data);

// Methods
const getTime = (path: string) => {
  const val = resolveObjPath(path, results);
  if (val != null) {
    return (+val).toFixed(5);
  }
  return '-';
};
const generateAscArray = (n: number) => [...Array(n).keys()];

const callAlgo = (arr: Array<number>) => {
  const { Algo, ValueOfN, Case } = algoOps;
  let t0 = 0;
  let t1 = 0;

  // Bubble Sort
  if (Algo === 'Bubble Sort') {
    t0 = performance.now();
    sortSrv.bubbleSort(arr);
    t1 = performance.now();
  }

  // Insertion Sort
  else if (Algo === 'Insertion Sort') {
    t0 = performance.now();
    sortSrv.insertionSort(arr);
    t1 = performance.now();
  }

  // Selection Sort
  else if (Algo === 'Selection Sort') {
    t0 = performance.now();
    sortSrv.selectionSort(arr);
    t1 = performance.now();
  }

  // Merge Sort
  else if (Algo === 'Merge Sort') {
    t0 = performance.now();
    sortSrv.mergeSort(arr);
    t1 = performance.now();
  }

  // Count Sort
  else if (Algo === 'Count Sort') {
    t0 = performance.now();
    sortSrv.countSort(arr, 0, +ValueOfN!);
    t1 = performance.now();
  }

  // Quick Sort
  else if (Algo === 'Quick Sort') {
    t0 = performance.now();
    sortSrv.quickSort(arr, 0, arr.length - 1);
    t1 = performance.now();
  }

  // Linear Search
  else if (Algo === 'Linear Search') {
    let key = 0;
    if (Case === 'Worst') {
      key = +ValueOfN!;
    } else if (Case === 'Average') {
      key = Math.floor(Math.random() * +ValueOfN!);
    }
    t0 = performance.now();
    searchSrv.linearSearch(arr, key);
    t1 = performance.now();
  }

  // Binary Search
  else if (Algo === 'Binary Search') {
    let key = 0;
    if (Case === 'Worst') {
      key = +ValueOfN!;
    } else if (Case === 'Average') {
      key = Math.floor(Math.random() * +ValueOfN!);
    }
    t0 = performance.now();
    searchSrv.binarySearch(arr, key);
    t1 = performance.now();
  }

  return t1 - t0;
};

const generateResults = async () => {
  // Show loading
  loading.value = true;

  // Delay to start the loader, else the loader will hang instantly
  await delay(100);

  // Data array
  let arr: Array<number> = [];
  if (algoOps.Case === 'Best') {
    arr = generateAscArray(+algoOps.ValueOfN!);
  } else if (algoOps.Case === 'Worst') {
    arr = generateAscArray(+algoOps.ValueOfN!).reverse();
  } else {
    arr = Array.from({ length: +algoOps.ValueOfN! }, () =>
      Math.floor(Math.random() * +algoOps.ValueOfN!)
    );
  }

  // Call the algo
  const time = callAlgo(arr);

  // Assign results
  const { Algo, ValueOfN, Case } = algoOps;
  results[Algo!] = {
    ...results[Algo!],
    [+ValueOfN!]: {
      ...(results[Algo!] ? results[Algo!][+ValueOfN!] : {}),
      [Case!]: time
    }
  };

  // Hide loading
  loading.value = false;
};

const updateChart = () => {
  ALGOS.forEach(algo => {
    const chart = (document.getElementById(
      `chart-${algo}-bar`
    ) as HTMLCanvasElement).getContext('2d')!;
    new Chart(chart, {
      type: 'bar',
      data: {
        labels: N_VALUES,
        datasets: Object.entries({
          Best: 'green',
          Average: 'blue',
          Worst: 'red'
        }).map(([key, value]) => ({
          label: key,
          backgroundColor: value,
          data: Object.keys(data[algo]).reduce((acc: Array<number>, curr) => {
            acc.push(+getTime(`${algo}.${curr}.${key}`));
            return acc;
          }, [])
        }))
      },
      options: {
        title: {
          display: true,
          text: `Bar Chart for N = ${algo}`
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      }
    });
  });
  ALGOS.forEach(algo => {
    const chart = (document.getElementById(
      `chart-${algo}-line`
    ) as HTMLCanvasElement).getContext('2d')!;
    new Chart(chart, {
      type: 'line',
      data: {
        labels: N_VALUES,
        datasets: [
          {
            label: 'Worst',
            borderColor: 'red',
            backgroundColor: 'transparent',
            data: Object.keys(data[algo]).reduce((acc: Array<number>, curr) => {
              acc.push(+getTime(`${algo}.${curr}.Worst`));
              return acc;
            }, [])
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: `Line Chart for N = ${algo}`
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      }
    });
  });
};

// Component
const HomeComponent = defineComponent({
  setup() {
    onMounted(() => {
      updateChart();
    });
    return {
      ALGOS,
      N_VALUES,
      loading,
      algoOps,
      results,
      getTime,
      generateResults
    };
  }
});

export default HomeComponent;
