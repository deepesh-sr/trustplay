
use anchor_lang::prelude::*;
use crate::context::*;
use crate::state::*;

pub fn handler(ctx:Context<JoinRoom>)->Result<()>{

    let participant = &mut ctx.accounts.participantpda;

    participant.room = ctx.accounts.room.key();
    participant.participant_player = ctx.accounts.participant.key();

    msg!("Participated in room :{} \n Participant:{}",participant.room,participant.participant_player);
    Ok(())
}