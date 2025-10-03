#!/bin/bash

# Background fix daemon for TK999 betting platform
# This script runs in the background and continuously applies fixes

LOG_FILE="/tmp/tk999-bg-fix.log"

# Function to log messages
log_message() {
  echo "$(date): $1" >> "$LOG_FILE"
}

# Function to apply CSS fixes
apply_css_fixes() {
  local css_file="/Users/test/startups/deploy-68cc53904a126d00086a9168/assets/custom-fixes.css"
  
  # Check if the file contains our fixes
  if ! grep -q "Fix for transparent elements - added by bg-fix-daemon" "$css_file" 2>/dev/null; then
    log_message "Applying CSS fixes to $css_file"
    
    # Append our fixes to the file
    cat >> "$css_file" << 'EOF'

/* Fix for transparent elements - added by bg-fix-daemon */
/* Remove all backdrop-filter effects causing transparency */
* {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix specific gradient buttons */
.bg-gradient-to-r.from-blue-500.to-blue-600 {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  color: #ffffff !important;
}

.bg-gradient-to-r.from-purple-500.to-pink-500 {
  background: linear-gradient(135deg, #8b5cf6, #ec4899) !important;
  color: #ffffff !important;
}

.bg-gradient-to-r.from-amber-500.to-orange-500 {
  background: linear-gradient(135deg, #f59e0b, #f97316) !important;
  color: #ffffff !important;
}

.bg-gradient-to-r.from-rose-500.to-red-500 {
  background: linear-gradient(135deg, #f43f5e, #ef4444) !important;
  color: #ffffff !important;
}

.bg-gradient-to-r.from-purple-600.to-pink-500 {
  background: linear-gradient(135deg, #7c3aed, #ec4899) !important;
  color: #ffffff !important;
}

/* Fix header elements */
.beautiful-header,
.dashboard-header,
.bg-gradient-to-r.from-indigo-700.via-purple-700.to-pink-700 {
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899) !important;
  color: #ffffff !important;
}

/* Fix other elements */
.beautiful-card,
.card,
.stunning-card,
.dashboard-card {
  background: white !important;
  border: 1px solid #e2e8f0 !important;
}

.beautiful-btn,
.btn,
.stunning-btn,
.dashboard-nav-btn {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix input elements */
.beautiful-input,
.form-input,
.form-select,
.form-textarea,
input, select, textarea {
  background: #ffffff !important;
  color: #000000 !important;
  border: 2px solid #e2e8f0 !important;
}

/* Fix table elements */
.beautiful-table,
.data-table,
.dashboard-table,
table {
  background: #ffffff !important;
  color: #000000 !important;
}

.beautiful-table th,
.table-header,
.dashboard-table th,
th {
  background: #f1f5f9 !important;
  color: #000000 !important;
}

/* Fix text colors */
.text-gray-500,
.text-gray-600,
.text-gray-700,
.text-gray-800,
.text-gray-900 {
  color: #000000 !important;
}

.text-white {
  color: #ffffff !important;
}

/* Fix wallet card */
.beautiful-wallet-card,
.dashboard-wallet-card {
  background: linear-gradient(135deg, #10b981, #3b82f6) !important;
  color: #ffffff !important;
}

/* Fix user profile */
.beautiful-user-profile,
.dashboard-user-profile {
  background: #4f46e5 !important;
  color: #ffffff !important;
}

/* Fix navigation buttons */
.beautiful-nav-btn,
.dashboard-nav-btn {
  background: #4f46e5 !important;
  color: #ffffff !important;
}
EOF
    
    log_message "CSS fixes applied successfully"
  fi
}

# Function to inject mock data
inject_mock_data() {
  local html_file="/Users/test/startups/deploy-68cc53904a126d00086a9168/index.html"
  
  # Check if the file contains our mock data injection
  if ! grep -q "window.injectedMockMatches" "$html_file" 2>/dev/null; then
    log_message "Injecting mock data into $html_file"
    
    # Add mock data injection to the HTML file
    sed -i '' '/<\/script>/i\
    <script>\
      // Inject mock match data\
      window.injectedMockMatches = [\
        {\
          id: 1,\
          sport: "Football",\
          league: "Premier League",\
          teamA: "Manchester United",\
          teamB: "Liverpool",\
          teamAScore: 1,\
          teamBScore: 1,\
          status: "live",\
          startTime: new Date(Date.now() - 3600000),\
          odds: {\
            teamA: 2.2,\
            draw: 3.0,\
            teamB: 2.8\
          },\
          isLive: true,\
          isFavorite: true,\
          category: "Football",\
          date: new Date(Date.now() - 3600000).toISOString()\
        },\
        {\
          id: 2,\
          sport: "Cricket",\
          league: "T20 World Cup",\
          teamA: "India",\
          teamB: "Australia",\
          teamAScore: 145,\
          teamBScore: 89,\
          status: "live",\
          startTime: new Date(Date.now() - 7200000),\
          odds: {\
            teamA: 1.8,\
            teamB: 2.1\
          },\
          isLive: true,\
          isFavorite: true,\
          category: "Cricket",\
          date: new Date(Date.now() - 7200000).toISOString()\
        },\
        {\
          id: 3,\
          sport: "Tennis",\
          league: "Wimbledon",\
          teamA: "Djokovic",\
          teamB: "Nadal",\
          teamAScore: 2,\
          teamBScore: 1,\
          status: "live",\
          startTime: new Date(Date.now() - 3600000),\
          odds: {\
            teamA: 1.7,\
            teamB: 2.2\
          },\
          isLive: true,\
          isFavorite: false,\
          category: "Tennis",\
          date: new Date(Date.now() - 3600000).toISOString()\
        },\
        {\
          id: 4,\
          sport: "Football",\
          league: "La Liga",\
          teamA: "Barcelona",\
          teamB: "Real Madrid",\
          teamAScore: null,\
          teamBScore: null,\
          status: "upcoming",\
          startTime: new Date(Date.now() + 3600000),\
          odds: {\
            teamA: 2.3,\
            draw: 3.1,\
            teamB: 3.0\
          },\
          isLive: false,\
          isFavorite: true,\
          category: "Football",\
          date: new Date(Date.now() + 3600000).toISOString()\
        },\
        {\
          id: 5,\
          sport: "Basketball",\
          league: "NBA",\
          teamA: "Lakers",\
          teamB: "Warriors",\
          teamAScore: null,\
          teamBScore: null,\
          status: "upcoming",\
          startTime: new Date(Date.now() + 7200000),\
          odds: {\
            teamA: 1.9,\
            teamB: 1.95\
          },\
          isLive: false,\
          isFavorite: false,\
          category: "Basketball",\
          date: new Date(Date.now() + 7200000).toISOString()\
        }\
      ];\
    </script>' "$html_file"
    
    log_message "Mock data injection added successfully"
  fi
}

# Function to restart server if needed
restart_server_if_needed() {
  # Check if server is running on port 8080
  if ! lsof -i :8080 >/dev/null 2>&1; then
    log_message "Server not running on port 8080, starting it..."
    cd /Users/test/startups/deploy-68cc53904a126d00086a9168
    nohup node server.js > /tmp/tk999-server.log 2>&1 &
    log_message "Server started in background with PID $!"
  fi
}

# Main loop - run continuously in background
log_message "Starting background fix daemon..."
while true; do
  # Apply CSS fixes
  apply_css_fixes
  
  # Inject mock data
  inject_mock_data
  
  # Restart server if needed
  restart_server_if_needed
  
  # Wait 60 seconds before next check
  sleep 60
done