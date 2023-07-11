import React from "react";

function BankInput({ bankInfos, inputBank, setInputBank }) {
  const handleInputBank = (event) => {
    setInputBank(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputBank}
        onChange={handleInputBank}
        disabled={bankInfos.length ? "" : "disabled"}
        placeholder={bankInfos.length ? "" : "실시간 데이터 로딩중 :)"}
      ></input>
    </form>
  );
}

export default BankInput;
