import React, { useState, useEffect } from "react";
import fetchBankData from "./api/fetchBankData";
import BankInput from "./components/BankInput";
import BankSearchList from "./components/BankSearchList";
import BankInfo from "./components/BankInfo";

function Home() {
  const [bankInfos, setBankInfos] = useState([]);
  const [inputBank, setInputBank] = useState("");
  const [targetBankInfo, setTargetBankInfo] = useState();

  useEffect(() => {
    const fetchBankInfos = async () => {
      setBankInfos(await fetchBankData());
    };
    fetchBankInfos();
  }, []);

  useEffect(() => {
    setTargetBankInfo();
  }, [inputBank]);

  return (
    <div>
      <BankInput
        bankInfos={bankInfos}
        inputBank={inputBank}
        setInputBank={setInputBank}
      ></BankInput>
      {targetBankInfo ? (
        <BankInfo targetBankInfo={targetBankInfo}></BankInfo>
      ) : (
        <BankSearchList
          bankInfos={bankInfos}
          inputBank={inputBank}
          setTargetBankInfo={setTargetBankInfo}
        ></BankSearchList>
      )}
    </div>
  );
}

export default Home;
