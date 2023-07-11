import React, { useState, useEffect } from "react";
import { createFuzzyMatcher } from "../utils/fuzzyMatcher";

function BankSearchList({ bankInfos, targetBank, setTargetBankInfo }) {
  const [searchBankInfos, setSearchBankInfos] = useState([]);
  const handleSelectBank = (bankCode) => {
    setTargetBankInfo(
      bankInfos.find((bankInfo) => bankInfo["지점코드"] === bankCode)
    );
  };

  useEffect(() => {
    if (bankInfos) {
      setSearchBankInfos(
        bankInfos.filter((bankInfo) =>
          (bankInfo["지점명"] + bankInfo["행정구역"]).match(
            createFuzzyMatcher(targetBank)
          )
        )
      );
    }
  }, [targetBank]);

  return searchBankInfos.map((item, index) => (
    <ul
      key={index}
      onClick={(event) => {
        handleSelectBank(item["지점명"], item["지점코드"]);
      }}
    >
      [{item["행정구역"]}] {item["지점명"]} 새마을금고
    </ul>
  ));
}

export default BankSearchList;
