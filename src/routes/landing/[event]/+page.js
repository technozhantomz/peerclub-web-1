export const ssr = false;

import { error } from '@sveltejs/kit';

import { get } from 'svelte/store';
import { server_nft_url } from '../../../stores.js';
let store_server_nft_url = get(server_nft_url);
/** @type {import('./$types').PageLoad} */
export function load({ params }) {

    return getEventMetadata(params.event);
   
    /*
    if (params.event === 'test-event') {
        return {
            title: 'Hello world!',
            content: 'Welcome to event. Lorem ipsum dolor sit amet...'
        };
    }

    throw error(404, 'Not found');
    */
}


async function getEventMetadata(par_event) {
    const res = await fetch(store_server_nft_url + 'getnftfulldata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nft_detail_id_start: '0',
            nft_detail_id_end: '9999999999',
            rec_limit: '10',
            start_date_time_epoch: '1671992077',
            end_date_time_epoch: '9999999999',
            account_id: '624',
            event_name_substr: ''
        })
    });

    const result_json = await res.json();
    //console.log('result_data_size: ' + result_json.length);
    let event_data = null;
    let str_par_event = par_event.replaceAll("-", " ");

    for (let i = 0; i < result_json.length; i++) {

        let base_uri = JSON.parse(result_json[i].token_uri_2).title;

        //if (par_event == result_json[i].token_uri_2) {
        if (base_uri != undefined){

            if (base_uri.toLowerCase().includes(str_par_event.toLowerCase())){

                console.log("found matched data");
                event_data = JSON.parse(result_json[i].token_uri_2);

            }

        }
        

    }

    return event_data;
}