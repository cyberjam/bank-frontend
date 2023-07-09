import React, { useState, useEffect } from "react";
import BankInfo from "./components/BankInfo";
import fetchBankData from "./api/fetchBankData";
import BankSearchList from "./components/BankSearchList";
import BankInput from "./components/BankInput";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();

  const handleSearchBank = (event) => {
    event.preventDefault();
    setTargetBankInfo(
      bankInfos.find((bankInfo) => bankInfo["지점명"] === targetBank)
    );
  };

  useEffect(() => {
    const fetchBankInfos = async () => {
      setBankInfos(await fetchBankData());
    };
    fetchBankInfos();
  }, []);

  return (
    <div>
      <BankInput
        bankInfos={bankInfos}
        targetBank={targetBank}
        setTargetBank={setTargetBank}
        handleSearchBank={handleSearchBank}
      ></BankInput>
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
