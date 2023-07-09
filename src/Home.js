import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";
import fetchBankData from "./api/fetchBankData";
import BankSearchList from "./BankSearchList";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();

  const handleInputBank = (event) => {
    setTargetBank(event.target.value);
  };

  const handleSearchBank = (event) => {
    event.preventDefault();
    const target = bankInfos.filter(
      (bankInfo) => bankInfo["지점명"] === targetBank
    )[0];
    setTargetBankInfo(target);
  };

  useEffect(() => {
    const fetchBankInfos = async () => {
      const data = await fetchBankData();
      setBankInfos(data);
    };
    fetchBankInfos();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearchBank}>
        <input
          value={targetBank}
          onChange={handleInputBank}
          disabled={bankInfos.length ? "" : "disabled"}
          placeholder={bankInfos.length ? "" : "실시간 데이터 로딩중 :)"}
        ></input>

        <button type="submit">검색</button>
      </form>
      {targetBankInfo ? (
        <BankInfo bankInfo={targetBankInfo}></BankInfo>
      ) : (
        <BankSearchList
          bankInfos={bankInfos}
          targetBank={targetBank}
          setTargetBank={setTargetBank}
          handleSearchBank={handleSearchBank}
        ></BankSearchList>
      )}
    </div>
  );
}

export default Home;
