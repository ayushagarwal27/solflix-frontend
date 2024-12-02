import React, { FC, FormEvent, useState } from "react";
import { getProvider } from "@/calls/calls";
import { BN, Program, web3 } from "@coral-xyz/anchor";
import { Solflix } from "@/solflixProgram/solflix";
import programInfo from "@/constants/programInfo";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

interface CreateResourceProps {
  resourceKey: string;
}

const CreateResource: FC<CreateResourceProps> = ({ resourceKey }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [numOfDays, setNumOfDays] = useState(0);
  const isValid = title && description && numOfDays !== 0 && price !== 0;
  const { connection } = useConnection();
  const wallet = useWallet();
  const router = useRouter();

  async function sha256(message: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  async function createResource() {
    if (!wallet.publicKey) return;
    try {
      const anchorProvider = getProvider(connection, wallet);
      const program = new Program<Solflix>(
        programInfo.idl_object,
        anchorProvider,
      );
      const hash = await sha256(
        resourceKey + numOfDays + wallet.publicKey?.toString(),
      );
      const resource = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("create"),
          wallet.publicKey.toBytes(),
          Buffer.from(hash.substring(0, 31)),
        ],
        programInfo.programID,
      )[0];
      const tx = await program.methods
        .createResource(
          new BN(price * web3.LAMPORTS_PER_SOL),
          numOfDays,
          resourceKey,
          title,
          description,
          hash.substring(0, 31),
        )
        .accountsPartial({
          creator: wallet.publicKey,
          createAccount: resource,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      router.push("/videos");
    } catch (err) {
      // @ts-ignore
      console.log(err);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isValid) {
      const res = await createResource();
    }
  }
  return (
    <form
      className={
        "flex flex-col gap-4 p-10 text-center border-[0.3px] border-red-800 text-white rounded-lg w-[450px]"
      }
      onSubmit={handleSubmit}
    >
      <p>Video Form</p>
      <input
        type="text"
        maxLength={50}
        placeholder="Title"
        className="input input-bordered input-ghost   w-full max-w-xs"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        maxLength={200}
        placeholder="Description"
        className="textarea textarea-bordered input-ghost  w-full max-w-xs"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className={"text-xs self-start -mb-2 text-gray-400"}>
        Price (SOL)
      </label>
      <input
        type="number"
        min={0.5}
        step={0.5}
        max={50}
        placeholder="Price"
        className="input input-bordered input-ghost  w-full max-w-xs"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <label className={"text-xs self-start -mb-2 text-gray-400"}>
        Num of Days valid
      </label>
      <input
        type="number"
        min={1}
        step={1}
        max={365}
        placeholder="Num of Days"
        className="input input-bordered input-ghost  w-full max-w-xs"
        value={numOfDays}
        onChange={(e) => setNumOfDays(Number(e.target.value))}
      />
      <button className={"btn bg-red-700 text-white"}>Submit</button>
    </form>
  );
};
export default CreateResource;
