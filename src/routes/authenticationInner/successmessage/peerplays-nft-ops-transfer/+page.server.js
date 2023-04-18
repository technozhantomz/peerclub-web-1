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

import { server_nft_url,server_witness_node } from '../../../../stores.js';
import { get } from 'svelte/store';
import { json } from '@sveltejs/kit';

let store_nft_url = get(server_nft_url);
let store_user_private_key = '';
let witness_node = get(server_witness_node);
//var witness_node = 'ws://mint.peerplays.download:8090';

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
let par_from_id;
let par_to_id;
let par_mint_id;
let par_req_id;

let updated_json_base_uri


/** @type {import('./$types').PageServerLoad} */
export async function load({ url,cookies }) {

    //console.log("test_Cookie____:" + cookies.get('ses'));

    //user_private_key.subscribe((value) =>
     //   store_user_private_key = value);
    store_user_private_key = cookies.get('ses2');
    //console.log("_________prv_key:___" + store_user_private_key);
    console.log("cookies:" + cookies.get('ses2'));


    console.log('URL :' + url.searchParams.get('from'));
  

    par_from_id = url.searchParams.get('from');
    par_to_id = url.searchParams.get('to');
    par_mint_id = url.searchParams.get('mint_id');
    par_req_id = url.searchParams.get('req_id');
 

    getNftMetadata();
    //UpdateEventNFTMintTransfer();

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

        if ("1.30.229" == result_json[i].nft_metadata_id) {

            json_base_uri = JSON.parse(result_json[i].token_uri_2);

            //json_base_uri.logo = logo;
            const result_find_requests = json_base_uri.requests.filter(function (data) { return data.req_id == par_req_id });
            result_find_requests[0].status = "1";
            updated_json_base_uri = json_base_uri;
            console.log("found:" + JSON.stringify(result_find_requests));
        }

    }

    UpdateEventNFTMintTransfer();

}


function UpdateEventNFTMintTransfer() {

    let pKeyActive = PrivateKey.fromWif(store_user_private_key);
   // let pKeyActive = PrivateKey.fromWif("5K9GjbGS4xk8BGYDhrRWM4JvJaavkkG95EtmPw5sUmjFF8e5cGu");


    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_safe_transfer_from', {
            fee: {
                amount: 0.000,
                asset_id: '1.3.0'
            },
            operator_: par_from_id,
            from: par_from_id,
            to: par_to_id,
            data: 'transfer_test',
            token_id: par_mint_id,
            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT MINT Transfer Broadcast success!');
                    UpdateEventNFTMetadataRequest();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}

function UpdateEventNFTMetadataRequest() {
    let pKeyActive = PrivateKey.fromWif('5HveK2g8SXScnmFLCjoMsVxxshXbxr3GzdyMHhwTVFERJj7UoWP');

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_update', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            owner: '1.2.739',
            nft_metadata_id: '1.30.229',
            base_uri: JSON.stringify(updated_json_base_uri),

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