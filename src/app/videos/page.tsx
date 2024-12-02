"use client";
import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, web3 } from "@coral-xyz/anchor";
import { Solflix } from "@/solflixProgram/solflix";
import { PublicKey } from "@solana/web3.js";
import programInfo from "../../constants/programInfo";
import { useRouter } from "next/navigation";
import { getProvider } from "@/calls/calls";

const Page = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [createAccounts, setCreateAccounts] = useState<
    | null
    | {
        creator: PublicKey;
        price: number;
        numOfDays: number;
        seed: string;
        resourceKey: string;
        title: string;
        description: string;
      }[]
  >(null);
  useEffect(() => {
    getAllCreateAccounts();
  }, []);

  // 9zjBpq1XHePm6CpVe5MZ4TgB3ttavPfAC5QrAb3gt5Ww
  async function getAllCreateAccounts() {
    setIsLoading(true);
    try {
      const anchorProvider = getProvider(connection, wallet);
      const program = new Program<Solflix>(
        programInfo.idl_object,
        anchorProvider,
      );
      const allAccounts = await connection.getParsedProgramAccounts(
        programInfo.programID,
        {
          filters: [{ dataSize: 400 }],
        },
      );

      // let config = await connection.getParsedProgramAccounts(
      //   programInfo.programID,
      //   {
      //     filters: [{ dataSize: 42 }],
      //   },
      // );
      // @ts-ignore
      // config = await program.account.config.fetch(config[0].pubkey);
      // console.log(config);

      const allAccountsPromise = allAccounts.map((account) =>
        program.account.create.fetch(account.pubkey),
      );

      Promise.all(allAccountsPromise).then((data) => {
        const nextItems = data.map((dt) => ({
          creator: dt.creator,
          price: hexToDecimal(dt.price.toString(16)) / web3.LAMPORTS_PER_SOL,
          numOfDays: dt.numOfDays,
          seed: dt.seed,
          resourceKey: dt.resourceKey,
          title: dt.title,
          description: dt.description,
        }));
        setCreateAccounts(nextItems);
      });
    } catch (err) {
      // @ts-ignore
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function hexToDecimal(hexString: string) {
    // Remove any leading "0x" if present
    if (hexString.startsWith("0x")) {
      hexString = hexString.slice(2);
    }

    // Convert hex to decimal
    const decimalNumber = parseInt(hexString, 16);

    return decimalNumber;
  }

  async function handleCheckAndPlay(
    creator: PublicKey,
    resourceHash: string,
    resourceKey: string,
  ) {
    if (!wallet.publicKey) return;
    const accessAccount = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("access"),
        Buffer.from(resourceHash),
        wallet.publicKey.toBytes(),
      ],
      programInfo.programID,
    )[0];
    const anchorProvider = getProvider(connection, wallet);
    const program = new Program<Solflix>(
      programInfo.idl_object,
      anchorProvider,
    );
    try {
      const res = await program.account.access.fetch(accessAccount);
      // if (
      //   isCurrentTimeBetween(
      //  ,
      //     parseInt(res.numOfDays),
      //   )
      // ) {
      // } else {
      //   alert("Please purchase again, your time limit expired");
      // }
      // console.log(new Date(hexToDecimal(res.purchaseTime.toString(16))));
      // console.log(hexToDecimal(res.purchaseTime.toString(16)));
      router.push("/access?key=" + res.resourceKey);
    } catch (err: any) {
      if (
        err.message ===
        "Account does not exist or has no data " + accessAccount.toString()
      ) {
        await accessResource(creator, resourceHash, resourceKey);
      }
    }
  }

  async function accessResource(
    creator: PublicKey,
    resourceHash: string,
    resourceKey: string,
  ) {
    const resource = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("create"), creator.toBytes(), Buffer.from(resourceHash)],
      programInfo.programID,
    )[0];
    if (!wallet.publicKey) return;
    const accessAccount = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("access"),
        Buffer.from(resourceHash),
        wallet.publicKey.toBytes(),
      ],
      programInfo.programID,
    )[0];

    const anchorProvider = getProvider(connection, wallet);
    const program = new Program<Solflix>(
      programInfo.idl_object,
      anchorProvider,
    );

    const config = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      programInfo.programID,
    )[0];

    try {
      const tx = await program.methods
        .accessResource()
        .accountsPartial({
          accessor: wallet.publicKey ?? undefined,
          maker: creator,
          admin: new PublicKey("5X39uByHSMasDzri4GGMUyJENq6LftPJQbLqZczp66Kd"),
          resourceAccount: resource,
          config,
          accessAccount,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      router.push("/access?key=" + resourceKey);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        className={
          "grid md:grid-cols-2 lg:grid-cols-3 mt-[150px] max-w-7xl mx-auto bg-black flex-wrap  gap-4 w-full"
        }
      >
        {createAccounts?.map(
          (
            {
              title,
              description,
              price,
              numOfDays,
              seed,
              creator,
              resourceKey,
            },
            key,
          ) => (
            <div
              className={
                "p-4 flex gap-4 flex-col min-w-[300px] rounded-lg border-2 border-red-600 hover:shadow-2xl hover:-translate-y-[2px] duration-200 hover:shadow-red-500"
              }
              key={key}
            >
              <h2 className="capitalize text-xl text-center text-red-400">
                {title}
              </h2>
              <p className={" py-4 px-1 mt-auto rounded text-red-100 text-md"}>
                {description}
              </p>
              <div className={"mt-auto"}>
                <p className={"font-bold"}>
                  Rent:{" "}
                  <span className={"text-red-300 text-md font-normal"}>
                    {price} SOL
                  </span>
                </p>
                <p className={"font-bold"}>
                  Num of days valid:{" "}
                  <span className={"text-red-300 text-md font-normal"}>
                    {numOfDays} Days{" "}
                  </span>
                </p>
              </div>
              <button
                className="btn mt-auto btn-neutral text-white border-none bg-red-900 cus-btn-disabled"
                disabled={!wallet.connected}
                onClick={() => handleCheckAndPlay(creator, seed, resourceKey)}
              >
                Play Now
              </button>
            </div>
          ),
        )}
      </div>
      {isLoading && <p className={"text-purple-900 text-2xl"}>Loading ...</p>}
    </>
  );
};
export default Page;
