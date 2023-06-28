async function getData() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbxfKYenkGNxchOPPRYeq50C42GBpa6WjRWDiuZDbwEfUm6QlKZkpPnmVVqhrKyxLgc7/exec"
  );
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <div>{data[0]["지점명"]}</div>;
}
