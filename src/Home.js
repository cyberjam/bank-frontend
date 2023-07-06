import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";

function Home() {
  const [bankInfos, setBankInfos] = useState();
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();
  const [inputState, setInputState] = useState(false);

  const getData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );
    const data = await response.json();
    setBankInfos(data);
    setInputState(true);
  };

  const handleTargetBank = ({ target: { value } }) => setTargetBank(value);

  const handleSearch = (event) => {
    event.preventDefault();
    const target = bankInfos.filter(
      (bankInfo) => bankInfo["지점명"] === targetBank
    )[0];
    setTargetBankInfo(target);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <form>
        {setInputState && (
          <input
            onChange={handleTargetBank}
            disabled={inputState ? "" : "disabled"}
            placeholder={inputState ? "" : "실시간 데이터 로딩중"}
          ></input>
        )}
        <button type="submit" onClick={handleSearch}>
          검색
        </button>
      </form>

      {targetBankInfo ? <BankInfo bankInfo={targetBankInfo}></BankInfo> : <></>}
    </div>
  );
}

export default Home;
