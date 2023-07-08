import React from "react";

function BankSearchList({
  searchBankInfos,
  handleSelectBank,
  handleSearchBank,
}) {
  return searchBankInfos.map((item, index) => (
    <ul
      key={index}
      onClick={(event) => {
        handleSelectBank(item["지점명"]);
        handleSearchBank(event);
      }}
    >
      [{item["행정구역"]}] {item["지점명"]} 새마을금고
    </ul>
  ));
}

export default BankSearchList;
