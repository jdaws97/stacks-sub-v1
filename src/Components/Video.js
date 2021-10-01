import React, { useState, useEffect } from "react";
import video from "../videos/stacks-sub.webm";
import {
  connectWebSocketClient,
  Configuration,
  AccountsApi,
} from "@stacks/blockchain-api-client";
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  bufferCVFromString,
} from "@stacks/transactions";

import { userSession } from "./Authenticate";

export const Video = () => {
  const [nftEventNumber, setNftEventNumber] = useState("");
  // state variable used to determine if the contract exists in your wallet,
  // if it does it executes the proper return of the Video component //
  const [nftContract, setNftContract] = useState(false);

  // states used to store whether youre signed in (bool), your wallets contents, and wallet address //
  const [state, setState] = useState(null);
  const [address, setAddress] = useState("");
  const [assets, setAssets] = useState([]);
  const [bool, setBool] = useState(false);

  // signs out of your stacks wallet //
  const handleSignOut = (e) => {
    e.preventDefault();
    setState(null);
    userSession.signUserOut(window.location.origin);
    setBool(false);
  };

  // const mintNFT = (e) => {
  //   e.preventDefault();
  //   const txOptions = {
  //     contractAddress: "ST24N7TE9635H3RXT9Q0M9YNZE2DQZ9RW43RQCNBG",
  //     contractName: "subcoin",
  //     functionName: "mint",
  //     functionArgs: [{ address }],
  //   };
  // };

  const fetchAssets = async () => {
    const apiConfig = new Configuration({
      fetchApi: fetch,
      basePath: "https://stacks-node-api.testnet.stacks.co",
    });

    const accountsApi = new AccountsApi(apiConfig);

    const txs = await accountsApi.getAccountNft({
      principal: address,
    });

    const cleanTxs = txs.nft_events;

    // Checks if the nft events object is empty, if it is it doesnt run through and check for the contract //
    //  If it's not empty, it checks for the specific NFT contract and if its owned //
    if (Object.keys(cleanTxs).length !== 0) {
      if (
        cleanTxs.filter(
          (e) =>
            e.asset_identifier ==
            "ST24N7TE9635H3RXT9Q0M9YNZE2DQZ9RW43RQCNBG.subcoin::SubCoin"
        )
      ) {
        const findContract = cleanTxs.filter(
          (e) =>
            e.asset_identifier ==
            "ST24N7TE9635H3RXT9Q0M9YNZE2DQZ9RW43RQCNBG.subcoin::SubCoin"
        );
        const findValueTx = findContract.filter((e) => e.value.repr == "u1");

        const mapValueTx = findValueTx.map((e) => e.value);
        //const findReprNumber = mapValueTx.find((e) => e.repr == "u1");
        //const reprNumber = findReprNumber.repr;

        setAssets(txs);
        setNftContract(true);
        //setNftEventNumber(reprNumber);
      }
    } else {
      setNftEventNumber(null);
    }
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setState(userData);
        setState(userData.profile.stxAddress.testnet);
      });
    } else if (userSession.isUserSignedIn()) {
      const state = userSession.loadUserData();
      const address = state.profile.stxAddress.testnet;
      setState(userSession.loadUserData());
      setAddress(address);
      setBool(true);
    }

    if (bool) {
      fetchAssets();
    }
  }, [address]);

  if (nftContract) {
    return (
      //console.log(nftEventNumber),
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
        <video height="400px" controls>
          <source src={video} />
        </video>
        <h3>Your Address: {address}</h3>
      </div>
    );
  } else {
    return (
      console.log(assets),
      (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <h1>Access Blocked</h1>
          <h3>Your Address: {address}</h3>
        </div>
      )
    );
  }
};
