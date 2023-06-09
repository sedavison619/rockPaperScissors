document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName.toLowerCase()}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data.computerThrows
  document.querySelector("#personStatus").textContent = data.whoWins
  //document.querySelector("#personOccupation").textContent = data.currentOccupation
}