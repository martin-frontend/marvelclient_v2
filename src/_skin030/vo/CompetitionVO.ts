export interface CompetitionVO {
    competition_id: number;
    competition_name: string;
    count: number;
    country_icon: string;
    matches: MatcheVO[];
}

export interface MatcheVO {
    away_team: string;
    away_team_icon: string;
    cname: string;
    competition_id: number;
    country: string;
    event_id: string;
    home_team: string;
    home_team_icon: string;
    id: number;
    market: MarketVO[];
    market_amount: number;
    mid: number;
    name: string;
    sb_time: number;
    start_time: string;
    states: any;
}

export interface MarketVO {
    event_id: number;
    ex_markets: [];
    fix_markets: any;
    type: "fix";
}

export interface FixMarketVO {
    cn: string;
    en: string;
    hint: string;
    id: number;
    market_id: string;
    market_name: string;
    market_type: string;
    match_id: string;
    priority: number;
    selections: SelectionVO[];
    status: number;
    title: string;
}

export interface SelectionVO {
    handicap: string;
    id: number;
    lineIndex: number;
    name: string;
    order: number;
    price: { back: string; lay: string; maxStake: string; minStake: string };
    probability: string;
    status: number;
    statusName: string;
    type: string;
}

export interface StatesVO {
    checkpoint: "1666100658881";
    corners_ft: "0-2";
    corners_ht: "0-2";
    corners_ot: "0-0";
    corners_otht: "0-0";
    event_id: 144080;
    goals_ft: "0-0";
    goals_ht: "0-0";
    goals_ot: "0-0";
    goals_otht: "0-0";
    goals_pk: "0-0";
    last_time: 1666100659;
    match_id: "FBL-786600";
    match_phase: string;
    match_version: 160;
    phase_minute: -1;
    red_cards_ft: "0-0";
    red_cards_ht: "0-0";
    red_cards_ot: "0-0";
    red_cards_otht: "0-0";
    update_time: 1666100658881;
    yellow_cards_ft: "1-1";
    yellow_cards_ht: "1-1";
    yellow_cards_ot: "0-0";
    yellow_cards_otht: "0-0";
}
