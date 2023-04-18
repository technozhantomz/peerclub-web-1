//import { Apis } from 'peerplaysjs-lib/dist/index.js';

import { Apis } from 'bitsharesjs-ws';
import {
    ChainStore,
    FetchChain,
    PrivateKey,
    TransactionHelper,
    Aes,
    TransactionBuilder
} 
//from 'peerplaysjs-lib/dist/index.js';
from 'bitsharesjs';



export function testConnectEXTERNAL() {
    var witness_node = 'ws://mint.peerplays.download:8090';

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('YESS CONNECTED NOW!!! connected to:', res[0].network);
    });
}

// testConnect();
