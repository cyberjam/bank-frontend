import React from "react";

function BankInput({ bankInfos, targetBank, setTargetBank }) {
  const handleInputBank = (event) => {
    setTargetBank(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={targetBank}
        onChange={handleInputBank}
        disabled={bankInfos.length ? "" : "disabled"}
        placeholder={
          bankInfos.length
            ? "금고 이름을 입력해주세요"
            : "실시간 데이터 로딩중 :)"
        }
      ></input>
    </form>
  );
}

export default BankInput;
