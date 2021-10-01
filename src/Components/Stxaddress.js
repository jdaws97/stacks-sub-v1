import React, { useState } from "react";

export const Stxaddress = () => {
  const [address, setAddress] = useState("");

  //   if (personSession().isSignInPending()) {
  //     personSession()
  //       .handlePendingSignIn()
  //       .then((userData) => {
  //         setAddress(userData.profile.Stxaddress.testnet);
  //       });
  //   } else if (personSession().isUserSignedIn()) {
  //     setAddress(personSession().profile.Stxaddress.testnet);
  //   } else {
  //     setAddress("No Address");
  //   }

  return (
    <div>
      <h1>{address}</h1>
    </div>
  );
};
