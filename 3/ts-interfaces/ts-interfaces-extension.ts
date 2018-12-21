interface Club {
    name: string;
    logoLocation: string;
    
    isActive(): boolean;
}

interface SoccerClub extends Club {
    league: string;
}