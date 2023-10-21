const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const toDoList = await ToDoList.deploy();

  // Wait for the contract to be deployed before calling the deployed() function.
  await toDoList.deployed();

  console.log("TodoList with 1 Eth is deployed to:", toDoList.address);
  console.log(toDoList);
}

main().catch((error) => {
  console.error(error);
  process.exit(1); // Use process.exit(1) to indicate an error.
});