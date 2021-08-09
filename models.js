const games = {};
const backup = {};

const defaultDeck = [
  "Activist",
  "Medic",
  "Scout",
  "Diplomat",
  "Minister",
  "Diplomat",
  "Commissar",
  "General",
  "Peacekeeper",
  "Sentry Guard",
  "Bounty Hunter",
  "Sentry Guard",
  "General",
  "Sentry Guard",
  "Bounty Hunter",
  "Minister",
  "President",
  "Peacekeeper",
  "Bounty Hunter",
  "Medic",
  "Entrepreneur",
  "Entrepreneur",
  "Activist",
  "Sentry Guard",
  "Minister",
  "Commissar",
  "Medic",
  "Politician",
  "President",
  "Scout",
  "General",
  "Minister",
  "Peacekeeper",
  "Politician",
  "Bounty Hunter",
  "General",
  "Entrepreneur",
  "Peacekeeper",
];

const countryDeck = [
  "USA",
  "UK",
  "Germany",
  "France",
  "Italy",
  "Russia",
  "China",
  "Japan",
  "ROK",
  "India",
  "DPRK",
  "Switzerland",
  "Israel",
];

const cardInfo = {
  USA: "**United States of America** (Trans-Continental Security Alliance - Support):\nYou can declare your alliance/country at the start of the game(and only at the start of the game) to peek at players’ country cards (scales with player count: 0 for 2 Europeans in game, 1 for 3, 2 for 4-5). (Use ;usa {target} for this.)\nDuring your actions, after claiming a card, you may choose someone to take the effects of that card instead of yourself. Your Blue Strip card claims may not be challenged.(Entrepreneur limitations stay on US)",
  UK: "**United Kingdom** (Trans-Continental Security Alliance - Utility):\nYou can reveal your country before or after any turn. Revealing your country activates this skill:\nYou may target 2 players with any one of these abilities. You may choose 1 person to lose a life . You may choose 1 person to discard as many tokens as you have back into the Reserve. You may choose 1 person to gain a life. If you chose a dead player, they revive with ½ of the tokens they died with. You may target the same player twice. If Japan is revealed, you may not remove Japan’s tokens.",
  Germany:
    "**Germany** (Trans-Continental Security Alliance - Offense):\nYou may reveal your country to gain 2 counters (;ac 2). When performing an Uprising, if successful, you may spend one counter and 2 tokens to force the opponent to lose one more life (;ac -1, ;at -2). Whenever you kill someone without the use of counters, gain a counter (;ac 1).",
  France:
    "**France** (Trans-Continental Security Alliance - Support):\nYou may reveal your county card to activate this passive:\nWhen you are alive, revealed Europeans may transfer X amount of tokens amongst themselves per round. X is defined as the amount of alive Europeans allies France has in the game x2. You may only swap before and after people’s turns. (Use ;france for this)",
  Italy:
    "**Italy** (Trans-Continental Security Alliance - Utility):\nYou can reveal your country before or after any turn. Revealing your country gives the ability to perform this action:\nACTION: Pay 2 tokens to the Reserve to remove a counter of your choice from a country (;at -2, ;ac -1 {target}).\nIn addition, whenever someone other than revealed Europeans claims the Minister, Peacekeeper, or Sentry Guard, you may perform a free action. You may not claim Blue Strip cards or the General. Your hand size is reduced to two.",
  Russia:
    "**Russia** (United Security Confederation - Defence):\nYou can declare your alliance/country at the start of the game(and only at the start of the game). If you do, draw 1 card from the deck and place it on your country card. You may claim that card as if it was part of your hand, it interacts with SK but not Peacekeeper, Scout or Funding. (Draw this card with ;draw cc.)\nAssign 2 counters to your card (;ac 2). When someone performs an Uprising or Assassination against you, you may discard a counter to block that attack. Your counters may not be removed by Italy.",
  China:
    "**China** (United Security Confederation - Utility):\nYou can reveal your country before or after any turn. You may declare your country to immediately perform 1 free action. Place 2 counters on your country card (;ac 2). You may use counters between turns to immediately perform one free action (;ac -1). (1 counter for 1 action). You may spend an action to receive a counter (;ac 1).\nYour counter cap is 4.",
  Japan:
    "**Japan** (United Security Confederation - Support):\nYou may declare a card to exchange it with a card from your hand by searching the deck, then shuffling it (Use ;search for this). Increase your token cap to 27 and draw 4 tokens.\nYou also gain the ability to perform this action when you reveal your country:\nACTION: Place two counters on your country card (;ac 2).\nYou may spend one counter to help block 1 Assassination or Uprising targeted at other players (;ac -1). You have to claim the relevant card/cost to do so however. Your counter cap is 4. Your Politician claims may not be challenged.",
  ROK: "**South Korea** (United Security Confederation - Support):\nYou may reveal your country to give a counter to any revealed player (;ac 1 {target}) and activate this passive:\nWhen you are alive, once per turn (increase to twice per turn if SK has more than 2 alive allies), any 2 revealed Asians may swap one card among themselves. The cards are swapped facedown. The two Asians who swapped cards both gain a token. (Use ;trade for this.)\nYou may place a card from the deck onto your country card, it does not count towards your lives or hand, but it interacts with your passive. Only South Korea may look at the card on his country card. (Draw this card with ;draw cc.)",
  India:
    "**India** (United Security Confederation - Utility):\nYou can reveal your country before or after any turn. You may reveal your country to activate this passive:\nIf you lose a challenge, you may pay 4 tokens to gain a life after resolving the challenge (;at -4, ;draw). If India’s amount of allies exceeds 2, reduce cost to 3 tokens.",
  DPRK: "**North Korea** (Neutral):\nYou can reveal your country before or after any turn.\nYou may reveal your country to draw as many counters as there are revealed alive players (capped at 8) (;ac {number}). You may spend your counters to heal back a life or to gain 5 tokens, disabled when the amount of alive players reaches 4 (;draw / ;at 5).",
  Switzerland:
    "**Switzerland** (Neutral):\nYou can reveal your country before or after any turn.\nYou may reveal your country to activate this action and passive:\nPassive: Whenever you take 1 damage, choose a player. That player also takes 1 damage.\nACTION: Pay 4 tokens to the bank (;at -4). Target player reveals his country and cards to you.\nYour passives and exclusive action are disabled when the amount of alive players reaches 4.",
  Israel:
    "**Israel** (Neutral):\nYou can reveal your country before or after any turn.\nYou may reveal your country to active this passive:\nYour claims may not be challenged.\nIn addition, increase your hand size to 4 and draw a card (;draw).\nYour passives are disabled when the amount of alive players reaches 4.",
  Minister:
    "**Minister** (Blue Strip, 4 in a deck):\nAbility #1: Draw 3 tokens from the Reserve. (Use ;minister)\nYou may not claim the Minister if you have Red Strip cards in your hand.",
  President:
    "**President** (Blue Strip, 2 in a deck):\nAbility #1: You may draw up to X+2 tokens from the Reserve (;at {X+2}). X is defined as the amount of alive players other than yourself divided by 2 rounded up. Starting from the player on your left (going clockwise), take tokens from the Reserve and give [X+1] players 1 token each (;at 1 {target}).",
  Entrepreneur:
    "**Entrepreneur** (Blue Strip, 3 in a deck):\nAbility #1: Draw 5 tokens from the Reserve. Place 1 token from the Reserve into the Holding Area. The person claiming Entrepreneur may not claim Blue Strip, Sentry Guard, General or Income until after your next turn action. (Use ;entrepreneur)\nAbility #2: Block Scout targeted at you (Passive)",
  Politician:
    "**Politician** (Red Strip, 2 in a deck):\nAbility #1 (Passive): Pay 6 tokens to the Reserve to block Bounty Hunter targeted at you (;at -6).\nAbility #2 (Passive): Pay 9 tokens to the Reserve to block Uprising targeted at you (;at -9).",
  Medic:
    "**Medic** (Red Strip, 3 in a deck):\nAbility #1: Pay 9 tokens to the Reserve. First, draw a card to your hand. Then, you may choose to discard a card from your hand to draw another card (;at -9, ;draw, ;rc {card}, ;draw). You may only claim this card if your current hand size is lower than your maximum hand size.\nAbility #2 (Passive): When a player loses a life, you may pay 2 tokens to the Reserve to swap a card from your hand with the revealed card.",
  "Bounty Hunter":
    "**Bounty Hunter** (Red Strip, 4 in a deck):\nAbility #1: Pay 3 tokens to the Reserve and 1 token to the Holding Area to make the target player lose a life (;at -3, ;th -1). (Blocked by Sentry Guard, Activist and Politician)\nAbility #2: Block Commissar (Passive)",
  "Sentry Guard":
    "**Sentry Guard** (Yellow Strip, 4 in a deck): \nAbility #1: (Passive): Block Bounty Hunter.\nAbility #2: Draw 2 tokens from the Reserve (;at 2).",
  General:
    "**General** (Yellow Strip, 4 in a deck):\nAbility #1: Steal two tokens from the target player. (Blocked by Peacekeeper) (Use ;steal 2 {target})\nAbility #2 (Passive): When targeted by a General, draw 2 tokens from the Reserve (;at 2).",
  Peacekeeper:
    "**Peacekeeper** (Yellow Strip, 4 in a deck):\nAbility #1: Draw 2 cards from the deck into your hand. Then, put any 2 cards from your hand back into the deck. (Use ;peace)\nAbility #2 (Passive): Block General.",
  Scout:
    "**Scout** (Green Strip, 2 in a deck):\nAbility #1: Pay X tokens to look at X of target player’s cards [target player chooses which to reveal to you] (Blocked by Entrepreneur) (;at {-X})\nAbility #2: Pay X +1 amount of tokens to the bank. You may draw X amount of cards from the deck, then put X cards from your hand back into the deck (;at {-(X+1)}, ;draw, ;rc {card}).",
  Diplomat:
    "**Diplomat** (Green Strip, 2 in a deck):\nAbility #1: Pay 1 token to the Reserve, 1 token to the Holding Area to grant the target player an immediate free action (;at -1, ;th -1).\nAbility #2: Place X amount of tokens on the target player’s unrevealed country card. Until his country card has no tokens, he may not reveal it. He may pay 1 token to the Reserve to remove 1 token from his country card (does not take an action).\nYou may not Diplomat off a free action. (Use ;diplomat and ;unblock respectively)",
  Activist:
    "**Activist** (Green Strip, 2 in a deck):\nAbility #1 (Passive): Take a free action if someone else lost a life and you did not just take an action.(Use ;activist)\nAbility #2: (Passive) Block Bounty Hunter.\nYou may not Activist off a loss of life resulting directly from a free action. (Challenges are fine) The table may only claim Ability #1 4 times in a round.",
  Commissar:
    "**Commissar** (Green Strip, 2 in a deck):\nAbility #1: Target player shows you a card from his hand at random. You may choose to discard it, if you do, he draws however many cards you discarded. If you and the target player are revealed allies, take 2 cards instead. (Use ;commissar for this.) (Blocked by Bounty Hunter)\nAbility #2: Pay 2 tokens to the Reserve to target two players + yourself. Target players (including yourself) may not draw tokens from the Reserve during their next action. (Blocked by Bounty Hunter)",
};

module.exports = {
  games,
  backup,
  defaultDeck,
  countryDeck,
  cardInfo,
};
