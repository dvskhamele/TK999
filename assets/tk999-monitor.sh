#!/bin/bash

# Simple background monitor for TK999 betting platform
# This script runs in the background and continuously ensures the app works properly

# Function to log messages
log_message() {
  echo "$(date): $1" >> /tmp/tk999-monitor.log 2>/dev/null || true
}

# Function to check if server is running and start it if not
ensure_server_running() {
  # Check if node process with server.js is running
  if ! pgrep -f "node.*server.js" > /dev/null 2>&1; then
    log_message "Server not running, starting it..."
    cd /Users/test/startups/deploy-68cc53904a126d00086a9168
    # Start server in background with nohup
    nohup node server.js > /tmp/tk999-server.log 2>&1 &
    log_message "Server started with PID $!"
  fi
}

# Function to apply CSS fixes if needed
apply_css_fixes() {
  local css_file="/Users/test/startups/deploy-68cc53904a126d00086a9168/assets/custom-fixes.css"
  
  # Check if our fixes are already in place
  if ! grep -q "Fix for transparent elements - TK999 Monitor" "$css_file" 2>/dev/null; then
    log_message "Applying CSS fixes..."
    
    # Append our fixes
    cat >> "$css_file" << 'EOF'

/* Fix for transparent elements - TK999 Monitor */
/* Ensure all gradient backgrounds are solid */
.bg-gradient-to-r {
  background-image: none !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix specific problematic gradients */
.bg-gradient-to-r.from-purple-500.to-pink-500,
.bg-gradient-to-r.from-amber-500.to-orange-500,
.bg-gradient-to-r.from-blue-500.to-blue-600,
.bg-gradient-to-r.from-rose-500.to-red-500,
.bg-gradient-to-r.from-indigo-700.via-purple-700.to-pink-700 {
  background: linear-gradient(135deg, #8b5cf6, #ec4899) !important;
  color: #ffffff !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix header elements */
.beautiful-header,
.dashboard-header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899) !important;
  color: #ffffff !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix card elements */
.beautiful-card,
.card,
.stunning-card,
.dashboard-card,
.dashboard-profile-card,
.dashboard-stats-card,
.dashboard-wallet-card-enhanced,
.dashboard-notification-card,
.card-dashboard,
.card-matches,
.card-transactions,
.card-notifications,
.card-settings {
  background: white !important;
  border: 1px solid #e2e8f0 !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix button elements */
.beautiful-btn,
.btn,
.stunning-btn,
.dashboard-nav-btn,
.beautiful-nav-btn,
.btn-primary,
.btn-success,
.btn-warning,
.btn-danger,
.btn-secondary {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  color: #ffffff !important;
  border: none !important;
  opacity: 1 !important;
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
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix table elements */
.beautiful-table,
.data-table,
.dashboard-table,
table {
  background: #ffffff !important;
  color: #000000 !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix text elements */
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
.beautiful-wallet-card {
  background: linear-gradient(135deg, #10b981, #3b82f6) !important;
  color: #ffffff !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix user profile */
.beautiful-user-profile {
  background: #4f46e5 !important;
  color: #ffffff !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Fix nav buttons */
.beautiful-nav-btn {
  background: #4f46e5 !important;
  color: #ffffff !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
EOF
    log_message "CSS fixes applied"
  fi
}

# Main monitoring loop
log_message "Starting TK999 background monitor..."
while true; do
  # Ensure server is running
  ensure_server_running
  
  # Apply CSS fixes if needed
  apply_css_fixes
  
  # Wait 30 seconds before next check
  sleep 30
done