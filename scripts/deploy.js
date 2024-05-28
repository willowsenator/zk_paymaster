import { Provider, types, Wallet, ContractFactory } from "zksync-ethers";
import paymasterJson from "../artifacts/Paymaster.json" assert { type: "json" };

const { abi, bin: bytecode } = paymasterJson.contracts["contracts/Paymaster.sol:Paymaster"];

const provider = Provider.getDefaultProvider(types.Network.Sepolia); // zkSync Era testnet (L2)

const wallet = new Wallet("af2dd157c6cc28711784a1e50da443947113990055c28e630fb0e9d40c0db087", provider);

(async () => {
    const cf = new ContractFactory(abi, bytecode, wallet);
    const result = await cf.deploy();
    const contract = await result.waitForDeployment();
    console.log(await contract.getAddress());
})();