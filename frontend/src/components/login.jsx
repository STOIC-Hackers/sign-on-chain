// import { Web3Provider } from "@ethersproject/providers";
// import { useWeb3React } from "@web3-react/core";
// import React, { useEffect, useState } from "react";
// import useAuth from './useAuth'

// const Login = () => {
//     // const { setIsUserLoggedIn } = props;
//     const [userLoggedIn, setIsUserLoggedIn] = useState(false)
//     const { ethereum } = window;
//     const { login } = useAuth();
//     const { account } = useWeb3React();

//     const connectWallet = () => {
//         try {
//             login(1);
//             localStorage.setItem("connectorId", JSON.stringify(1));
//             if (account) {
//                 setIsUserLoggedIn(true);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         if (account) {
//             setIsUserLoggedIn(true);
//         }
//     }, [account]);

//     const openLinkInNewTab = (url) => {
//         window.open(url, "_blank");
//     };
//     return (
//         <div className="darkBg">
//             <div className="centered">
//                 <h1>Welcome to Orasis</h1>
//                 {ethereum ? (
//                     <p>Please connect with wallet</p>
//                 ) : (
//                     <p>Please install metamask wallet</p>
//                 )}
//                 {ethereum ? (
//                     <button onClick={connectWallet}>
//                         <div className="connectBtnBody">
//                             <img alt="Wallet icon" />
//                             <span>CONNECT WALLET</span>
//                         </div>
//                     </button>
//                 ) : (
//                     <button onClick={() => openLinkInNewTab("https://metamask.io/")}>
//                         <div className="connectBtnBody">
//                             <img

//                                 // src={require("../../../assets/icons/wallet.svg").default}
//                                 alt="Wallet icon"
//                             />
//                             <span>Install Metamask</span>
//                         </div>
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Login;