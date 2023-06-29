/* eslint-disable no-unused-vars */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GaugeNeedle() {
  const data = {
    labels: ["Red", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: [18, 12, 6],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        needleValue: 12,
        borderColor: "white",
        borderWidth: 2,
        cutout: "95%",
        circumference: 180,
        rotation: 270,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, dada, value) {
            const tracker = tooltipItem.dataset.needleValue;
            return `Tracker Score: ${tracker} %`;
          },
        },
      },
    },
  };

  const gaugeNeedle = {
    id: "gaugeNeedle",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        config,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      const needleValue = data.datasets[0].needleValue;
      const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
      const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
      const cx = width / 2;
      const cy = chart._metasets[0].data[0].y;

      //needle
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(chart._metasets[0].data[0].outerRadius, 0);
      ctx.lineTo(0, 2);
      ctx.fillStyle = "#444";
      ctx.fill();
      // ctx.rotate(-angle);
      // ctx.restore();

      // needle dot
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 10);
      ctx.fill();
      ctx.restore();

      ctx.font = "60px Helvetica";
      ctx.fillStyle = "#444";
      ctx.fillText(needleValue + "%", cx, cy + 100);
      ctx.textAlign = "center";
      ctx.restore();
    },
  };
  return <Doughnut data={data} options={options} plugins={[gaugeNeedle]} />;
}

export default GaugeNeedle;
