import React, { useState, useEffect } from "react";

function Home() {
  const [bankInfo, setBankInfo] = useState();
  const getData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );
    const data = await response.json();
    setBankInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return bankInfo && <div>{bankInfo[0]["지점명"]}</div>;
}

export default Home;
