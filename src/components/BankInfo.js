import React from "react";
import GaugeNeedle from "./GaugeNeedle";

function BankInfo({ targetBankInfo }) {
  return (
    <div>
      <div>{targetBankInfo["행정구역"]} 소재, 2022년 12월 기준</div>
      <GaugeNeedle
        indicatorName={"위험가중자산대비 자기자본비율"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"%"}
        labelOrder={true}
        gaugeLabelData={[4, 4, 8]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"순고정이하 여신비율"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"%"}
        labelOrder={false}
        gaugeLabelData={[8, 4, 4]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"연체대출금비율"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"%"}
        labelOrder={false}
        gaugeLabelData={[2, 4, 6]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"유동성 비율"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"%"}
        labelOrder={true}
        gaugeLabelData={[25, 25, 50]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"총자산 순이익률"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"%"}
        labelOrder={true}
        gaugeLabelData={[0.5, 0.5, 1]}
      ></GaugeNeedle>
      <GaugeNeedle
        indicatorName={"경영실태 평가"}
        targetBankInfo={targetBankInfo}
        indicatorUnit={"등급"}
        labelOrder={false}
        gaugeLabelData={[2, 1, 2]}
      ></GaugeNeedle>
    </div>
  );
}

export default BankInfo;
