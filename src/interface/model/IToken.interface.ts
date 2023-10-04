export default interface IToken {
  token_userId: string;
  token_privateKey: string;
  token_publicKey: string;
  token_refreshTokenUsing: string;
  token_refreshTokenUsed: Array<string>;
}
