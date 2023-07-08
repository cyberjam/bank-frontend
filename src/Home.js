import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";
import { createFuzzyMatcher } from "./utils/fuzzyMatcher";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();
  const [searchBankInfos, setSearchBankInfos] = useState([]);

  const getData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );
    const data = await response.json();
    setBankInfos(data);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const target = bankInfos.filter(
      (bankInfo) => bankInfo["지점명"] === targetBank
    )[0];
    setTargetBankInfo(target);
  };

  const handleInputBank = (event) => {
    setTargetBank(event.target.value);
  };

  const handleList = (value) => {
    setTargetBank(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (bankInfos) {
      setSearchBankInfos(
        bankInfos.filter((bankInfo) => {
          const searchWord = bankInfo["지점명"] + bankInfo["행정구역"];
          return searchWord.match(createFuzzyMatcher(targetBank));
        })
      );
    }
  }, [targetBank]);

  return (
    <div>
      <form>
        <input
          value={targetBank}
          onChange={handleInputBank}
          disabled={bankInfos.length ? "" : "disabled"}
          placeholder={bankInfos.length ? "" : "실시간 데이터 로딩중 :)"}
        ></input>

        <button type="submit" onClick={handleSearch}>
          검색
        </button>
      </form>
      {targetBankInfo ? (
        <></>
      ) : (
        searchBankInfos.map((item) => (
          <ul
            onClick={(event) => {
              handleList(item["지점명"]);
              handleSearch(event);
            }}
          >
            [{item["행정구역"]}] {item["지점명"]} 새마을금고
          </ul>
        ))
      )}
      {targetBankInfo ? <BankInfo bankInfo={targetBankInfo}></BankInfo> : <></>}
    </div>
  );
}

export default Home;
