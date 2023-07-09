import React from "react";
import GaugeNeedle from "./GaugeNeedle";

function BankInfo({ targetBankInfo }) {
  const gaugeColor = {
    RED: "rgba(255, 99, 132, 1)",
    YELLOW: "rgba(255, 206, 86, 1)",
    GREEN: "rgba(75, 192, 192, 1)",
  };

  const gaugeLabelColorOrder = Object.values(gaugeColor);
  return (
    <div>
      <div>{targetBankInfo["행정구역"]} 소재, 2022년 12월 기준</div>
      {/* <div>{bankInfo["위험가중자산대비 자기자본비율"]}</div> */}
      <GaugeNeedle
        indicatorName={"위험가중자산대비 자기자본비율"}
        bankInfo={targetBankInfo}
        indicatorUnit={"%"}
        gaugeLabelColorOrder={gaugeLabelColorOrder}
        gaugeLabelData={[4, 4, 8]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"순고정이하 여신비율"}
        bankInfo={targetBankInfo}
        indicatorUnit={"%"}
        gaugeLabelColorOrder={[...gaugeLabelColorOrder].reverse()}
        gaugeLabelData={[8, 4, 4]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"유동성 비율"}
        bankInfo={targetBankInfo}
        indicatorUnit={"%"}
        gaugeLabelColorOrder={gaugeLabelColorOrder}
        gaugeLabelData={[25, 25, 50]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"총자산 순이익률"}
        bankInfo={targetBankInfo}
        indicatorUnit={"%"}
        gaugeLabelColorOrder={gaugeLabelColorOrder}
        gaugeLabelData={[0.5, 0.5, 1]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"경영실태 평가"}
        bankInfo={targetBankInfo}
        indicatorUnit={"등급"}
        gaugeLabelColorOrder={[...gaugeLabelColorOrder].reverse()}
        gaugeLabelData={[2.5, 1.25, 1.25]}
      ></GaugeNeedle>
    </div>
  );
}

export default BankInfo;
