#!/usr/bin/env bash

export VISUAL=nano
export EDITOR="$VISUAL"

npm run bump -- "$@"

git commit
