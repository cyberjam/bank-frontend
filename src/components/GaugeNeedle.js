/* eslint-disable no-unused-vars */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GaugeNeedle({
  indicatorName,
  targetBankInfo,
  indicatorUnit,
  gaugeLabelColorOrder,
  gaugeLabelData,
}) {
  const data = {
    labels: ["Red", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: gaugeLabelData,
        backgroundColor: gaugeLabelColorOrder,
        needleValue: targetBankInfo[indicatorName],
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
    afterDatasetsDraw: (chart, args, pluginOptions) => {
      const {
        ctx,
        config,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      const getAngle = (dataTotal, needleValue) => {
        const angleOrigin = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
        const angleMax = Math.PI + (1 / dataTotal) * dataTotal * Math.PI;
        return angleOrigin > angleMax ? angleMax : angleOrigin;
      };
      const needleValue = data.datasets[0].needleValue;
      const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
      const angle = getAngle(dataTotal, needleValue);
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

      // needle dot
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 10);
      ctx.fill();
      ctx.restore();

      ctx.font = "20px Helvetica";
      ctx.fillStyle = "#444";
      ctx.fillText(
        `${indicatorName} : ${needleValue}${indicatorUnit}`,
        cx,
        cy + 50
      );
      ctx.textAlign = "center";
      ctx.restore();
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} plugins={[gaugeNeedle]} />
    </div>
  );
}

export default GaugeNeedle;
