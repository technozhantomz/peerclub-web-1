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
let par_to_id;
let par_from_id;
let par_metadata_id;
let par_mint_id;
let sales_metadata_id = "1.30.229";


/** @type {import('./$types').PageServerLoad} */
export async function load({ url,cookies }) {

    //console.log("test_Cookie____:" + cookies.get('ses'));

    //user_private_key.subscribe((value) =>
     //   store_user_private_key = value);
    store_user_private_key = cookies.get('ses2');
    //console.log("_________prv_key:___" + store_user_private_key);
    console.log("cookies:" + cookies.get('ses2'));


    console.log('URL :' + url.searchParams.get('id'));

    par_from_id = url.searchParams.get('from');
    par_to_id = url.searchParams.get('to');
    par_metadata_id = url.searchParams.get('id');
    par_mint_id = url.searchParams.get('mint_id');

    //transfer(url.searchParams.get('from'), url.searchParams.get('to'));
    //???createNFTMetaData();
    //createEventNFTMetadata("", "");
    getNftMetadata();
    //UpdateEventNFTMetadata("","","1.30.113");

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

        if (sales_metadata_id == result_json[i].nft_metadata_id) {

            let req_uuid = uuidv4();
            json_base_uri = JSON.parse(result_json[i].token_uri_2);
           //json_base_uri.requests = [];
            json_base_uri.requests.push({ req_id: req_uuid, metadata_id: par_metadata_id,mint_id: par_mint_id, from: par_from_id, to: par_to_id, status: "0", req_dt: new Date() });

           console.log("updated_base_uri:" + JSON.stringify(json_base_uri));
        }

    }

    UpdateEventNFTMetadata("", "", JSON.stringify(json_base_uri));

}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


function UpdateEventNFTMetadata(pKey, owner, data_base_uri) {
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    //let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key
    let pKeyActive = PrivateKey.fromWif('5HveK2g8SXScnmFLCjoMsVxxshXbxr3GzdyMHhwTVFERJj7UoWP');
    //console.log("__________prv_key:" + store_user_private_key);

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        //let randomGeneratedNFTNameAndSymbol = randomNFTNameGeneration();
        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_update', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            owner: '1.2.739',
            nft_metadata_id: sales_metadata_id,
            base_uri: data_base_uri,
     
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
