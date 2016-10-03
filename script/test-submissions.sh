#!/usr/bin/env bash

# nullglob makes globs return empty string if no matches found
# required for following for loop
shopt -s nullglob

red_bold="$(tput setaf 1)$(tput bold)"
white_bold="$(tput setaf 15)$(tput bold)"
cyan_bold="$(tput setaf 6)$(tput bold)"
reset="$(tput sgr0)"

warn(){
  echo "${red_bold}WARNING:${white_bold}" "$@" "${reset}"
}

notice(){
  echo "${cyan_bold}NOTICE:${white_bold}" "$@" "${reset}"
}

exit_code=0

for submission in ./lab-*;do
  pushd . > /dev/null
  cd "$submission"

  notice "running npm in directory ${submission}/test"
  npm i 
  if [[ "$?" -ne 0 ]];then 
    warn "npm failed in directory ${submission}/test"
    exit_code=1
  fi
 

  notice "running eslint in directory ${submission}/test"
  eslint --quiet --ignore-path "../.eslintignore" --config "../.eslintrc" .
  if [[ "$?" -ne 0 ]];then 
    warn "eslint failed in directory ${submission}/test"
    exit_code=1
  fi

  notice "running mocha in directory ${submission}/test"
  mocha
  if [[ "$?" -ne 0 ]];then 
    warn "mocha failed in directory ${submission}/test"
    exit_code=1
  fi
  popd > /dev/null
done

exit $exit_code
