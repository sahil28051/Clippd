#! /usr/bin/env bash

[[ $TRACE ]] && set -x
set -euo pipefail

# export input variables
readonly env=${1:-}
readonly region="eu-west-1"
if [ -z $env ]; then
  echo -e "* [ERROR] environment not provided"
  exit 1
fi
export $(grep -v '^#' .codebuild/${env}.env | xargs)

export testNickname="tester$((1 + $RANDOM % 1000))"
export testEmail="${testNickname}@clippdx.com"

aws lambda invoke --cli-binary-format raw-in-base64-out \
  --payload "{\"userEmail\": \"$testEmail\", \"isCoach\": \"False\", \"firstName\": \"Automation\", \"lastName\": \"Tester\", \"nickName\": \"$testNickname\"}" \
  --function-name ${env}-${region}-meta-create-user .response-create

user_id=$(aws cognito-idp admin-get-user --user-pool-id ${user_pool_id} --username ${testEmail} | jq -r ".UserAttributes[0].Value")
user_id=${user_id//-/}
printf "user=${testEmail}\nuser_id=${user_id}" > .user
printf "{\n \"host\": \"https://dev.clippd.com\",\n \"DEFAULT_USER_EMAIL\": \"${testEmail}\",\n \"DEFAULT_USER_PASSWORD\": \"ClippdUser2021\",\n \"WHS_USER_EMAIL\": \"gazal+edwhs@clippd.io\",\n \"WHS_USER_PASSWORD\": \"Test@@123\"\n}\n" > cypress.env.json

aws dynamodb update-item --table-name ${env}-${region}-users \
  --key "{\"userId\": {\"S\": \"${user_id}\"}}" \
  --update-expression "SET #DOB = :dob, #FN = :fn, #G = :g, #HCP = :hcp, #LN = :ln, #PA = :pa, #UT = :ut" \
  --expression-attribute-names file://.codebuild/expr-attr-names.json \
  --expression-attribute-values file://.codebuild/expr-attr-values.json  \
  --return-values ALL_NEW

aws lambda invoke --cli-binary-format raw-in-base64-out \
  --payload "{\"key\":\"$shots_key_1\", \"table\":\"shots\", \"mutations\":{ \"player_id\":\"${user_id}\" }}" \
  --function-name ${env}-${region}-manual-shots-loader .response-load

aws lambda invoke --cli-binary-format raw-in-base64-out \
  --payload "{\"result\":\"success\", \"userId\":\"${user_id}\"}" \
  --function-name ${env}-${region}-algorithms-trigger .response-trigger

sleep 30
ch_root_pwd=$(aws ssm get-parameters --names ${env}-${region}-clickhouse-root-pwd --with-decryption --query "Parameters[*].{Value:Value}" --output text)
echo "select * from ${ch_db}.player_dashboard WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
