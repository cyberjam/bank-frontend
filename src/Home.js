import React, { useState, useEffect } from "react";
import fetchBankData from "./api/fetchBankData";
import BankInput from "./components/BankInput";
import BankSearchList from "./components/BankSearchList";
import BankInfo from "./components/BankInfo";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [targetBank, setTargetBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();

  useEffect(() => {
    const fetchBankInfos = async () => {
      setBankInfos(await fetchBankData());
    };
    fetchBankInfos();
  }, []);

  useEffect(() => {
    setTargetBankInfo();
  }, [targetBank]);

  return (
    <div>
      <BankInput
        bankInfos={bankInfos}
        targetBank={targetBank}
        setTargetBank={setTargetBank}
      ></BankInput>
      {targetBankInfo ? (
        <BankInfo targetBankInfo={targetBankInfo}></BankInfo>
      ) : (
        <BankSearchList
          bankInfos={bankInfos}
          targetBank={targetBank}
          setTargetBankInfo={setTargetBankInfo}
        ></BankSearchList>
      )}
    </div>
  );
}

export default Home;
