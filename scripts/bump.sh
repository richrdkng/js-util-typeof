#!/usr/bin/env bash

function bump-major {
    npm run gulp -- bump::major
}

function bump-minor {
    npm run gulp -- bump::minor
}

function bump-patch {
    npm run gulp -- bump::patch
}

case $1 in
    major)
        bump-major
        ;;

    minor)
        bump-minor
        ;;

    patch)
        bump-patch
        ;;

    *)
        bump-minor
        ;;
esac
