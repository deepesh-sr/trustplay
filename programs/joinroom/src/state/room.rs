use anchor_lang::prelude::*;
// creating one room for 

#[account]
#[derive(InitSpace)]

pub struct Room{
    #[max_len(50)]
    pub name : String,
    pub creator : Pubkey
}