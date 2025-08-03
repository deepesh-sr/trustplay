pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
pub mod context;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;
use crate::context::*;


declare_id!("GNRzq9iJBiUirwbpsa1kuE1xsLm5i8kRZqH5hMT9q4NN");

#[program]
pub mod joinroom {

    use super::*;

    pub fn initialize(ctx: Context<InitializeRoom>,name :String) -> Result<()> {
        initialize_room::handler(ctx,name)
    }

    pub fn joinroom(ctx: Context<JoinRoom>)-> Result<()>{
        join_room::handler(ctx)
    }
}
