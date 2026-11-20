#!/bin/bash
set -e
cd "$(dirname "$0")"
PORT=4186
if ! command -v python3 >/dev/null 2>&1; then
  echo 'Python 3 is required: https://www.python.org/downloads/'
  read -r -p 'Press Enter to exit...'
  exit 1
fi
if ! curl -fsS "http://127.0.0.1:$PORT" >/dev/null 2>&1; then
  nohup python3 -m http.server "$PORT" --bind 127.0.0.1 > /tmp/cps-sports-local.log 2>&1 &
  sleep 1
fi
open "http://127.0.0.1:$PORT" 2>/dev/null || echo "Visit http://127.0.0.1:$PORT"
echo "CPS SPORTS — http://127.0.0.1:$PORT"
