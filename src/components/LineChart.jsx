import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

export default function LineChart(props) {
  const { tododata, selectDate } = props;
  const chartRef = useRef(null);

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Title
  );

  const labels = Array(
    new Date(selectDate.getFullYear(), selectDate.getMonth() + 1, 0).getDate()
  )
    .fill()
    .map((_, index) => index + 1);

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "未達成",
        borderColor: "lightgray",
        borderWidth: 2,
        fill: false,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "作業中",
        borderColor: "skyblue",
        borderWidth: 2,
        fill: false,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "達成済",
        borderColor: "lightgreen",
        borderWidth: 2,
        fill: false,
        yAxisID: "y",
      },
    ],
  };

  let undoneArray = Array(labels.length).fill(0);
  let progressArray = Array(labels.length).fill(0);
  let doneArray = Array(labels.length).fill(0);

  tododata.forEach((item) => {
    const date = new Date(item.date);
    if (date.getMonth() === selectDate.getMonth()) {
      if (item.status === "undone") {
        undoneArray[date.getDate() - 1] += 1;
      } else if (item.status === "progress") {
        progressArray[date.getDate() - 1] += 1;
      } else {
        doneArray[date.getDate() - 1] += 1;
      }
    }
  });

  useEffect(() => {
    chartRef.current.data.datasets[0].data = undoneArray;
    chartRef.current.data.datasets[1].data = progressArray;
    chartRef.current.data.datasets[2].data = doneArray;

    chartRef.current.update();
  }, [tododata, selectDate]);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        position: "left",
        max: 10,
        min: 0,
      },
    },
  };

  return (
    <div>
      {tododata.length !== 0 && (
        <div>
          <div style={{ textAlign: "center", fontSize: "15px" }}>
            {selectDate.getFullYear() +
              "年" +
              (selectDate.getMonth() + 1) +
              "月"}
          </div>
          <Chart ref={chartRef} type={"bar"} data={data} options={options} />
        </div>
      )}
    </div>
  );
}
