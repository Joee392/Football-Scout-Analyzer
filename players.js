function getAllPlayers() {
    return playersData;
}

function getPlayersByLeague(league) {
    if (league === 'all') return playersData;
    const leagueMap = {
        'premier': 'Premier League',
        'la-liga': 'La Liga',
        'serie-a': 'Serie A',
        'bundesliga': 'Bundesliga',
        'ligue-1': 'Ligue 1'
    };
    return playersData.filter(player => player.league === leagueMap[league]);
}


// Ensure this function uses the passed 'players' array, not a global variable
function filterPlayers(players, league = 'all', query = '') {
    let results = [...players]; // Use the data from the database

    // 1. Filter by League
    if (league !== 'all') {
        const leagueMap = {
            'premier': 'Premier League',
            'la-liga': 'La Liga',
            'serie-a': 'Serie A',
            'bundesliga': 'Bundesliga',
            'ligue-1': 'Ligue 1'
        };
        const targetLeague = leagueMap[league];
        results = results.filter(player => player.league === targetLeague);
    }
    
    // 2. Filter by Search Query
    if (query) {
        const searchTerm = query.toLowerCase().trim();
        results = results.filter(player => 
            player.name.toLowerCase().includes(searchTerm) ||
            player.team.toLowerCase().includes(searchTerm) ||
            player.league.toLowerCase().includes(searchTerm)
        );
    }
    
    return results;
}

function sortPlayers(players, criteria) {
    const sorted = [...players];
    
    return sorted.sort((a, b) => {
        // Handle Numeric Sorting (Desc)
        if (['scoutScore', 'goals', 'assists', 'appearances'].includes(criteria)) {
            return b[criteria] - a[criteria];
        }
        // Handle Alphabetical Sorting (Asc)
        if (['name', 'team'].includes(criteria)) {
            return a[criteria].localeCompare(b[criteria]);
        }
        return 0;
    });
}

function calculateAverageScore(players) {
    if (players.length === 0) return 0;
    const total = players.reduce((sum, player) => sum + player.scoutScore, 0);
    return Math.round(total / players.length);
}

function getTopScorer(players) {
    if (players.length === 0) return null;
    return players.reduce((top, player) => player.goals > top.goals ? player : top);
}

function getTopAssister(players) {
    if (players.length === 0) return null;
    return players.reduce((top, player) => player.assists > top.assists ? player : top);
}