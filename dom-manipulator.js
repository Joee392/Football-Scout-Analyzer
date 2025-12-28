// DOM Manipulation Module - Optimized Version
class DOMManipulator {
 constructor() {
    this.comparisonList = [];
    this.currentView = localStorage.getItem('preferredView') || 'table';
    this.currentLeague = localStorage.getItem('preferredLeague') || 'all';
    this.currentSort = localStorage.getItem('preferredSort') || 'score';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.filteredPlayers = [];
    this.allPlayers = []; // Add this line!
}

    // Initialize DOM elements
    initialize() {
        this.elements = {
            playerSearch: document.getElementById('playerSearch'),
            clearSearch: document.getElementById('clearSearch'),
            sortBy: document.getElementById('sortBy'),
            playersTableBody: document.getElementById('playersTableBody'),
            playersCards: document.getElementById('playersCards'),
            totalPlayers: document.getElementById('totalPlayers'),
            avgScore: document.getElementById('avgScore'),
            topScorer: document.getElementById('topScorer'),
            topAssister: document.getElementById('topAssister'),
            visibleCount: document.getElementById('visibleCount'),
            playersCount: document.getElementById('playersCount'),
            tableViewBtn: document.getElementById('tableViewBtn'),
            cardViewBtn: document.getElementById('cardViewBtn'),
            tableView: document.getElementById('tableView'),
            cardView: document.getElementById('cardView'),
            prevPage: document.getElementById('prevPage'),
            nextPage: document.getElementById('nextPage'),
            currentPage: document.getElementById('currentPage'),
            totalPages: document.getElementById('totalPages'),
            comparisonContainer: document.getElementById('comparisonContainer'),
            comparisonCount: document.getElementById('comparisonCount'),
            clearComparison: document.getElementById('clearComparison'),
            exportData: document.getElementById('exportData'),
            playerModal: document.getElementById('playerModal'),
            closeModal: document.getElementById('closeModal'),
            modalPlayerName: document.getElementById('modalPlayerName'),
            modalPlayerDetails: document.getElementById('modalPlayerDetails')
        };

        // League filter buttons
        this.leagueButtons = document.querySelectorAll('.league-btn');
        
        // Set initial states from localStorage
        this.elements.sortBy.value = this.currentSort;
        this.switchView(this.currentView, false);
    }

