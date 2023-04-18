import { Apis } from 'peerplaysjs-lib/dist/index.js';
//from 'bitsharesjs-ws';
export const ssr =false;

import crypto from 'crypto';

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

//user_private_key.subscribe((value) =>
    //console.log("key1______________" + value));


let store_nft_url = get(server_nft_url);
let store_server_url = get(server_url);
let store_user_private_key = get(user_private_key);
let witness_node = get(server_witness_node);
//var witness_node = 'ws://mint.peerplays.download:8090';

let par_id;
let par_email;
let par_event_title;
let logo;
let bg_img;
let title;
let description;
let web_url;
let location;
let start_date;
let classname;
//let account_id = '1.2.624';
let user_uuid_list = "";

let user_uuid;
/*
import { onMount } from 'svelte';
onMount(async () => {
    user_private_key.subscribe((value) =>
        console.log("onmount:" +value));
});
*/



/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {

   // const store_key = writable(window.localStorage.getItem("user_private_key"));

   // user_private_key.subscribe((value) =>
     //   console.log("key2______________" +value));
    
        console.log("______cookie:" + cookies.get('ses2'));

   /* cookies.set('test', "qwerty123456", {
        maxAge: 30 * 24 * 60 * 60 * 1000 // stay logged in for 30 days
    });
    */

       // console.log("store_key:"+store_key);

    //console.log('URL :' + url.searchParams.get('id'));
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
    //par_account_id = url.searchParams.get('account_id');

    //getNftMetadata();
    //UpdateEventNFTMetadata("","","1.30.113");
    //createBunkerSalesNFTMetadata();
    //UpdateEventNFTMetadataTransfer();

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

            let arrEmails = par_email.split(",");
            console.log(arrEmails.length);
            for (let j = 0; j < arrEmails.length; j++) {
            
                user_uuid = uuidv4();
                user_uuid_list = user_uuid_list +  "," + user_uuid;
                json_base_uri.invited.push({ inv_uuid: user_uuid, account_id: "", invitation_sent: "1", invitation_dt: new Date() });

            }


          
            /*if (result_find.length > 5000) {
                return;
            } else {

               
            }
            */
            console.log("uuid_list:" + user_uuid_list);
            console.log("final_base_uri:" + JSON.stringify(json_base_uri));
        }

    }

    //UpdateEventNFTMetadataInvite("", "", JSON.stringify(json_base_uri));

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

function createBunkerSalesNFTMetadata() {
    //let pKeyActive = PrivateKey.fromWif(store_user_private_key);
    let pKeyActive = PrivateKey.fromWif('5HveK2g8SXScnmFLCjoMsVxxshXbxr3GzdyMHhwTVFERJj7UoWP');
    //let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    let JsonDataBaseUri = {
        prj_data_type: "PCL-SLS-1",
        id: '1.30.229',
        requests: []
    };

    let strJsonDataBaseUri = JSON.stringify(JsonDataBaseUri);
 

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let randomGeneratedNFTNameAndSymbol = randomNFTNameGeneration();
        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_create', {
            fee: {
                amount: 0.00000,
                asset_id: '1.3.0'
            },
            owner: '1.2.739',
            name: randomGeneratedNFTNameAndSymbol,
            symbol: randomGeneratedNFTNameAndSymbol,
            base_uri: strJsonDataBaseUri,
            //base_uri: '{"aaa_new" : "bbb_new"}',
            //revenue_partner: optional(protocol_id_type('account')),
            //revenue_split: optional(uint16),
            revenue_partner: '1.2.624',
            revenue_split: 1,
            is_transferable: true,
            is_sellable: true,
            //account_role: optional(protocol_id_type('account_role')),
            //account_role: '1.32.0',
            max_supply: 100000000,
            /*
            lottery_options: {
                benefactors: [],
                winning_tickets: [],
                ticket_price: {
                    amount: 0.001,
                    asset_id: '1.3.0'
                },
                end_date: time_point_sec,
                //ending_on_soldout: bool,
                is_active: true,
                delete_tickets_after_draw: false,
                progressive_jackpots: {}
            },
            */


            //lottery_options: null,
            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT METADATA Broadcast success!');
                    createNFTMint();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}



function createNFTMint() {
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyActive = PrivateKey.fromWif('5HveK2g8SXScnmFLCjoMsVxxshXbxr3GzdyMHhwTVFERJj7UoWP'); // Replace with your own Active Private Key
    //let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key
    
    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_mint', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            payer: '1.2.739',
            nft_metadata_id: '1.30.229',
            owner: '1.2.739',
            approved: '1.2.739',
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


/*
var nft_safe_transfer_from = new Serializer('nft_safe_transfer_from', {
    fee: asset,
    operator_: protocol_id_type('account'),
    from: protocol_id_type('account'),
    to: protocol_id_type('account'),
    token_id: protocol_id_type('nft'),
    data: string,
    extensions: set(future_extensions)
});

*/

function UpdateEventNFTMetadataTransfer() {
    
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    //let pKeyActive = PrivateKey.fromWif(store_user_private_key);
    let pKeyActive = PrivateKey.fromWif("5K9GjbGS4xk8BGYDhrRWM4JvJaavkkG95EtmPw5sUmjFF8e5cGu");

    

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_safe_transfer_from', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            operator_:'1.2.695',
            from: '1.2.695',
            to: '1.2.623',
            data: 'transfer_test',
            token_id: '1.31.200',
            extensions: {}

        });
        tr.set_required_fees().then(() => {
            tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
            console.log('serialized transaction:', tr.serialize().operations);
            tr.broadcast()
                .then(() => {
                    console.log('NFT MINT Transfer Broadcast success!');
                    //sendInvitation();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}
