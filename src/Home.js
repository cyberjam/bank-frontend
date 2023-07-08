import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";
import { createFuzzyMatcher } from "./utils/fuzzyMatcher";

function Home() {
  const [bankInfos, setBankInfos] = useState();
  const [targetBank, setTargetBank] = useState();
  const [targetBankInfo, setTargetBankInfo] = useState();

  const [searching, setSearching] = useState(true);
  const [searchedData, setSearchData] = useState([]);

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

  const handleInputBank = ({ target: { value } }) => {
    setSearching(true);
    setTargetBank(value);
  };

  const handleList = (value) => {
    setTargetBank(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searching && targetBank) {
      setSearching(false);
      setSearchData(
        bankInfos
          .filter((bankInfo) =>
            bankInfo["지점명"].match(createFuzzyMatcher(targetBank))
          )
          .concat(
            bankInfos.filter((bankInfo) =>
              bankInfo["행정구역"].match(createFuzzyMatcher(targetBank))
            )
          )
      );
    }
    if (searching && !targetBank) {
      setSearchData([]);
    }
  }, [targetBank]);

  return (
    <div>
      <form>
        <input
          value={targetBank}
          onChange={handleInputBank}
          disabled={bankInfos ? "" : "disabled"}
          placeholder={bankInfos ? "" : "실시간 데이터 로딩중 :)"}
        ></input>

        <button type="submit" onClick={handleSearch}>
          검색
        </button>
      </form>
      {targetBankInfo ? (
        <></>
      ) : (
        searchedData.map((item) => (
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
