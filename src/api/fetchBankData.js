const fetchBankData = async () => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
    );

    if (!response.ok) {
      throw new Error("데이터를 가져오는데 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(
      `데이터 로딩에 실패하였습니다. 새로고침 하더라도 문제가 있다면 에러메세지와 함께 문의주세요 : ${error.message}`
    );
    console.log(`데이터 요청 오류: ${error.message}`);
  }
};

export default fetchBankData;
