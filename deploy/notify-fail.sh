#!/bin/bash
set -e

payload="{
  \"attachments\": [{
    \"color\": \"danger\",
    \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$TRAVIS_TAG\` to \`$TARGET\` has FAILED!\n$1\"
  }]
}"
curl -f -X POST --data "$payload" -H 'Content-type: application/json' $SLACK_WEBHOOK_URL
