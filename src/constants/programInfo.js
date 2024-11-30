import idl from "../solflixProgram/solflix.json";
import { PublicKey } from "@solana/web3.js";

const idl_string = JSON.stringify(idl);
const idl_object = JSON.parse(idl_string);
const programID = new PublicKey(idl.address);

export default { idl_string, idl_object, programID };
