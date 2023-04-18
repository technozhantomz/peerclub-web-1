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
let store_user_private_key = "";
let witness_node = get(server_witness_node);
let logo;
let bg_img;
let title;
let description;
let web_url;
let location;
let start_date;
let classname;
let par_max_supply;
let par_account_id;


/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {


    console.log('URL :' + url.searchParams.get('description'));
    logo = url.searchParams.get('logo');
    bg_img = url.searchParams.get('bg_img');
    title = url.searchParams.get('title');
    description = url.searchParams.get('description');
    web_url = url.searchParams.get('web_url');
    location = url.searchParams.get('location');
    start_date = url.searchParams.get('start_date');
    classname = url.searchParams.get('classname');
    par_max_supply = url.searchParams.get('max_supply');
    par_account_id = url.searchParams.get('account_id');

    store_user_private_key = cookies.get('ses2');

    //transfer(url.searchParams.get('from'), url.searchParams.get('to'));
    //???createNFTMetaData();
    //createEventNFTMetadata("", "");
    getNextAvailableNftMetadataId();

    return {
        message: 'success message'
    };
}

async function getNextAvailableNftMetadataId() {

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
    console.log("next_available_nft_metadata_id: " + result_json[0].next_available_nft_metadata_id);
    //let result_string = JSON.stringify(result_json);
    //console.log('result: ' + result_string);

    createEventNFTMetadata("", "", result_json[0].next_available_nft_metadata_id);

}


function transfer(pFrom, pTo) {


    /*
    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('OUR PAGE SERVER !!!! YESS CONNECTED NOW!!! connected to:', res[0].network);
    });
    */

    var nobroadcast = false;
    var amount_to_send = 10000;
    var asset_to_send = 'TEST';
    var from_account = pFrom;
    var to_account = pTo;
    var memo_text = 'Your memo goes in here..';

    let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('ABC connected to:', res[0].network);

        ChainStore.init(nobroadcast).then(() => {
            let fromAccount = from_account;
            let memoSender = fromAccount;
            let memo = memo_text;

            let toAccount = to_account;

            let sendAmount = {
                amount: amount_to_send,
                asset: asset_to_send
            };

            Promise.all([
                FetchChain('getAccount', fromAccount),
                FetchChain('getAccount', toAccount),
                FetchChain('getAccount', memoSender),
                FetchChain('getAsset', sendAmount.asset),
                FetchChain('getAsset', sendAmount.asset)
            ]).then((res) => {
                // console.log("got data:", res);
                let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;

                // Memos are optional, but if you have one you need to encrypt it here
                let memoFromKey = memoSender.getIn(['options', 'memo_key']);
                console.log('memo pub key:', memoFromKey);
                let memoToKey = toAccount.getIn(['options', 'memo_key']);
                let nonce = TransactionHelper.unique_nonce_uint64();

                let memo_object = {
                    from: memoFromKey,
                    to: memoToKey,
                    nonce,
                    message: Aes.encrypt_with_checksum(pKeyMemo, memoToKey, nonce, memo)
                };

                let tr = new TransactionBuilder(1);

                tr.add_type_operation('transfer', {
                    fee: {
                        amount: 0,
                        asset_id: feeAsset.get('id')
                    },
                    from: fromAccount.get('id'),
                    to: toAccount.get('id'),
                    amount: { amount: sendAmount.amount, asset_id: sendAsset.get('id') },
                    memo: memo_object
                });

                tr.set_required_fees().then(() => {
                    tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
                    console.log('serialized transaction:', tr.serialize());
                    tr.broadcast();
                });
            });
        });
    });

}


function randomNFTNameGeneration() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 10; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

    return text;

}

/*
    {
    fee: asset,
    owner: protocol_id_type('account'),
    name: string,
    symbol: string,
    base_uri: string,
    revenue_partner: optional(protocol_id_type('account')),
    revenue_split: optional(uint16),
    is_transferable: bool,
    is_sellable: bool,
    account_role: optional(protocol_id_type('account_role')),
    extensions: set(future_extensions)
    } 
*/
/*

const nft_lottery_options = new Serializer('nft_lottery_options', {
  benefactors: array(benefactor),
  winning_tickets: array(uint16),
  ticket_price: asset,
  end_date: time_point_sec,
  ending_on_soldout: bool,
  is_active: bool,
  delete_tickets_after_draw: bool,
  progressive_jackpots: array(protocol_id_type('nft_metadata'))
});
*/

