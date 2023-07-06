import React, { useState, useEffect } from "react";
import BankInfo from "./BankInfo";
import { createFuzzyMatcher } from "./utils/fuzzyMatcher";

function Home() {
  const [bankInfos, setBankInfos] = useState();
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();
  const [inputState, setInputState] = useState(false);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(true);
  const [searchedData, setSearchData] = useState([]);

  const getData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );
    const data = await response.json();
    setBankInfos(data);
    setInputState(true);
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
    setSearch(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searching && search) {
      setSearching(false);
      setSearchData(
        bankInfos.filter((bankInfo) =>
          bankInfo["지점명"].match(createFuzzyMatcher(search))
        )
      );
    }
    if (searching && !search) {
      setSearchData([]);
    }
  }, [search]);

  return (
    <div>
      <form>
        {setInputState && (
          <input
            value={search}
            onChange={handleInputBank}
            disabled={inputState ? "" : "disabled"}
            placeholder={inputState ? "" : "실시간 데이터 로딩중"}
          ></input>
        )}
        <button type="submit" onClick={handleSearch}>
          검색
        </button>
      </form>
      {searchedData.map((item) => (
        <ul>{item["행정구역"]} {item["지점명"]}</ul>
      ))}
      {targetBankInfo ? <BankInfo bankInfo={targetBankInfo}></BankInfo> : <></>}
    </div>
  );
}

export default Home;
