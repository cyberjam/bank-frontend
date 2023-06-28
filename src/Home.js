import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";

function Home() {
  const [bankInfos, setBankInfos] = useState();
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();

  const handleTargetBank = ({ target: { value } }) => setTargetBank(value);

  const getData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );
    const data = await response.json();
    setBankInfos(data);
  };
  const onSearch = (event) => {
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
        <input onChange={handleTargetBank}></input>
        <button type="submit" onClick={onSearch}>
          검색
        </button>
      </form>

      {targetBankInfo ? <BankInfo bankInfo={targetBankInfo}></BankInfo> : <></>}
    </div>
  );
}

export default Home;
