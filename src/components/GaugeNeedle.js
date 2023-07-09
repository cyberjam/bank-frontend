/* eslint-disable no-unused-vars */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GaugeNeedle({
  indicatorName,
  targetBankInfo,
  indicatorUnit,
  labelOrder,
  gaugeLabelData,
}) {
  const gaugeColor = {
    RED: "rgba(255, 99, 132, 1)",
    YELLOW: "rgba(255, 206, 86, 1)",
    GREEN: "rgba(75, 192, 192, 1)",
  };

  const ladels = ["위험 구간", "주의 구간", "안전 구간"];

  const data = {
    labels: labelOrder ? ladels : ladels.reverse(),
    datasets: [
      {
        label: "# of Votes",
        data: gaugeLabelData,
        backgroundColor: labelOrder
          ? Object.values(gaugeColor)
          : Object.values(gaugeColor).reverse(),
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
      legend: { display: true, position: "bottom", onClick: null },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data, value) {
            const labelData = tooltipItem.dataset.data;
            return (
              "구간 기준: " +
              labelData.reduce(
                (acc, curr) => [
                  acc[0] + `${acc[1] + curr}${indicatorUnit} `,
                  acc[1] + curr,
                ],
                ["", 0]
              )[0]
            );
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
