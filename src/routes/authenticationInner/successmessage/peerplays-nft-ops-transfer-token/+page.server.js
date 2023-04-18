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
let store_login_username;
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

//saved_name.subscribe((value) =>
//    store_login_username = value);

/** @type {import('./$types').PageServerLoad} */
export async function load({ url,cookies }) {

    //store_user_private_key = cookies.get('ses2');
    //console.log("cookies:" + cookies.get('ses2'));
    store_login_username = cookies.get('login_username');
    //console.log("cookies:" + cookies.get('login_username'));

    TransferToken();

    return {
        message: 'success message'
    };
}

function TransferToken() {
    var nobroadcast = false;
    var amount_to_send = 100000000;
    var asset_to_send = 'TEST';
    var from_account = 'nathan';
    var to_account = store_login_username;
    var memo_text = 'memo ..';

    let pKeyActive = PrivateKey.fromWif('5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'); // Replace with your own Active Private Key
    let pKeyMemo = PrivateKey.fromWif('5K9GjbGS4xk8BGYDhrRWM4JvJaavkkG95EtmPw5sUmjFF8e5cGu'); // Replace with your own Memo Private Key

    Apis.instance(witness_node, true).init_promise.then((res) => {
        console.log('connected to:', res[0].network);

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


                let tr = new TransactionBuilder();

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
