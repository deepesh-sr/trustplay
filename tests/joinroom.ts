import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Joinroom } from "../target/types/joinroom";

describe("joinroom", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  // Wallet provided by localnet
  const wallet = anchor.AnchorProvider.env().wallet;

  const program = anchor.workspace.joinroom as Program<Joinroom>;

  it("Initializes a room", async () => {

    const [roomPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("room"), wallet.publicKey.toBytes()],
      program.programId,
    )

    const tx = await program.methods.initialize("Sol_Play")
      .accountsStrict(
        {
          room: roomPDA,
          creator: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId
        }
      ).rpc()

    console.log("Transaction Signature :", tx);

    const roomAccount = await program.account.room.fetch(roomPDA);
    console.log(`Room Data : ${roomAccount} Room Address: ${roomPDA}`);
  });

  it("Player joins room.", async () => {

    const newPlayer = anchor.web3.Keypair.generate();
    const signature = await anchor.AnchorProvider.env().connection.requestAirdrop(newPlayer.publicKey, anchor.web3.LAMPORTS_PER_SOL);

    await anchor.AnchorProvider.env().connection.confirmTransaction(signature,"confirmed");
    

    const [roomPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("room"), wallet.publicKey.toBytes()],
      program.programId,
    )

    const [participantPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("participant"), roomPDA.toBuffer(), newPlayer.publicKey.toBuffer()],
      program.programId
    )

    const tx = await program.methods.joinroom()
      .accountsStrict({
        participantpda: participantPDA,
        room: roomPDA,
        participant: newPlayer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers([newPlayer])
      .rpc()

    const ParticipantAccount = await program.account.participant.fetch(participantPDA);
    console.log("Player Details \n ", ParticipantAccount)
  })
});
