/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GaugeNeedle({
  indicatorName,
  bankInfo,
  indicatorUnit,
  gaugeLabelColorOrder,
  gaugeLabelData,
}) {
  const [data, setData] = useState({
    labels: ["Red", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: gaugeLabelData,
        backgroundColor: gaugeLabelColorOrder,
        needleValue: bankInfo[indicatorName],
        borderColor: "white",
        borderWidth: 2,
        cutout: "95%",
        circumference: 180,
        rotation: 270,
        borderRadius: 5,
      },
    ],
  });
  const [options, setOptions] = useState({
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
  });
  let gaugeNeedle = {
    id: "gaugeNeedle",
    beforeDatasetDraw: (chart, args, pluginOptions) => {
      const {
        ctx,
        config,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      const needleValue = bankInfo[indicatorName];

      const dataTotal = gaugeLabelData.reduce((a, b) => a + b, 0);
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

      ctx.font = "20px Helvetica";
      ctx.fillStyle = "#444";
      ctx.fillText(
        `${indicatorName} : ${needleValue}${indicatorUnit}`,
        cx,
        cy + 100
      );
      // ctx.fillText(indicatorName, cx, cy + 200);
      ctx.textAlign = "center";
      ctx.restore();
      chart.update();
    },
  };

  useEffect(() => {
    setData({
      labels: ["Red", "Yellow", "Green"],
      datasets: [
        {
          label: "# of Votes",
          data: gaugeLabelData,
          backgroundColor: gaugeLabelColorOrder,
          needleValue: bankInfo[indicatorName],
          borderColor: "white",
          borderWidth: 2,
          cutout: "95%",
          circumference: 180,
          rotation: 270,
          borderRadius: 5,
        },
      ],
    });

    setOptions({
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
    });
    let gaugeNeedle = {
      id: "gaugeNeedle",
      beforeDatasetDraw: (chart, args, pluginOptions) => {
        const {
          ctx,
          config,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;
        ctx.save();
        const needleValue = bankInfo[indicatorName];

        const dataTotal = gaugeLabelData.reduce((a, b) => a + b, 0);
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
        ctx.fillText(needleValue + indicatorUnit, cx, cy + 100);
        ctx.fillText(indicatorName, cx, cy + 200);
        ctx.textAlign = "center";
        ctx.restore();
        chart.update();
      },
    };
    console.log(gaugeNeedle);
  }, [bankInfo]);

  return (
    <div>
      {bankInfo && (
        <Doughnut data={data} options={options} plugins={[gaugeNeedle]} />
      )}
    </div>
  );
}

export default GaugeNeedle;
