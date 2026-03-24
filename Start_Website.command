#!/bin/bash
# ============================================================
# Start_Website.command — Double-click to run the full site
# ============================================================

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "🚀 Starting DealerDistributor Website..."

# 1. Start PHP Backend in a new terminal window
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/php-backend' && php -S localhost:8001 router.php\""

# 2. Start React Frontend in a new terminal window
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/frontend' && npm start\""

echo "✅ Launch commands sent to Terminal."
echo "Wait for the browser to open automatically..."
sleep 2
exit
