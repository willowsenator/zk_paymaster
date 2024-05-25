import { Provider, types, Wallet } from "zksync-ethers";
import { getPaymasterParams } from "zksync-ethers/build/paymaster-utils.js";

const provider = Provider.getDefaultProvider(types.Network.Sepolia); // zkSync Era testnet (L2)
const paymasterAddr = "0xF7698675b891E1361f6E059654fed3998dBD469D";

const wallet = new Wallet("7015629db7f2f25a9860d74c998840264324ae9a1264a4e74f88a5b42836524f", provider);

console.log(wallet.address);

(async () => {
    console.log(await wallet.getBalance());
    const paymasterParams = getPaymasterParams(paymasterAddr, {
        type: "General",
        innerInput: new Uint8Array(),
    });

    const tx = await wallet.sendTransaction({
        data: "0x1337",
        to: "0xf7698675B891E1361f6e059654FeD3998DBd469e",
        customData: {
            paymasterParams,
        },
    });
    console.log(tx);
})();
