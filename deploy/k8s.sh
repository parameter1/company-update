#!/bin/bash
set -e

IMAGE=basecms/company-update-$1:$2

npx @endeavorb2b/rancher2cli dl basecms-service company-update-$1 $IMAGE

# payload="{
#   \"deployment\": {
#     \"revision\": \"$2\",
#     \"user\": \"TravisCD\"
#   }
# }"
# curl -f -X POST --data "$payload" \
#   -H 'Content-type: application/json' \
#   -H "X-Api-Key:$NR_APIKEY" \
#   https://api.newrelic.com/v2/applications/$3/deployments.json
