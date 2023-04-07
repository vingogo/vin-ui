#! /bin/bash

PACKAGE_VERSION=`node -p -e "require('./package.json').version"`
RELEASE_BRANCH="main"

if test $RELEASE_BRANCH != "$(git symbolic-ref --short -q HEAD)"; then
  echo 'Please switch to the main branch first.' >&2;
  exit 128;
fi

if test -n "$(git status --porcelain)"; then
  echo 'Unclean working tree. Commit or stash changes first.' >&2;
  exit 128;
fi

if ! git fetch --quiet 2>/dev/null; then
  echo 'There was a problem fetching your branch. Run `git fetch` to see more...' >&2;
  exit 128;
fi

if test "0" != "$(git rev-list --count --left-only @'{u}'...HEAD)"; then
  echo 'Remote history differ. Please pull changes.' >&2;
  exit 128;
fi

if [[ -z $1 ]]; then
  echo "Enter new version (currently $PACKAGE_VERSION): "
  read VERSION
else
  VERSION=$1
fi

if [ $VERSION = $PACKAGE_VERSION ]; then 
  echo "No version change, exiting"
  exit 1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r

echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo
  echo "* * * * * * * Releasing $VERSION * * * * * * *"
  echo

  # update package.json version to be used in the build
  npm version $VERSION --message "release: $VERSION"

  # build
  npm run build:lib

  # push
  git push origin refs/tags/v$VERSION
  git push
  
  # publish
  npm publish --access public
fi
