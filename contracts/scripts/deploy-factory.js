import hre from "hardhat";

async function main() {
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy the implementation contract first
  const Decentrad = await hre.ethers.getContractFactory("Decentrad");
  const decentradImpl = await Decentrad.deploy();
  await decentradImpl.waitForDeployment();
  console.log("Decentrad Implementation deployed to:", await decentradImpl.getAddress());

  // Set platform fee parameters
  const platformFeeAddress = "0xea1E1f713A370b374D317d519Fc6268CF7720294"; // Change this to desired fee recipient
  const platformFeesPercentInBPS = 300; // 3% (300 basis points)

  // Deploy the factory
  const DecentradFactory = await hre.ethers.getContractFactory("DecentradFactory");
  const factory = await DecentradFactory.deploy(
    await decentradImpl.getAddress(),
    platformFeeAddress,
    platformFeesPercentInBPS
  );
  await factory.waitForDeployment();
  
  console.log("DecentradFactory deployed to:", await factory.getAddress());
  console.log("Platform Fee Address:", platformFeeAddress);
  console.log("Platform Fees (BPS):", platformFeesPercentInBPS);

  // Verify contracts on Etherscan
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await decentradImpl.waitForDeployment();
    await factory.waitForDeployment();
    
    await verify(await decentradImpl.getAddress(), []);
    await verify(await factory.getAddress(), [
      await decentradImpl.getAddress(),
      platformFeeAddress,
      platformFeesPercentInBPS
    ]);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });