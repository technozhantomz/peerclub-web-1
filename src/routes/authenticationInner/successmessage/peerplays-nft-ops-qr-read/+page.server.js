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

import { glb_username, server_nft_url,server_url, server_witness_node, user_private_key } from '../../../../stores.js';
import { get } from 'svelte/store';
import { saved_name } from '../../../../stores.js';

let store_glb_username = '';

saved_name.subscribe((value) =>
    store_glb_username = value);

let store_nft_url = get(server_nft_url);
let store_server_url = get(server_url);
let store_user_private_key = "";
let witness_node = get(server_witness_node);
//var witness_node = 'ws://mint.peerplays.download:8090';

user_private_key.subscribe((value) =>
    store_user_private_key = value);

let par_id;
let par_email;
let par_event_title;
let par_account_id;
let logo;
let bg_img;
let title;
let description;
let web_url;
let location;
let start_date;
let classname;
//let account_id = '1.2.624';

let user_uuid;


/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {


    console.log('URL :' + url.searchParams.get('id'));
    logo = url.searchParams.get('logo');
    bg_img = url.searchParams.get('bg_img');
    title = url.searchParams.get('title');
    description = url.searchParams.get('description');
    web_url = url.searchParams.get('web_url');
    location = url.searchParams.get('location');
    start_date = url.searchParams.get('start_date');
    classname = url.searchParams.get('classname');
    par_id = url.searchParams.get('id');
    par_email = url.searchParams.get('email');
    par_event_title = url.searchParams.get('title');
    par_account_id = url.searchParams.get('account_id');

    //transfer(url.searchParams.get('from'), url.searchParams.get('to'));
    //???createNFTMetaData();
    //createEventNFTMetadata("", "");
    getNftMetadata();
    //UpdateEventNFTMetadata("","","1.30.113");

    return {
        message: 'success message'
    };
}



async function sendInvitation() {

    const res = await fetch(store_server_url + 'sendInvitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_uuid": user_uuid,
            "event_id": par_id,
            "event_title": par_event_title,
            "email": par_email,
            "admin_username": store_glb_username

        })
    });

    const result_json = await res.json();
    console.log(JSON.stringify(result_json));

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

            //const result_find = json_base_uri.invited.filter(function (data) { return data.account_id == account_id });
            //console.log("User invited:" + JSON.stringify(result_find));
            json_base_uri.participation.push({ account_id: par_account_id, prt_status: "1", prt_dt: new Date() });

            /*if (result_find.length > 5000) {
                return;
            } else {

               
            }
            */
            console.log("final_base_uri:" + JSON.stringify(json_base_uri));
        }

    }

    UpdateEventNFTMetadataQrRead("", "", JSON.stringify(json_base_uri));

}

function randomNFTNameGeneration() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 10; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;

}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function createNFTMint(next_available_nft_metadata_id) {
    let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_mint', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            payer: '1.2.623',
            nft_metadata_id: next_available_nft_metadata_id,
            owner: '1.2.623',
            approved: '1.2.623',
            approved_operators: [],
            token_uri: '{"test_new": "data_test_new"}',

            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT MINT Broadcast success!');
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}


function UpdateEventNFTMetadataQrRead(pKey, owner, data_base_uri) {
    
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
                    console.log('NFT METADATA Update Broadcast success!');
                    sendInvitation();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}
