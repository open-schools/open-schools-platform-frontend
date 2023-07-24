#!/usr/bin/env bash

cat <<EOT >> .env.production
NEXT_PUBLIC_BASE_URL="$NEXT_PUBLIC_BASE_URL"
NEXT_PUBLIC_apiKey="$NEXT_PUBLIC_apiKey"
NEXT_PUBLIC_authDomain="$NEXT_PUBLIC_authDomain"
NEXT_PUBLIC_projectId="$NEXT_PUBLIC_projectId"
NEXT_PUBLIC_storageBucket="$NEXT_PUBLIC_storageBucket"
NEXT_PUBLIC_messagingSenderId="$NEXT_PUBLIC_messagingSenderId"
NEXT_PUBLIC_appId="$NEXT_PUBLIC_appId"
NEXT_PUBLIC_measurementId="$NEXT_PUBLIC_measurementId"
HELP_REQUISITES="$HELP_REQUISITES"
EOT
