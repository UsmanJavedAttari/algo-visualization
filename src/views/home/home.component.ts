import { data } from '@/data';
import { delay, resolveObjPath } from '@/globals';
import { AlgoOptionsModel } from '@/models';
import { SortService } from '@/services';
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
  let t0 = 0;
  let t1 = 0;
  if (algoOps.Algo === 'Bubble Sort') {
    t0 = performance.now();
    sortSrv.bubbleSort(arr);
    t1 = performance.now();
  } else if (algoOps.Algo === 'Insertion Sort') {
    t0 = performance.now();
    sortSrv.insertionSort(arr);
    t1 = performance.now();
  } else if (algoOps.Algo === 'Selection Sort') {
    t0 = performance.now();
    sortSrv.selectionSort(arr);
    t1 = performance.now();
  } else if (algoOps.Algo === 'Merge Sort') {
    t0 = performance.now();
    sortSrv.mergeSort(arr);
    t1 = performance.now();
  } else if (algoOps.Algo === 'Count Sort') {
    t0 = performance.now();
    sortSrv.countSort(arr, 0, +algoOps.ValueOfN!);
    t1 = performance.now();
  } else if (algoOps.Algo === 'Quick Sort') {
    t0 = performance.now();
    sortSrv.quickSort(arr, 0, arr.length - 1);
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

  const time = callAlgo(arr);

  // Assign results
  const { Algo } = algoOps;
  results[Algo!] = {
    ...results[Algo!],
    [+algoOps.ValueOfN!]: {
      ...(results[Algo!] ? results[Algo!][+algoOps.ValueOfN!] : {}),
      [algoOps.Case!]: time
    }
  };

  // Hide loading
  loading.value = false;
};

const updateChart = () => {
  N_VALUES.forEach(n => {
    const chart = (document.getElementById(
      `chart-${n}-bar`
    ) as HTMLCanvasElement).getContext('2d')!;
    new Chart(chart, {
      type: 'bar',
      data: {
        labels: ALGOS,
        datasets: Object.entries({
          Best: 'green',
          Average: 'blue',
          Worst: 'red'
        }).map(([key, value]) => ({
          label: key,
          backgroundColor: value,
          data: Object.keys(data).reduce((acc: Array<number>, curr) => {
            acc.push(+getTime(`${curr}.${n}.${key}`));
            return acc;
          }, [])
        }))
      },
      options: {
        title: {
          display: true,
          text: `Bar Chart for N = ${n}`
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
  N_VALUES.forEach(n => {
    const chart = (document.getElementById(
      `chart-${n}-line`
    ) as HTMLCanvasElement).getContext('2d')!;
    new Chart(chart, {
      type: 'line',
      data: {
        labels: ALGOS,
        datasets: Object.entries({
          Best: 'green',
          Average: 'blue',
          Worst: 'red'
        }).map(([key, value]) => ({
          label: key,
          borderColor: value,
          backgroundColor: 'transparent',
          data: Object.keys(data).reduce((acc: Array<number>, curr) => {
            acc.push(+getTime(`${curr}.${n}.${key}`));
            return acc;
          }, [])
        }))
      },
      options: {
        title: {
          display: true,
          text: `Line Chart for N = ${n}`
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
