import React, { useEffect, useState } from "react";
import { Person } from "@stacks/profile";
import { Stxaddress } from "./Components/Stxaddress";
import video from "./videos/stacks-sub.webm";
import {
  connectWebSocketClient,
  Configuration,
  AccountsApi,
} from "@stacks/blockchain-api-client";
import { Video } from "./Components/Video";

import {
  getUserData,
  getPerson,
  Authenticate,
  userSession,
} from "./Components/Authenticate";
import { Signin } from "./Components/Signin";

const App = () => {
//   const [state, setState] = useState(null);
//   const [address, setAddress] = useState("");
//   const [assets, setAssets] = useState({});
//   const [bool, setBool] = useState(false);

//   const handleSignOut = (e) => {
//     e.preventDefault();
//     setState(null);
//     userSession.signUserOut(window.location.origin);
//     setBool(false);
//   };

//   const fetchAssets = async () => {
//     const apiConfig = new Configuration({
//       fetchApi: fetch,
//       basePath: "https://stacks-node-api.testnet.stacks.co",
//     });

//     const accountsApi = new AccountsApi(apiConfig);

//     const txs = await accountsApi.getAccountNft({
//       principal: address,
//     });
//     setAssets(txs);
//   };

//   useEffect(() => {
//     if (userSession.isSignInPending()) {
//       userSession.handlePendingSignIn().then((userData) => {
//         window.history.replaceState({}, document.title, "/");
//         setState(userData);
//         setState(userData.profile.stxAddress.testnet);
//       });
//     } else if (userSession.isUserSignedIn()) {
//       const state = userSession.loadUserData();
//       const address = state.profile.stxAddress.testnet;
//       setState(userSession.loadUserData());
//       setAddress(address);
//       setBool(true);
//     }

//     if (bool) {
//       fetchAssets();
//     }
//   }, [bool]);

  return (
    //console.log(assets),
    <div>
      
      <h1>Welcome!</h1>
      <Signin />
      
      <Video />
    </div>
  );
};

export default App;
