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

import { server_nft_url, server_witness_node, user_private_key } from '../../../../stores.js';
import { get } from 'svelte/store';

let store_nft_url = get(server_nft_url);
//var witness_node = 'ws://mint.peerplays.download:8090';
let store_user_private_key = get(user_private_key);
let witness_node = get(server_witness_node);
let par_id;
let par_user_uuid;
let par_account_id;


/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {


    console.log('URL :' + url.searchParams.get('id'));
    par_id = url.searchParams.get('token');
    par_user_uuid = url.searchParams.get('user_uuid');
    par_account_id = url.searchParams.get('account_id');


    getNftMetadata();

    return {
        message: 'success message'
    };
}

async function getNftMetadata() {

    const res = await fetch(store_nft_url + 'getnftfulldata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nft_detail_id_start": "0",
            "nft_detail_id_end": "9999999999",
            "rec_limit": "10",
            "start_date_time_epoch": "1671992077",
            "end_date_time_epoch": "9999999999",
            "account_id": "624",
            "event_name_substr": ""

        })
    });

    const result_json = await res.json();
    let json_base_uri;
    for (let i = 0; i < result_json.length; i++) {

        if (par_id == result_json[i].nft_metadata_id) {

            json_base_uri = JSON.parse(result_json[i].token_uri_2);

            json_base_uri.replied.push({ inv_uuid: par_user_uuid, account_id: par_account_id, reply_dt: new Date(), status: "1", });

            const result_find_invite = json_base_uri.invited.filter(function (data) { return data.inv_uuid == par_user_uuid });
            console.log("User inv found:" + JSON.stringify(result_find_invite));
            result_find_invite[0].account_id = par_account_id;
           /*
            if (result_find.length > 0) {
                return;
            } else {

                json_base_uri.replied.push({ account_id: par_account_id, reply_dt: new Date(), status: "1", });

            }
            */

            console.log("final_base_uri_email_ops:" + JSON.stringify(json_base_uri));
        }

    }

    UpdateEventNFTMetadataReply("", "", JSON.stringify(json_base_uri));

}

function randomNFTNameGeneration() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 10; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;

}


function UpdateEventNFTMetadataReply(pKey, owner, data_base_uri) {
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyActive = PrivateKey.fromWif(store_user_private_key);


    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_update', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            owner: '1.2.623',
            nft_metadata_id: par_id,
            base_uri: data_base_uri,
            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT METADATA Update/Email Broadcast success!');
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}
