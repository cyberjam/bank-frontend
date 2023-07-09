import React from "react";

function BankInput({ bankInfos, targetBank, setTargetBank, handleSearchBank }) {
  const handleInputBank = (event) => {
    setTargetBank(event.target.value);
  };
  return (
    <form onSubmit={handleSearchBank}>
      <input
        value={targetBank}
        onChange={handleInputBank}
        disabled={bankInfos.length ? "" : "disabled"}
        placeholder={bankInfos.length ? "" : "실시간 데이터 로딩중 :)"}
      ></input>

      <button type="submit">검색</button>
    </form>
  );
}

export default BankInput;
