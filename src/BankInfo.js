import React from "react";
import GaugeNeedle from "./GaugeNeedle";

function BankInfo({ bankInfo }) {
  return (
    <div>
      <div>행정구역 : {bankInfo["행정구역"]}</div>
      <div>지점명 : {bankInfo["지점명"]}</div>
      <div>
        위험가중자산대비 자기자본비율 :{" "}
        {bankInfo["위험가중자산대비 자기자본비율"]}
      </div>
      <div>순고정이하 여신비율 : {bankInfo["순고정이하 여신비율"]}</div>
      <div>유동성 비율 : {bankInfo["유동성 비율"]}</div>
      <div>총자산 순이익률 : {bankInfo["총자산 순이익률"]}</div>
      <div>경영실태 평가 : {bankInfo["경영실태 평가"]}</div>
      <GaugeNeedle />
    </div>
  );
}

export default BankInfo;
