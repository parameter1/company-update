#!/bin/bash
set -e

payload="{
  \"attachments\": [{
    \"color\": \"#1d9bd1\",
    \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$TRAVIS_TAG\` to \`$TARGET\` has started.\"
  }]
}"
curl -f -X POST --data "$payload" -H 'Content-type: application/json' $SLACK_WEBHOOK_URL

# payload="{
#   \"deployment\": {
#     \"revision\": \"$TRAVIS_TAG\",
#     \"description\": \"Started\",
#     \"user\": \"TravisCD\"
#   }
# }"
# curl -f -X POST --data "$payload" \
#   -H 'Content-type: application/json' \
#   -H "X-Api-Key:$NR_APIKEY" \
#   https://api.newrelic.com/v2/applications/$NR_APPID/deployments.json
