import React, { useState, useEffect } from "react";
import fetchBankData from "./api/fetchBankData";
import BankInput from "./components/BankInput";
import BankSearchList from "./components/BankSearchList";
import BankInfo from "./components/BankInfo";

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
        <BankInfo targetBankInfo={targetBankInfo}></BankInfo>
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
