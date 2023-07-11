#!/usr/bin/env bash

cat <<EOT >> .env.production
NEXT_PUBLIC_BASE_URL="$NEXT_PUBLIC_BASE_URL"
EOT
