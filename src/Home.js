import React, { useState, useEffect } from "react";

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

      {targetBankInfo ? (
        <div>
          <div>{targetBankInfo["행정구역"]}</div>
          <div>{targetBankInfo["지점명"]}</div>
          <div>{targetBankInfo["위험가중자산대비 자기자본비율"]}</div>
          <div>{targetBankInfo["순고정이하 여신비율"]}</div>
          <div>{targetBankInfo["유동성 비율"]}</div>
          <div>{targetBankInfo["총자산 순이익률"]}</div>
          <div>{targetBankInfo["경영실태 평가"]}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
