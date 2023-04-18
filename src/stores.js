import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store';

export const glb_username = writable('PeerUser1');
export const server_url = writable('http://localhost:9090/peerplays/event/v1/eventctrl/');
export const server_user_url = writable('http://localhost:9090/peerplays/user/v1/userctrl/');
export const server_nft_url = writable('http://localhost:9090/peerplays/nft/v1/nftctrl/');
export const server_sso_url = writable('http://localhost:4593/api/');
export const server_sso_api_key = writable('token QZFZRWpF05jd4yZRKQwxJv4sEXWf32Qm');
export const login_user_uuid = writable('.');
export const server_witness_node = writable('ws://mint.peerplays.download:8090');


export let saved_name = persist(writable("..."), createLocalStorage(), "name");
export let user_private_key = persist(writable("5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af"), createLocalStorage(), "private_key");
export let account_id = persist(writable("."), createLocalStorage(), "owner_key");

export let user_info = {username : "" , user_token:""};
//import { Apis } from 'peerplaysjs-lib/dist/index.js';

/*
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
        console.log('testConnectEXTERNAL CONNECTED NOW!!! connected to:', res[0].network);
    });
}

// testConnect();
*/
