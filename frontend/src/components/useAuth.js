// import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
// import {
//     InjectedConnector,
//     UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from "@web3-react/injected-connector";
// import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
// import { useCallback } from "react";
// import { chain_id, chain_id_in_hex, rpc_url } from "../config";
// import EventEmitter from "events";

// export const injected = new InjectedConnector({
//     supportedChainIds: [chain_id],
//     // supportedChainIds: [80001],
// });

// const ee = new EventEmitter()
// ee.on('message', function (text) {
//     console.log(text)
// })
// ee.emit('message', 'hello world')

// // var ee = new EventEmitter()
// // ee.on('message', function (text) {
// //   console.log(text)
// // })
// // ee.emit('message', 'hello world')

// const useAuth = () => {
//     // Web3ReactProvider()
//     const { activate, deactivate } = useWeb3React();
//     const { ethereum } = window;
//     let walletconnect;
//     const login = useCallback(
//         async (connectorID) => {
//             try {
//                 await ethereum.request({
//                     method: "wallet_switchEthereumChain",
//                     params: [{ chainId: chain_id_in_hex }],
//                     // params: [{ chainId: "0x13881" }],
//                 });
//             } catch (switchError) {
//                 // This error code indicates that the chain has not been added to MetaMask.
//                 if (switchError.code === 4902) {
//                     try {
//                         await ethereum.request({
//                             method: "wallet_addEthereumChain",
//                             params: [
//                                 {
//                                     chainId: chain_id_in_hex,
//                                     // chainId: "0x13881",
//                                     chainName: "Mumbai Testnet",
//                                     rpcUrls: [rpc_url],
//                                     // rpcUrls: ["https://rpc-mumbai.maticvigil.com/"] ,
//                                 },
//                             ],
//                         });
//                     } catch (addError) {
//                         // handle "add" error
//                         console.error(addError);
//                     }
//                 }
//                 // handle other "switch" errors
//                 console.error(switchError);
//             }

//             const selecWallet = (type) => {
//                 switch (type) {
//                     case 1:
//                         return injected;
//                 }
//             };
//             if (connectorID) {
//                 activate(selecWallet(connectorID), async (error) => {
//                     if (error instanceof UnsupportedChainIdError) {
//                         activate(selecWallet(connectorID));
//                     } else {
//                         if (
//                             error instanceof UserRejectedRequestErrorInjected ||
//                             error instanceof UserRejectedRequestErrorWalletConnect
//                         ) {
//                             walletconnect.walletConnectProvider = null;
//                         } else {
//                             console.error(error.name, error.message);
//                         }
//                     }
//                 });
//             }
//         },
//         [activate]
//     );

//     const logout = useCallback(() => {
//         deactivate();
//         localStorage.clear();
//         window.location.reload();
//         //@ts-ignore
//         const walletType = JSON.parse(localStorage.getItem("connectorId"));
//         if (walletType === 2) {
//             walletconnect.walletConnectProvider = null;
//         }
//     }, [deactivate]);

//     return { login, logout };
// };

// export default useAuth;

// import React from 'react';
// import { useWeb3React } from '@web3-react/core';

// const ConnectMetamask = () => {
//     const { active, account, activate } = useWeb3React();

//     const connectWallet = async () => {
//         try {
//             await activate('injected'); // 'injected' activates Metamask
//         } catch (error) {
//             console.error('Error connecting to wallet:', error);
//         }
//     };

//     return (
//         <div>
//             {active ? (
//                 <p>Connected with {account}</p>
//             ) : (
//                 <button onClick={connectWallet}>Connect Metamask</button>
//             )}
//         </div>
//     );
// };

// export default ConnectMetamask;