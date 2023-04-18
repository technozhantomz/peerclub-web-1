import { Apis } from 'peerplaysjs-lib/dist/index.js';
//from 'bitsharesjs-ws';

import {
    ChainStore,
    FetchChain,
    PrivateKey,
    TransactionHelper,
    Aes,
    TransactionBuilder
}
    from 'peerplaysjs-lib/dist/index.js';
import { NULL } from 'sass';
//from 'bitsharesjs';

import { server_nft_url,server_witness_node, saved_name } from '../../../../stores.js';
import { get } from 'svelte/store';
import { json } from '@sveltejs/kit';

let store_nft_url = get(server_nft_url);
let store_user_private_key = '';
let witness_node = get(server_witness_node);
//var witness_node = 'ws://mint.peerplays.download:8090';
let store_logon_username;
import { user_private_key } from '../../../../stores.js';


let id;
let logo;
let bg_img;
let title;
let description;
let web_url;
let location;
let start_date;
let classname;
let par_account_id;
let par_to_id;
let par_from_id;
let par_metadata_id;
let par_mint_id;
let sales_metadata_id = "1.30.229";

saved_name.subscribe((value) =>
    store_logon_username = value);

/** @type {import('./$types').PageServerLoad} */
export async function load({ url,cookies }) {

    //store_user_private_key = cookies.get('ses2');
    //console.log("cookies:" + cookies.get('ses2'));

    //CreateOffer();

    return {
        message: 'success message'
    };
}
/*
const offer = new Serializer('offer', {
    fee: asset,
    item_ids: set(protocol_id_type('nft')),
    issuer: protocol_id_type('account'),
    minimum_price: asset,
    maximum_price: asset,
    buying_item: bool,
    offer_expiration_date: time_point_sec,
    memo: optional(memo_data),
    extensions: set(future_extensions)
});
*/


function CreateOffer() {
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    //let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key
    let pKeyActive = PrivateKey.fromWif('5HveK2g8SXScnmFLCjoMsVxxshXbxr3GzdyMHhwTVFERJj7UoWP');
    //console.log("__________prv_key:" + store_user_private_key);

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        //let randomGeneratedNFTNameAndSymbol = randomNFTNameGeneration();
        let tr = new TransactionBuilder();
        tr.add_type_operation('offer', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            owner: '1.2.739',
            nft_metadata_id: sales_metadata_id,
            base_uri: '',
     
            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT METADATA Update Broadcast success!');
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}
