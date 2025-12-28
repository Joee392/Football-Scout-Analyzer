document.addEventListener('DOMContentLoaded', async () => {
    const dom = new DOMManipulator();
    dom.initialize();

    try {
        const response = await fetch('get_players.php');
        const data = await response.json();

        dom.allPlayers = data; 
        dom.filteredPlayers = sortPlayers(data, 'scoutScore'); 
        
        dom.setupEventListeners();
        dom.updatePlayersDisplay();
    } catch (e) {
        console.error("Connection to PHP failed", e);
    }
});