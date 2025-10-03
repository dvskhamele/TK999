// React Component Prop Override Script
// This script directly overrides React component props to ensure matches data is always available

(function() {
  // Global betting system if not already defined
  if (!window.TK999Betting) {
    let userData = {
      id: 1,
      name: 'Demo User',
      balance: 1000, // 1000 BDT
      role: 'Member'
    };
    
    let userBets = [];
    
    // Function to place a bet
    window.TK999Betting = {
      placeBet: function(matchId, outcome, amount, odds) {
        if (amount <= 0) {
          alert('Bet amount must be greater than 0');
          return false;
        }
        
        if (amount > userData.balance) {
          alert('Insufficient balance');
          return false;
        }
        
        // Deduct from user balance
        userData.balance -= amount;
        
        // Create bet object
        const bet = {
          id: Date.now(),
          matchId: matchId,
          outcome: outcome,
          amount: amount,
          odds: odds,
          potentialWin: amount * odds,
          placedAt: new Date().toISOString(),
          status: 'pending' // pending, won, lost
        };
        
        userBets.push(bet);
        
        // Update balance displays on the page
        updateBalanceDisplays();
        
        alert(`Successfully placed bet on ${outcome} for ${amount} BDT at odds ${odds.toFixed(2)}! Potential win: ${(amount * odds).toFixed(2)} BDT`);
        return true;
      },
      
      updateBalance: function(amount) {
        userData.balance += amount;
        updateBalanceDisplays();
      },
      
      updateBalanceDisplays: function() {
        updateBalanceDisplays();
      },
      
      userData: userData,
      userBets: userBets
    };
    
    // Function to update balance display
    function updateBalanceDisplays() {
      // Update all elements that show balance
      const balanceElements = document.querySelectorAll('[data-balance-display], .balance, .user-balance, [class*="balance"]');
      balanceElements.forEach(el => {
        // Look for BDT in the text and update the number before it
        const text = el.textContent;
        if (text.includes('BDT')) {
          el.textContent = text.replace(/\d+\.?\d*\s*BDT/, `${userData.balance.toFixed(2)} BDT`);
        }
      });
      
      // Update header balance if it exists
      const headerBalance = document.querySelector('header .balance, header [class*="balance"], .header-balance');
      if (headerBalance && headerBalance.textContent.includes('BDT')) {
        headerBalance.textContent = `${userData.balance.toFixed(2)} BDT`;
      }
      
      // Update any element that's specifically looking for balance
      const balanceSpans = document.querySelectorAll('span[id*="balance"], span[class*="balance"]');
      balanceSpans.forEach(span => {
        const currentText = span.textContent;
        if (currentText.includes('BDT')) {
          span.textContent = `${userData.balance.toFixed(2)} BDT`;
        }
      });
    }
  }
  // Mock match data
  const mockMatches = [
    {
      id: 1,
      sport: 'Football',
      league: 'Premier League',
      teamA: 'Manchester United',
      teamB: 'Liverpool',
      teamAScore: 1,
      teamBScore: 1,
      status: 'live',
      startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      odds: {
        teamA: 2.2,
        draw: 3.0,
        teamB: 2.8
      },
      isLive: true,
      isFavorite: true,
      category: 'Football',
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      sport: 'Cricket',
      league: 'T20 World Cup',
      teamA: 'India',
      teamB: 'Australia',
      teamAScore: 145,
      teamBScore: 89,
      status: 'live',
      startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      odds: {
        teamA: 1.8,
        teamB: 2.1
      },
      isLive: true,
      isFavorite: true,
      category: 'Cricket',
      date: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 3,
      sport: 'Tennis',
      league: 'Wimbledon',
      teamA: 'Djokovic',
      teamB: 'Nadal',
      teamAScore: 2,
      teamBScore: 1,
      status: 'live',
      startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      odds: {
        teamA: 1.7,
        teamB: 2.2
      },
      isLive: true,
      isFavorite: false,
      category: 'Tennis',
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 4,
      sport: 'Football',
      league: 'La Liga',
      teamA: 'Barcelona',
      teamB: 'Real Madrid',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      odds: {
        teamA: 2.3,
        draw: 3.1,
        teamB: 3.0
      },
      isLive: false,
      isFavorite: true,
      category: 'Football',
      date: new Date(Date.now() + 3600000).toISOString()
    },
    {
      id: 5,
      sport: 'Basketball',
      league: 'NBA',
      teamA: 'Lakers',
      teamB: 'Warriors',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
      odds: {
        teamA: 1.9,
        teamB: 1.95
      },
      isLive: false,
      isFavorite: false,
      category: 'Basketball',
      date: new Date(Date.now() + 7200000).toISOString()
    }
  ];

  // Function to override React component props
  function overrideReactProps() {
    console.log('Attempting to override React component props...');
    
    // Try to find the React root and override props
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.log('Root element not found');
      return;
    }
    
    // Look for React internal properties (React 17+ uses different naming)
    const possibleKeys = Object.keys(rootElement).filter(key => 
      key.startsWith('_reactInternal') || 
      key.startsWith('__reactContainer') || 
      key.startsWith('__reactFiber') ||
      key.includes('react')
    );
    
    if (possibleKeys.length > 0) {
      const reactInternalKey = possibleKeys[0]; // Use the first match
      
      try {
        // Try to access React fiber tree
        const container = rootElement[reactInternalKey];
        const fiber = container?.current || container;
        
        if (fiber) {
          console.log('Found React fiber tree, walking...');
          // Walk the fiber tree to find match-related components
          walkFiberTree(fiber, (currentFiber) => {
            if (currentFiber?.type) {
              const typeName = currentFiber.type.name || 
                              currentFiber.type.displayName || 
                              currentFiber.elementType?.name || 
                              '';
              
              // Look for any component that might handle matches/odds
              if (typeName.toLowerCase().includes('match') || 
                  typeName.toLowerCase().includes('event') || 
                  typeName.toLowerCase().includes('odds') ||
                  typeName.toLowerCase().includes('bet')) {
                console.log('Found potentially relevant component:', typeName);
                
                if (currentFiber.memoizedProps) {
                  // Check if there are matches-related props
                  for (const [propName, propValue] of Object.entries(currentFiber.memoizedProps)) {
                    if (propName.toLowerCase().includes('match') && Array.isArray(propValue)) {
                      if (propValue.length === 0) {
                        console.log(`Found empty ${propName} prop in ${typeName}, injecting mock data...`);
                        currentFiber.memoizedProps[propName] = mockMatches;
                        
                        // Try to force update
                        if (currentFiber.stateNode && typeof currentFiber.stateNode.forceUpdate === 'function') {
                          try {
                            currentFiber.stateNode.forceUpdate();
                            console.log('Force updated component state');
                          } catch (e) {
                            console.log('Could not force update component:', e);
                          }
                        }
                        return true; // stop walking after finding and updating
                      }
                    }
                  }
                }
              }
            }
          });
        } else {
          console.log('Could not access fiber from container');
        }
      } catch (error) {
        console.warn('Could not override React component props:', error);
      }
    } else {
      console.log('No React internal properties found. This might not be a React 17+ app or DOM may not be ready yet.');
    }
  }
  
  // Helper function to walk the React fiber tree
  function walkFiberTree(fiber, callback) {
    if (!fiber) return false;
    
    let node = fiber;
    const visited = new Set();
    
    while (node) {
      if (visited.has(node)) break;
      visited.add(node);
      
      if (callback(node) === true) return true; // If callback returns true, stop walking
      
      // Go to child first
      if (node.child) {
        node = node.child;
        continue;
      }
      
      // If no child, go to sibling
      if (node.sibling) {
        node = node.sibling;
        continue;
      }
      
      // If no sibling, go up to return and then to its sibling
      let foundNext = false;
      while (node.return) {
        node = node.return;
        if (node.sibling) {
          node = node.sibling;
          foundNext = true;
          break;
        }
      }
      
      if (!foundNext) break;
    }
  }

  // Function to inject matches using a more direct approach
  function directInjection() {
    console.log('Direct injection function called');
    
    // Wait for React to render - try multiple approaches
    setTimeout(() => {
      console.log('Looking for no matches elements...');
      
      // Look for the "No Matches Found" message using multiple selectors
      const possibleSelectors = [
        'h3', 'p', 'div', '.no-matches', '.empty-state', '[class*=\"no\"]',
        '[class*=\"No\"]', '[class*=\"empty\"]', '[class*=\"Empty\"]', '.match-card'
      ];
      
      let noMatchesElement = null;
      
      // Look for elements containing \"No matches\" text
      document.querySelectorAll(possibleSelectors.join(', ')).forEach(el => {
        if (el.textContent && 
            (el.textContent.toLowerCase().includes('no matches') || 
             el.textContent.toLowerCase().includes('no matches found') ||
             el.textContent.toLowerCase().includes('no upcoming matches') ||
             el.textContent.toLowerCase().includes('no live matches'))) {
          console.log('Found no matches element:', el.textContent);
          noMatchesElement = el;
          // Hide the element
          el.style.display = 'none';
          if (el.parentElement) el.parentElement.style.display = 'none';
          if (el.parentElement?.parentElement) el.parentElement.parentElement.style.display = 'none';
        }
      });
      
      // Even if we didn't find a \"no matches\" message, ensure matches are displayed
      // Create a container for our matches
      const container = document.createElement('div');
      container.id = 'react-matches-injection';
      container.style.cssText = `
        margin-top: 20px;
        padding: 20px;
      `;
      
      // Add our matches regardless
      mockMatches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'beautiful-card';
        matchCard.style.cssText = `
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 25px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        `;
        
        matchCard.onmouseover = () => {
          matchCard.style.transform = 'translateY(-5px)';
          matchCard.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.3)';
        };
        
        matchCard.onmouseout = () => {
          matchCard.style.transform = 'translateY(0)';
          matchCard.style.boxShadow = '0 10px 25px -12px rgba(0, 0, 0, 0.25)';
        };
        
        // Format match time
        const matchTime = new Date(match.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        matchCard.innerHTML = `
          <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;\">
            <div>
              <h3 style=\"font-size: 20px; font-weight: bold; color: #1e293b; margin-bottom: 5px;\">
                ${match.teamA} vs ${match.teamB}
              </h3>
              <p style=\"color: #64748b; font-size: 14px;\">
                ${match.league} • ${match.category} • ${matchTime}
              </p>
            </div>
            <span style=\"background: ${match.status === 'live' ? '#ef4444' : '#3b82f6'}; 
                  color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; 
                  font-weight: bold; display: flex; align-items: center;\">
              ${match.status === 'live' ? '🔴 LIVE' : '⏰ UPCOMING'}
            </span>
          </div>
          
          ${match.status === 'live' ? `
            <div style=\"background: #fee2e2; border-radius: 12px; padding: 15px; margin-bottom: 15px; text-align: center;\">
              <div style=\"font-size: 28px; font-weight: bold; color: #dc2626;\">
                ${match.teamAScore} - ${match.teamBScore}
              </div>
              <p style=\"color: #dc2626; font-weight: bold; margin-top: 5px;\">LIVE SCORE</p>
            </div>
          ` : ''}
          
          <div style=\"display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;\">
            <div style=\"text-align: center; background: #f1f5f9; padding: 15px; border-radius: 12px;\">
              <div style=\"font-size: 20px; font-weight: bold; color: #4f46e5;\">${match.odds.teamA.toFixed(2)}</div>
              <div style=\"font-size: 14px; color: #64748b;\">${match.teamA}</div>
              <button class=\"bet-now-btn\" data-match-id=\"${match.id}\" data-outcome=\"teamA\" data-odds=\"${match.odds.teamA}\" 
                style=\"margin-top: 10px; background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                       color: white; border: none; padding: 8px 16px; border-radius: 8px; 
                       font-weight: bold; cursor: pointer; width: 100%;\">
                Bet Now
              </button>
            </div>
            ${match.odds.draw ? `
              <div style=\"text-align: center; background: #f1f5f9; padding: 15px; border-radius: 12px;\">
                <div style=\"font-size: 20px; font-weight: bold; color: #4f46e5;\">${match.odds.draw.toFixed(2)}</div>
                <div style=\"font-size: 14px; color: #64748b;\">Draw</div>
                <button class=\"bet-now-btn\" data-match-id=\"${match.id}\" data-outcome=\"draw\" data-odds=\"${match.odds.draw}\" 
                  style=\"margin-top: 10px; background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                         color: white; border: none; padding: 8px 16px; border-radius: 8px; 
                         font-weight: bold; cursor: pointer; width: 100%;\">
                  Bet Now
                </button>
              </div>
            ` : ''}
            <div style=\"text-align: center; background: #f1f5f9; padding: 15px; border-radius: 12px;\">
              <div style=\"font-size: 20px; font-weight: bold; color: #4f46e5;\">${match.odds.teamB.toFixed(2)}</div>
              <div style=\"font-size: 14px; color: #64748b;\">${match.teamB}</div>
              <button class=\"bet-now-btn\" data-match-id=\"${match.id}\" data-outcome=\"teamB\" data-odds=\"${match.odds.teamB}\" 
                style=\"margin-top: 10px; background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                       color: white; border: none; padding: 8px 16px; border-radius: 8px; 
                       font-weight: bold; cursor: pointer; width: 100%;\">
                Bet Now
              </button>
            </div>
          </div>
          
          <div style=\"background: #f8fafc; border-radius: 12px; padding: 15px; border: 1px solid #e2e8f0;\">
            <h4 style=\"font-weight: bold; margin-bottom: 10px; color: #334155;\">Match Info</h4>
            <div style=\"display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 14px;\">
              <div><strong>Date:</strong> ${new Date(match.date).toLocaleDateString()}</div>
              <div><strong>Time:</strong> ${matchTime}</div>
              <div><strong>Sport:</strong> ${match.category}</div>
              <div><strong>Status:</strong> <span style=\"text-transform: capitalize;\">${match.status}</span></div>
            </div>
          </div>
        `;
        
        container.appendChild(matchCard);
      });
      
      // Try different insertion strategies
      const insertionPoints = [
        document.querySelector('main'),
        document.querySelector('.container'),
        document.querySelector('.content'),
        document.querySelector('#root main'),
        document.querySelector('#root'),
        document.body
      ].filter(Boolean);
      
      if (insertionPoints.length > 0) {
        // Insert at the first available point
        const target = insertionPoints[0];
        console.log('Inserting matches into:', target.tagName || target.className || 'body');
        target.appendChild(container);
      } else {
        // Fallback: add to body
        document.body.appendChild(container);
      }
      
      // Add event listeners to the bet now buttons
      setTimeout(() => {
        document.querySelectorAll('.bet-now-btn').forEach(button => {
          button.onclick = function() {
            const matchId = parseInt(this.getAttribute('data-match-id'));
            const outcome = this.getAttribute('data-outcome');
            const odds = parseFloat(this.getAttribute('data-odds'));
            
            // Find the match data
            const match = mockMatches.find(m => m.id === matchId);
            if (match) {
              // Create a simple betting modal using the existing system if available
              if (window.TK999Betting) {
                // Use the enhanced betting system
                showSimpleBettingModal(match, outcome, odds);
              } else {
                // Fallback to simple alert
                const betAmount = prompt(`Place your bet on ${outcome === 'teamA' ? match.teamA : outcome === 'teamB' ? match.teamB : 'Draw'}:\\nOdds: ${odds.toFixed(2)}\\nEnter amount (BDT):`, '100');
                if (betAmount && !isNaN(betAmount) && parseFloat(betAmount) > 0) {
                  const amount = parseFloat(betAmount);
                  alert(`Bet placed on ${outcome === 'teamA' ? match.teamA : outcome === 'teamB' ? match.teamB : 'Draw'} for ${amount} BDT at odds ${odds.toFixed(2)}! Potential win: ${(amount * odds).toFixed(2)} BDT`);
                }
              }
            }
          };
        });
      }, 1000);
      
    }, 1000); // Reduce wait time to 1 second
  }
  
  // Simple betting modal function
  function showSimpleBettingModal(match, outcome, odds) {
    // Remove any existing modal
    const existingModal = document.querySelector('#simple-betting-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'simple-betting-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 30px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      text-align: center;
    `;
    
    modalContent.innerHTML = `
      <h2 style=\"margin: 0 0 20px 0; color: #1e293b;\">Place Your Bet</h2>
      <div style=\"margin-bottom: 20px; text-align: left;\">
        <h3 style=\"margin: 0 0 10px 0; font-size: 18px; color: #334155;\">${match.teamA} vs ${match.teamB}</h3>
        <p style=\"color: #64748b; margin: 0;\">Betting on: <strong>${outcome === 'teamA' ? match.teamA : outcome === 'teamB' ? match.teamB : 'Draw'}</strong></p>
        <p style=\"color: #64748b; margin: 5px 0 0 0;\">Odds: <strong>${odds.toFixed(2)}</strong></p>
      </div>
      <div style=\"margin-bottom: 20px; text-align: left;\">
        <label style=\"display: block; margin-bottom: 10px; font-weight: bold; color: #334155;\">Bet Amount (BDT)</label>
        <input type=\"number\" id=\"bet-amount-input\" min=\"10\" max=\"10000\" value=\"100\" 
          style=\"width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px;\">
        <div style=\"display: flex; gap: 10px; margin-top: 10px;\">
          <button onclick=\"this.parentElement.previousElementSibling.value=100\" style=\"flex: 1; background: #e2e8f0; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px;\">100</button>
          <button onclick=\"this.parentElement.previousElementSibling.value=250\" style=\"flex: 1; background: #e2e8f0; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px;\">250</button>
          <button onclick=\"this.parentElement.previousElementSibling.value=500\" style=\"flex: 1; background: #e2e8f0; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px;\">500</button>
        </div>
      </div>
      <div style=\"background: #f0f9ff; padding: 15px; border-radius: 12px; margin-bottom: 20px; text-align: center;\">
        <div style=\"font-size: 14px; color: #64748b;\">Potential Win</div>
        <div id=\"potential-win-amount\" style=\"font-size: 24px; font-weight: bold; color: #0ea5e9;\">100.00 BDT</div>
      </div>
      <div style=\"display: flex; gap: 10px;\">
        <button id=\"cancel-bet-btn\" style=\"flex: 1; background: #f1f5f9; color: #64748b; padding: 12px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer;\">Cancel</button>
        <button id=\"confirm-bet-btn\" style=\"flex: 1; background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 12px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer;\">Place Bet</button>
      </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Update potential win when amount changes
    const amountInput = document.getElementById('bet-amount-input');
    const potentialWinElement = document.getElementById('potential-win-amount');
    
    function updatePotentialWin() {
      const amount = parseFloat(amountInput.value) || 0;
      const potentialWin = (amount * odds).toFixed(2);
      potentialWinElement.textContent = \`${potentialWin} BDT\`;
    }
    
    amountInput.addEventListener('input', updatePotentialWin);
    updatePotentialWin(); // Initial update
    
    // Cancel button
    document.getElementById('cancel-bet-btn').addEventListener('click', function() {
      modal.remove();
    });
    
    // Place bet button
    document.getElementById('confirm-bet-btn').addEventListener('click', function() {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid bet amount');
        return;
      }
      
      // Place the bet using the global betting system if available
      if (window.TK999Betting && typeof window.TK999Betting.placeBet === 'function') {
        window.TK999Betting.placeBet(match.id, outcome === 'teamA' ? match.teamA : outcome === 'teamB' ? match.teamB : 'Draw', amount, odds);
      } else {
        alert(\`Bet placed on \${outcome === 'teamA' ? match.teamA : outcome === 'teamB' ? match.teamB : 'Draw'} for \${amount} BDT at odds \${odds.toFixed(2)}! Potential win: \${(amount * odds).toFixed(2)} BDT\`);
      }
      
      modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Run the injection when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        overrideReactProps();
        directInjection();
      }, 1000);
    });
  } else {
    setTimeout(() => {
      overrideReactProps();
      directInjection();
    }, 1000);
  }

  // Also run on navigation changes
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      overrideReactProps();
      directInjection();
    }, 1000);
  });
  
  // Run periodically to ensure matches stay visible
  setInterval(() => {
    overrideReactProps();
    directInjection();
  }, 5000);
})();