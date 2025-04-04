'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

function IdentityVerification() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  if (!userId) return null;

  const selfApp = new SelfAppBuilder({
    appName: "My Application",
    scope: "my-application-scope",
    endpoint: "https://c85b-111-235-226-130.ngrok-free.app/api/verify",
    logoBase64: "https://brown-implicit-bass-794.mypinata.cloud/ipfs/bafkreigft4zc4yica3i6bmgjwzklpxjkwcetbjaqpcvlubuc7cv7r4a5nu",
    userId,
    disclosures: {
      minimumAge: 18,
      nationality: true,
    },
  }).build();

  return (
    <div>
      <h1>Verify Your Identity</h1>
      <SelfQRcodeWrapper
        selfApp={selfApp}
        type='deeplink'
        darkMode={true}
        onSuccess={() => {
          console.log("Verification successful!");
          // Handle post-verification actions here
        }}
        size={350}
      />
    </div>
  );
}

export default IdentityVerification;
