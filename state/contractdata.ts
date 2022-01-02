import React
import Web3 from "web3";
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/7ec3a8410d354058a323f5c73352e2c2"
  )
);
const ABI =
  require("../../artifacts/contracts/PrivacyPreserving.sol/PrivacyPreserving.json")[
    "abi"
  ];
const ADDRESS = "0x068729E25c1BEe3a67D0E3f2F9F47A351640D83C";
const MyContract = new web3.eth.Contract(ABI, ADDRESS);

export function getHashOfScans() {
  MyContract.methods.getHashOfScans().call().then(console.log);
}

export default function ContractData() {
    
}
