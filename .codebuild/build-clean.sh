#! /usr/bin/env bash

[[ $TRACE ]] && set -x
set -euo pipefail

# export environment variables
readonly env=${1:-}
readonly region="eu-west-1"
if [ -z $env ]; then
  echo -e "* [ERROR] environment not provided"
  exit 1
fi
export $(grep -v '^#' .codebuild/${env}.env | xargs)
source .user

ch_root_pwd=$(aws ssm get-parameters --names ${env}-${region}-clickhouse-root-pwd --with-decryption --query "Parameters[*].{Value:Value}" --output text)
echo "ALTER table ${ch_db}.activity_report DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.app_overview_clubs DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.app_overview_last_five_rounds DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.app_overview_last_round DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.arg_masthead DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.monthly_breakdown DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.ott_overview DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.ott_overview_last_five_rounds DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.ott_overview_last_round DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.player_dashboard DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.put_masthead DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.refresh_audit DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-
echo "ALTER table ${ch_db}.shots_raw DELETE WHERE player_id='${user_id}'" | curl "https://root:${ch_root_pwd}@${ch_host}:8443/" --data-binary @-

aws dynamodb delete-item --table-name ${env}-${region}-users --key "{\"userId\": {\"S\": \"${user_id}\"}}" 
aws cognito-idp admin-delete-user --user-pool-id ${user_pool_id} --username ${user}