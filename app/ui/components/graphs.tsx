"use client";
import BarChart from "./bar_graph";
import {
  mergeSort,
  generateRandomNumbers,
  insertionSort,
  bubbleSort,
  quickSort,
} from "@/app/lib/array";
import { ChangeEvent, useState } from "react";

export default function Graphs() {
  const [arrLength, setArrLength] = useState(150);
  const [state, setState] = useState("complete");
  const [yValues, setYValues] = useState(generateRandomNumbers(arrLength));
  const [mergeArray, setMergeArray] = useState([...yValues]);
  const [insertArray, setInsertArray] = useState([...yValues]);
  const [bubbleArray, setBubbleArray] = useState([...yValues]);
  const [quickArray, setQuickArray] = useState([...yValues]);

  const handleGenerate = () => {
    const newArray = generateRandomNumbers(arrLength);
    setYValues([...newArray]);
    setMergeArray([...newArray]);
    setInsertArray([...newArray]);
    setBubbleArray([...newArray]);
    setQuickArray([...newArray]);
  };

  const handleSort = async () => {
    setState("inprogress");
    const arrayCopy = [...yValues];
    await Promise.allSettled([
      mergeSort([...yValues], 0, arrayCopy.length, setMergeArray),
      insertionSort([...yValues], setInsertArray),
      bubbleSort([...yValues], setBubbleArray),
      quickSort([...yValues], 0, arrayCopy.length - 1, setQuickArray),
    ]);
    setState("complete");
  };

  function handleLengthChange(event: ChangeEvent<HTMLInputElement>): void {
    setArrLength(Number(event.target.value));
  }

  return (
    <div className="h-screen">
      <div className="h-min flex flex-wrap justify-center pt-6 gap-4">
        <input
          className="bg-blue-950 basis-1/5"
          onChange={handleLengthChange}
          defaultValue={arrLength}
          disabled={state === "inprogress"}
        ></input>
        <button
          className="bg-blue-950 basis-1/5"
          onClick={handleSort}
          disabled={state === "inprogress"}
        >
          Sort
        </button>
        <button
          className="bg-blue-950 basis-1/5"
          onClick={handleGenerate}
          disabled={state === "inprogress"}
        >
          Generate New Array
        </button>
      </div>
      <div className="grid gap-4 grid-cols-2 px-4">
        <div className="">
          <BarChart yValues={mergeArray} color="blue" algorithm="Merge Sort" />
        </div>
        <div className="">
          <BarChart
            yValues={insertArray}
            color="orange"
            algorithm="Insertion Sort"
          />
        </div>
        <div className="">
          <BarChart yValues={bubbleArray} color="red" algorithm="Bubble Sort" />
        </div>
        <div className="">
          <BarChart yValues={quickArray} color="green" algorithm="Quick Sort" />
        </div>
      </div>
    </div>
  );
}