/*
const nft_metadata_create = new Serializer('nft_metadata_create', {
  fee: asset,
  owner: protocol_id_type('account'),
  name: string,
  symbol: string,
  base_uri: string,
  revenue_partner: optional(protocol_id_type('account')),
  revenue_split: optional(uint16),
  is_transferable: bool,
  is_sellable: bool,
  account_role: optional(protocol_id_type('account_role')),
  max_supply: optional(uint64),
  lottery_options: optional(nft_lottery_options),
  extensions: set(future_extensions)
});

const nft_metadata_update = new Serializer('nft_metadata_update', {
  fee: asset,
  owner: protocol_id_type('account'),
  nft_metadata_id: protocol_id_type('nft_metadata_id'),
  name: optional(string),
  symbol: optional(string),
  base_uri: optional(string),
  revenue_partner: optional(protocol_id_type('account')),
  revenue_split: optional(uint16),
  is_transferable: optional(bool),
  is_sellable: optional(bool),
  account_role: optional(protocol_id_type('account_role')),
  extensions: set(future_extensions)
});

const nft_mint = new Serializer('nft_mint', {
  fee: asset,
  payer: protocol_id_type('account'),
  nft_metadata_id: protocol_id_type('nft_metadata'),
  owner: protocol_id_type('account'),
  approved: protocol_id_type('account'),
  approved_operators: set(protocol_id_type('account')),
  token_uri: string,
  extensions: set(future_extensions)
});


*/
function createNFTMetaData() {
    let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let randomGeneratedNFTNameAndSymbol = randomNFTNameGeneration();
        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_create', {
            fee: {
                amount: 0.001,
                asset_id: '1.3.0'
            },
            owner: '1.2.623',
            name: randomGeneratedNFTNameAndSymbol,
            symbol: randomGeneratedNFTNameAndSymbol,
            base_uri: '{"aaa_new" : "bbb_new"}',
            //revenue_partner: optional(protocol_id_type('account')),
            //revenue_split: optional(uint16),
            revenue_partner: '1.2.624',
            revenue_split: 1,
            is_transferable: false,
            is_sellable: true,
            //account_role: optional(protocol_id_type('account_role')),
            //account_role: '1.32.0',
            max_supply: 21000000,
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

function createNFTMint(next_available_nft_metadata_id) {
    //let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
    let pKeyActive = PrivateKey.fromWif(store_user_private_key);

    let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_mint', {
            fee: {
                amount: 0.000000,
                asset_id: '1.3.0'
            },
            payer: par_account_id,
            nft_metadata_id: next_available_nft_metadata_id,
            owner: par_account_id,
            approved: par_account_id,
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

function createEventNFTMetadata(pKey, owner, next_available_nft_metadata_id) {
    let pKeyActive = PrivateKey.fromWif(store_user_private_key);
    //let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

    let JsonDataBaseUri = {
        prj_data_type: "PCL-NFM-1",
        id: next_available_nft_metadata_id,
        logo: "___LOGO___",
        bg_img: "___BG_IMG___",
        title: "___TITLE___",
        description: "___DESC___",
        web_url: "___WEB_URL__",
        location: "__LOCATION___",
        start: "___START_DATE___",
        end: "___START_DATE___",
        className: "___CLASSNAME___",
        allDay: false,
        rec_dt: new Date(),
        invited: [],
        replied: [],
        participation: []
    };

    let strJsonDataBaseUri = JSON.stringify(JsonDataBaseUri);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___LOGO___", logo);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___BG_IMG___", bg_img);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___TITLE___", title);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___DESC___", description);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___WEB_URL__", web_url);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("__LOCATION___", location);
    strJsonDataBaseUri = strJsonDataBaseUri.replaceAll("___START_DATE___", start_date);
    strJsonDataBaseUri = strJsonDataBaseUri.replace("___CLASSNAME___", classname);


    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

        let randomGeneratedNFTNameAndSymbol = randomNFTNameGeneration();
        let tr = new TransactionBuilder();
        tr.add_type_operation('nft_metadata_create', {
            fee: {
                amount: 0.00000,
                asset_id: '1.3.0'
            },
            owner: par_account_id,
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
            max_supply: par_max_supply,
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
                    createNFTMint(next_available_nft_metadata_id);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    });
}





/*
export async function _TESTCONNECTTOCHAIN() {
    var witness_node = 'ws://mint.peerplays.download:8090';

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('OUR PAGE SERVER !!!! YESS CONNECTED NOW!!! connected to:', res[0].network);
    });
}
*/