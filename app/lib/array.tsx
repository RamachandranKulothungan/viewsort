import { Dispatch, SetStateAction } from "react";

const sleepInt = 1;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomNumbers = (arrLength: number): number[] => {
  return Array.from(
    { length: arrLength },
    () => Math.floor(Math.random() * 50) + 1
  );
};

export const mergeSort = async (
  array: number[],
  start: number,
  end: number,
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  if (end - start <= 1) return;

  const mid = Math.floor((start + end) / 2);

  await mergeSort(array, start, mid, setArr); // Sort left half
  await mergeSort(array, mid, end, setArr); // Sort right half

  const left = array.slice(start, mid);
  const right = array.slice(mid, end);

  const merge = async (
    array: number[],
    left: number[],
    right: number[],
    start: number,
    setArr: Dispatch<SetStateAction<number[]>>
  ) => {
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length || j < right.length) {
      if (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          array[k] = left[i];
          i++;
        } else {
          array[k] = right[j];
          j++;
        }
        k++;
        setArr([...array]);
        await sleep(sleepInt);
      } else if (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
        setArr([...array]);
        await sleep(sleepInt);
      } else if (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
        setArr([...array]);
        await sleep(sleepInt);
      }
    }
  };

  await merge(array, left, right, start, setArr); // Merge and update the original array
};

export const quickSort = async (
  array: number[],
  start: number,
  end: number,
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  if (end - start <= 1) return;

  const partition = async (
    array: number[],
    left: number,
    right: number,
    setArr: Dispatch<SetStateAction<number[]>>
  ) => {
    var i = left;
    var j = right;
    while (true) {
      console.log(array[i], i, array[j], j);
      while (i < j && array[i] <= array[j]) {
        j = j - 1;
      }
      if (i == j) {
        break;
      }
      [array[i], array[j]] = [array[j], array[i]];
      setArr([...array]);
      await sleep(sleepInt);

      while (i < j && array[i] <= array[j]) {
        i = i + 1;
      }
      if (i == j) {
        break;
      }
      [array[i], array[j]] = [array[j], array[i]];
      setArr([...array]);
      await sleep(sleepInt);
    }
    await sleep(sleepInt);
    return i;
  };

  const mid = await partition(array, start, end, setArr);

  await quickSort(array, start, mid, setArr);
  await quickSort(array, mid + 1, end, setArr);
};

export const insertionSort = async (
  array: number[],
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  for (var i = 0; i < array.length - 1; i++) {
    var minimum_index = i;
    for (var j = i; j < array.length; j++) {
      await sleep(sleepInt);
      if (array[j] < array[minimum_index]) {
        minimum_index = j;
      }
    }
    [array[i], array[minimum_index]] = [array[minimum_index], array[i]];
    setArr([...array]);
  }
};

export const bubbleSort = async (
  array: number[],
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  for (var i = array.length - 1; i > 0; i--) {
    var maximum_index = i;
    for (var j = i; j > -1; j--) {
      await sleep(sleepInt);
      if (array[j] > array[maximum_index]) {
        maximum_index = j;
      }
    }
    [array[i], array[maximum_index]] = [array[maximum_index], array[i]];
    setArr([...array]);
  }
};
