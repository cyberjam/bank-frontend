import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";
import { createFuzzyMatcher } from "./utils/fuzzyMatcher";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();
  const [searchBankInfos, setSearchBankInfos] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
      );

      if (!response.ok) {
        throw new Error("데이터를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      setBankInfos(data);
    } catch (error) {
      alert(
        `데이터 로딩에 실패하였습니다. 새로고침 하더라도 문제가 있다면 에러메세지와 함께 문의주세요 : ${error.message}`
      );
      console.log(`데이터 요청 오류: ${error.message}`);
    }
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
      <form onSubmit={handleSearch}>
        <input
          value={targetBank}
          onChange={handleInputBank}
          disabled={bankInfos.length ? "" : "disabled"}
          placeholder={bankInfos.length ? "" : "실시간 데이터 로딩중 :)"}
        ></input>

        <button type="submit">검색</button>
      </form>
      {targetBankInfo ? (
        <></>
      ) : (
        searchBankInfos.map((item, index) => (
          <ul
            key={index}
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