    // Debounce utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Set up event listeners with event delegation
    setupEventListeners() {
        // Debounced search functionality
        const debouncedSearch = this.debounce((value) => {
            this.handleSearch(value);
        }, 300);

        this.elements.playerSearch.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        this.elements.clearSearch.addEventListener('click', () => {
            this.elements.playerSearch.value = '';
            this.handleSearch('');
        });

        // Sort functionality
        this.elements.sortBy.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            localStorage.setItem('preferredSort', this.currentSort);
            
            // ADD THIS: Re-sort the current list using the new criteria
            this.filteredPlayers = sortPlayers(this.filteredPlayers, this.currentSort);
            
            // Go back to page 1 when sorting changes
            this.currentPage = 1; 
            this.updatePlayersDisplay();
        });

        // League filter functionality
        this.leagueButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const league = e.target.dataset.league;
                this.handleLeagueFilter(league);
            });
        });

        // View toggle
        this.elements.tableViewBtn.addEventListener('click', () => {
            this.switchView('table');
        });

        this.elements.cardViewBtn.addEventListener('click', () => {
            this.switchView('cards');
        });

        // Pagination
        this.elements.prevPage.addEventListener('click', () => {
            this.changePage(this.currentPage - 1);
        });

        this.elements.nextPage.addEventListener('click', () => {
            this.changePage(this.currentPage + 1);
        });

        // Comparison
        this.elements.clearComparison.addEventListener('click', () => {
            this.clearComparison();
        });

        this.elements.exportData.addEventListener('click', () => {
            this.exportData();
        });

        // Modal
        this.elements.closeModal.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.elements.playerModal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.playerModal.style.display === 'flex') {
                this.closeModal();
            }
        });

        // EVENT DELEGATION for table actions
        this.elements.playersTableBody.addEventListener('click', (e) => {
            const compareBtn = e.target.closest('.compare-btn');
            const detailsBtn = e.target.closest('.details-btn');
            
            if (compareBtn) {
                e.stopPropagation();
                const playerId = parseInt(compareBtn.dataset.id);
                const player = this.filteredPlayers.find(p => p.id === playerId);
                if (player) {
                    this.toggleComparison(player);
                    this.updatePlayersDisplay();
                }
            } else if (detailsBtn) {
                e.stopPropagation();
                const playerId = parseInt(detailsBtn.dataset.id);
                const player = this.filteredPlayers.find(p => p.id === playerId);
                if (player) {
                    this.showPlayerDetails(player);
                }
            }
        });

        // EVENT DELEGATION for card actions
        this.elements.playersCards.addEventListener('click', (e) => {
            const compareBtn = e.target.closest('.compare-btn');
            const detailsBtn = e.target.closest('.details-btn');
            
            if (compareBtn) {
                e.stopPropagation();
                const playerId = parseInt(compareBtn.dataset.id);
                const player = this.filteredPlayers.find(p => p.id === playerId);
                if (player) {
                    this.toggleComparison(player);
                    this.updatePlayersDisplay();
                }
            } else if (detailsBtn) {
                e.stopPropagation();
                const playerId = parseInt(detailsBtn.dataset.id);
                const player = this.filteredPlayers.find(p => p.id === playerId);
                if (player) {
                    this.showPlayerDetails(player);
                }
            }
        });
    }

    // Sanitize HTML to prevent XSS
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Handle search
   handleSearch(query) {
    // We now filter the players we stored in this.allPlayers
    const results = filterPlayers(this.allPlayers, this.currentLeague, query);
    this.filteredPlayers = sortPlayers(results, this.currentSort);
    this.currentPage = 1;
    this.updatePlayersDisplay();
}

    handleLeagueFilter(league) {
    this.currentLeague = league;
    this.currentPage = 1;
    localStorage.setItem('preferredLeague', league);
    
    this.leagueButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.league === league);
    });

    // The logic inside filterPlayers (in players.js) will convert 
    // 'premier' to 'Premier League' automatically.
    const results = filterPlayers(this.allPlayers, league, this.elements.playerSearch.value);
    
    // Crucial: Use 'scoutScore' here to match your PHP output
    this.filteredPlayers = sortPlayers(results, this.currentSort === 'score' ? 'scoutScore' : this.currentSort);
    this.updatePlayersDisplay();
}

    // Switch between table and card view
    switchView(view, savePreference = true) {
        this.currentView = view;
        
        if (savePreference) {
            localStorage.setItem('preferredView', view);
        }
        
        // Update active button
        this.elements.tableViewBtn.classList.toggle('active', view === 'table');
        this.elements.cardViewBtn.classList.toggle('active', view === 'cards');
        
        // Show/hide views
        this.elements.tableView.classList.toggle('active', view === 'table');
        this.elements.cardView.classList.toggle('active', view === 'cards');
        
        this.updatePlayersDisplay();
    }

    // Show loading state
    showLoading(container) {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading...</p></div>';
    }

    // Update players display
    updatePlayersDisplay() {
    const container = this.currentView === 'table' ? 
        this.elements.playersTableBody : this.elements.playersCards;
    
    this.showLoading(container);
    
    setTimeout(() => {
        // ADD THIS: Final sort check before rendering
        this.filteredPlayers = sortPlayers(this.filteredPlayers, this.currentSort);

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedPlayers = this.filteredPlayers.slice(startIndex, endIndex);

        if (this.currentView === 'table') {
            this.renderTableView(paginatedPlayers, startIndex);
        } else {
            this.renderCardView(paginatedPlayers, startIndex);
        }

        this.updateStats();
        this.updatePagination();
    }, 100);
}

    // Render table view
    renderTableView(players, startIndex) {
        this.elements.playersTableBody.innerHTML = '';
        
        if (players.length === 0) {
            this.elements.playersTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem; color: var(--gray-400);">
                        No players found. Try adjusting your search or filters.
                    </td>
                </tr>
            `;
            this.elements.visibleCount.textContent = 0;
            return;
        }
        
        players.forEach((player, index) => {
            const row = this.createTableRow(player, startIndex + index + 1);
            this.elements.playersTableBody.appendChild(row);
        });

        this.elements.visibleCount.textContent = this.filteredPlayers.length;
    }

    // Create table row (NO event listeners - using delegation)
    createTableRow(player, rank) {
        const row = document.createElement('tr');
        
        const scoreClass = player.scoutScore >= 90 ? 'score-high' : 
                          player.scoutScore >= 85 ? 'score-medium' : 'score-low';
        
        const isInComparison = this.comparisonList.some(p => p.id === player.id);
        
        row.innerHTML = `
            <td>${rank}</td>
            <td class="player-name-cell">${this.sanitizeHTML(player.name)}</td>
            <td class="team-cell">
                <span class="team-badge">${this.sanitizeHTML(player.team.charAt(0))}</span>
                ${this.sanitizeHTML(player.team)}
            </td>
            <td>${this.sanitizeHTML(player.league)}</td>
            <td class="stats-cell">${player.appearances}</td>
            <td class="stats-cell">${player.goals}</td>
            <td class="stats-cell">${player.assists}</td>
            <td class="score-cell ${scoreClass}">${player.scoutScore}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn compare-btn ${isInComparison ? 'added' : ''}" 
                            data-id="${player.id}"
                            aria-label="${isInComparison ? 'Remove from comparison' : 'Add to comparison'}">
                        <i class="fas fa-${isInComparison ? 'check' : 'chart-bar'}"></i>
                    </button>
                    <button class="action-btn details-btn" data-id="${player.id}" aria-label="View details">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </td>
        `;

        return row;
    }

    // Render card view
    renderCardView(players, startIndex) {
        this.elements.playersCards.innerHTML = '';
        
        if (players.length === 0) {
            this.elements.playersCards.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-400);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No players found. Try adjusting your search or filters.</p>
                </div>
            `;
            this.elements.visibleCount.textContent = 0;
            return;
        }
        
        players.forEach((player, index) => {
            const card = this.createPlayerCard(player, startIndex + index + 1);
            this.elements.playersCards.appendChild(card);
        });

        this.elements.visibleCount.textContent = this.filteredPlayers.length;
    }

    // Create player card (NO event listeners - using delegation)
    createPlayerCard(player, rank) {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        const scoreClass = player.scoutScore >= 90 ? 'score-high' : 
                          player.scoutScore >= 85 ? 'score-medium' : 'score-low';
        
        const isInComparison = this.comparisonList.some(p => p.id === player.id);
        
        card.innerHTML = `
            <div class="player-card-header">
                <div>
                    <div class="player-name">${this.sanitizeHTML(player.name)}</div>
                    <div class="player-team">${this.sanitizeHTML(player.team)} • ${this.sanitizeHTML(player.league)}</div>
                </div>
                <span class="score-cell ${scoreClass}">${player.scoutScore}</span>
            </div>
            
            <div class="player-stats">
                <div class="stat-item">
                    <div class="stat-value">${player.appearances}</div>
                    <div class="stat-label">Apps</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.goals}</div>
                    <div class="stat-label">Goals</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.assists}</div>
                    <div class="stat-label">Assists</div>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn-primary compare-btn ${isInComparison ? 'added' : ''}" 
                        data-id="${player.id}">
                    <i class="fas fa-${isInComparison ? 'check' : 'chart-bar'}"></i>
                    ${isInComparison ? 'Added' : 'Compare'}
                </button>
                <button class="btn-secondary details-btn" data-id="${player.id}">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        `;

        return card;
    }

    // Update statistics
    updateStats() {
        const totalPlayers = this.filteredPlayers.length;
        const avgScore = calculateAverageScore(this.filteredPlayers);
        const topScorer = getTopScorer(this.filteredPlayers);
        const topAssister = getTopAssister(this.filteredPlayers);

        this.elements.totalPlayers.textContent = totalPlayers;
        this.elements.avgScore.textContent = avgScore;
        this.elements.topScorer.textContent = topScorer ? topScorer.name.split(' ')[1] || topScorer.name : '-';
        this.elements.topAssister.textContent = topAssister ? topAssister.name.split(' ')[1] || topAssister.name : '-';
    }

    // Update pagination controls
    updatePagination() {
        const totalPages = Math.ceil(this.filteredPlayers.length / this.itemsPerPage);
        
        this.elements.totalPages.textContent = totalPages || 1;
        this.elements.currentPage.textContent = this.currentPage;
        
        this.elements.prevPage.disabled = this.currentPage === 1;
        this.elements.nextPage.disabled = this.currentPage === totalPages || totalPages === 0;
    }

    // Change page
    changePage(page) {
        this.currentPage = page;
        this.updatePlayersDisplay();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Toggle player in comparison list
    toggleComparison(player) {
        const index = this.comparisonList.findIndex(p => p.id === player.id);
        
        if (index === -1) {
            if (this.comparisonList.length < 5) {
                this.comparisonList.push(player);
                this.showNotification(`${player.name} added to comparison`, 'success');
            } else {
                this.showNotification('Maximum 5 players can be compared at once', 'warning');
                return;
            }
        } else {
            this.comparisonList.splice(index, 1);
            this.showNotification(`${player.name} removed from comparison`, 'info');
        }
        
        this.updateComparisonView();
    }

    // Update comparison view
    updateComparisonView() {
        const count = this.comparisonList.length;
        this.elements.comparisonCount.textContent = count;
        this.elements.clearComparison.disabled = count === 0;
        
        if (count === 0) {
            this.elements.comparisonContainer.innerHTML = 
                '<p class="empty-message">Select players to compare by clicking the "Compare" button</p>';
            return;
        }
        
        // Create comparison chart
        let html = '<div class="comparison-chart">';
        
        // Headers
        html += '<div class="comparison-row header">';
        html += '<div class="comparison-cell">Player</div>';
        html += '<div class="comparison-cell">Team</div>';
        html += '<div class="comparison-cell">Goals</div>';
        html += '<div class="comparison-cell">Assists</div>';
        html += '<div class="comparison-cell">Score</div>';
        html += '</div>';
        
        // Data rows
        this.comparisonList.forEach(player => {
            html += '<div class="comparison-row">';
            html += `<div class="comparison-cell"><strong>${this.sanitizeHTML(player.name)}</strong></div>`;
            html += `<div class="comparison-cell">${this.sanitizeHTML(player.team)}</div>`;
            html += `<div class="comparison-cell">${player.goals}</div>`;
            html += `<div class="comparison-cell">${player.assists}</div>`;
            html += `<div class="comparison-cell"><span class="score-cell">${player.scoutScore}</span></div>`;
            html += '</div>';
        });
        
        // Stats summary
        const avgGoals = (this.comparisonList.reduce((sum, p) => sum + p.goals, 0) / count).toFixed(1);
        const avgAssists = (this.comparisonList.reduce((sum, p) => sum + p.assists, 0) / count).toFixed(1);
        const avgScore = (this.comparisonList.reduce((sum, p) => sum + p.scoutScore, 0) / count).toFixed(1);
        
        html += '<div class="comparison-row footer">';
        html += '<div class="comparison-cell"><strong>Average</strong></div>';
        html += '<div class="comparison-cell">-</div>';
        html += `<div class="comparison-cell"><strong>${avgGoals}</strong></div>`;
        html += `<div class="comparison-cell"><strong>${avgAssists}</strong></div>`;
        html += `<div class="comparison-cell"><strong>${avgScore}</strong></div>`;
        html += '</div>';
        
        html += '</div>';
        
        this.elements.comparisonContainer.innerHTML = html;
    }

    // Clear comparison list
    clearComparison() {
        this.comparisonList = [];
        this.updateComparisonView();
        this.updatePlayersDisplay();
        this.showNotification('Comparison cleared', 'info');
    }

// Show player details modal
    showPlayerDetails(player) {
        this.elements.modalPlayerName.textContent = player.name;
        
        const goalsPerGame = (player.goals / player.appearances).toFixed(2);
        const assistsPerGame = (player.assists / player.appearances).toFixed(2);
        
        const details = `
            <div class="player-details">
                <div class="detail-row">
                    <span class="detail-label">Team:</span>
                    <span class="detail-value">${this.sanitizeHTML(player.team)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">League:</span>
                    <span class="detail-value">${this.sanitizeHTML(player.league)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Appearances:</span>
                    <span class="detail-value">${player.appearances}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Goals:</span>
                    <span class="detail-value">${player.goals}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Assists:</span>
                    <span class="detail-value">${player.assists}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Scout Score:</span>
                    <span class="detail-value score-cell ${player.scoutScore >= 90 ? 'score-high' : player.scoutScore >= 85 ? 'score-medium' : 'score-low'}">
                        ${player.scoutScore}/100
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Goals per Game:</span>
                    <span class="detail-value">${goalsPerGame}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Assists per Game:</span>
                    <span class="detail-value">${assistsPerGame}</span>
                </div>
            </div>
            
            <div class="performance-summary">
                <h4>Performance Summary</h4>
                <p>
                    ${this.sanitizeHTML(player.name)} has scored ${player.goals} goals and provided ${player.assists} assists 
                    in ${player.appearances} appearances for ${this.sanitizeHTML(player.team)} in the ${this.sanitizeHTML(player.league)}.
                    This performance earns them a scout score of ${player.scoutScore}/100.
                </p>
            </div>
        `;
        
        this.elements.modalPlayerDetails.innerHTML = details;
        this.elements.playerModal.style.display = 'flex';
    }

    // Close modal
    closeModal() {
        this.elements.playerModal.style.display = 'none';
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${this.sanitizeHTML(message)}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Export data with error handling
    exportData() {
        try {
            if (this.filteredPlayers.length === 0) {
                this.showNotification('No data to export. Please search for players first.', 'warning');
                return;
            }

            const data = this.filteredPlayers.map(player => ({
                Name: player.name,
                Team: player.team,
                League: player.league,
                Appearances: player.appearances,
                Goals: player.goals,
                Assists: player.assists,
                'Scout Score': player.scoutScore
            }));

            // Convert to CSV
            const headers = Object.keys(data[0]).join(',');
            const rows = data.map(row => Object.values(row).join(','));
            const csv = [headers, ...rows].join('\n');

            // Create download link
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `football_scout_data_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.showNotification('Data exported successfully!', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Failed to export data. Please try again.', 'warning');
        }
    }
}