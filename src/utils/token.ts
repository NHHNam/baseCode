import JWT from "jsonwebtoken";
import crypto from "crypto";

const createDoubleKeys = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return { privateKey, publicKey };
};

const createDoubleTokens = async ({
  payload,
  privateKey,
  publicKey,
}: {
  payload: any;
  privateKey: string;
  publicKey: crypto.KeyObject;
}) => {
  const accessToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  const refreshToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "30d",
  });

  // Check AT have valid
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else console.log(`accessToken decode success`);
  });

  JWT.verify(refreshToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else console.log(`refreshToken decode success`);
  });

  return { accessToken, refreshToken };
};

export { createDoubleKeys, createDoubleTokens };
