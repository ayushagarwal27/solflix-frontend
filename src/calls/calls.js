import { Solflix } from "@/solflixProgram/solflix";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import programInfo from "../constants/programInfo";

export const getProvider = (connection, wallet) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions(),
  );
  setProvider(provider);
  return provider;
};

export async function initializeConfig() {
  try {
    const anchorProvider = getProvider();
    const program =
      new Program() < Solflix > (programInfo.idl_object, anchorProvider);
    const tx = await program.methods.initialize().rpc();
    console.log(tx);
  } catch (err) {
    // @ts-ignore
    console.log(err);
  }
}
