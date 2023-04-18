#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm use v18

# rm -rfv .svelte-kit
# npm i

# rm -rfv ./node_modules/bitsharesjs-ws
# mkdir ./node_modules/bitsharesjs-ws
# cp -Rvf ../../deps/PEERPLAYSJS_LIB_V2/bitsharesjs-ws/*  ./node_modules/bitsharesjs-ws/
# touch ./node_modules/bitsharesjs-ws

# rm -rfv ./node_modules/bitsharesjs
# mkdir ./node_modules/bitsharesjs
# cp -Rvf ../../deps/PEERPLAYSJS_LIB_V2/bitsharesjs/*  ./node_modules/bitsharesjs/
# touch ./node_modules/bitsharesjs

# export NODE_OPTIONS=--max-old-space-size=8192
export NODE_OPTIONS=--max-old-space-size=6144
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'

time  npm run build 
