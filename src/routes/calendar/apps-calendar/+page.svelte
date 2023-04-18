<script>
	// RUN DEV we need this line
	// FOR PREVIEW DELETE THE FOLLOWING LINE
	import '@fullcalendar/core/vdom';
	import FullCalendar, { Draggable } from 'svelte-fullcalendar';

	import {
		Card,
		CardBody,
		Container,
		Modal,
		ModalBody,
		ModalHeader,
		Row,
		Col,
		Label
	} from 'sveltestrap';

	import BootstrapTheme from '@fullcalendar/bootstrap';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import { CalendarIcon } from 'svelte-feather-icons';
	import CDeleteModal from '../../../Components/Common/CDeleteModal.svelte';
	import UpcommingEvents from '../UpcommingEvents.svelte';
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
	import CalendarEventsList from '../../../common/data/calender';

	import { glb_username, user_info, user_private_key,account_id,saved_name } from '../../../stores.js';
	import { server_url, server_nft_url } from '../../../stores.js';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	import { Circle3 } from 'svelte-loading-spinners';
	import RangeSlider from 'svelte-range-slider-pips';
	import Grid from 'gridjs-svelte';
	import { html, h } from 'gridjs';

	let isDataLoading = true;
	let isPrivateKEy = false;
	let metadata_url_to_go = '';

	let isOpen = false;
	let calendarComponentRef;
	let calendarWeekends = true;
	let modalcategory = false;
	let setEvent = {};
	let isedit = false;
	let setSelectedDay = '';
	let deleteModal = false;

	// Getting live data
	let store_server_url = get(server_url);
	let store_server_nft_url = get(server_nft_url);
	let peerclubEvents;
	let foo = 'baz';
	let bar = 'qux';
	let result_string = null;
	let options;
	let event_uuid_del;
	let emailList = '';
	let store_user_private_key = '';
	let store_account_id = '';
	let event_size = [5];
	user_private_key.subscribe((value) => (store_user_private_key = value));

	let login_username;

	saved_name.subscribe((value) => (login_username = value));
	account_id.subscribe((value) => (store_account_id = value));

	let data = [];

	let columns = [
		'ID',
		{
			name: 'Email',
			//width: '180px',
			formatter: (cell, row) => html(`<label"> ${cell} </label>`)
		}

		/*{
			name: 'Actions',
			width: '120px',
			formatter: (cell, row) => {
				return h(
					'button',
					{
						className: 'btn btn-warning',
						onClick: () => delDataFromGrid(`${row.cells[0].data}`)
					},
					'Delete'
				);
			}
		}
		*/
	];

	let data_index = 1;

	function addDataToGrid() {
		const validateEmail = emailList
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);

		if (validateEmail == null) {
			alert('Please enter valid email address.!');
			return;
		}

		let new_data = ['' + data_index, emailList, '1'];

		data.push(new_data);
		columns = columns;
		console.log(data);
		data_index++;
	}

	function delDataFromGrid(row_id) {
		console.log('row_id:' + row_id);
	}

	onMount(async () => {
		//getUserEventsForCalendar('','');
		//console.log("allcokies:" +document.cookie);
		console.log("login_username:" + login_username);

		if(login_username == "...") {

		goto("/authenticationInner/login/auth-signin-basic");
		}

	});

	function setPrivateKeyAndContinue() {
		//
		//console.log('prv_key:' + store_user_private_key + '  url:' + metadata_url_to_go);
		//user_private_key.set(store_user_private_key);
		$user_private_key = store_user_private_key;
		document.cookie = "ses2=" + store_user_private_key +"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;  path=/; Secure";
		
		goto(metadata_url_to_go);
	}

	async function getUserEventsForCalendar(arg1, arg2) {
		peerclubEvents = null;
		const res = await fetch(store_server_url + 'getuserevents', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ foo, bar })
		});

		const result_json = await res.json();

		result_string = JSON.stringify(result_json);
		//console.lo  g('result: ' + result_string);
		peerclubEvents = JSON.stringify(result_json);
		CalendarEventsList.defaultevent = result_json;

		options = {
			plugins: [BootstrapTheme, dayGridPlugin, interactionPlugin],
			/* events: CalendarEventsList.events, */
			events: result_json,
			weekends: { calendarWeekends },
			themeSystem: 'bootstrap',
			handleWindowResize: true,
			slotDuration: '00:15:00',
			editable: true,
			droppable: true,
			selectable: true,
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,dayGridWeek,dayGridDay'
			},
			dateClick: (event) => handleDateClick(event.dateStr),
			eventClick: (event) => handleEventClick(event)
		};
	}

	//getUserEventsForCalendar('', '');

	function putUserEventsMetaData(
		user_uuid,
		image_url,
		title,
		description,
		event_location,
		start_date,
		class_name,
		logo,
		bg_img,
		web_url
	) {
		let url_params = '?logo=' + logo;
		url_params = url_params + '&bg_img=' + bg_img;
		url_params = url_params + '&title=' + title;
		url_params = url_params + '&description=' + description;
		url_params = url_params + '&web_url=' + web_url;
		url_params = url_params + '&location=' + event_location;
		url_params = url_params + '&classname=' + class_name;
		url_params = url_params + '&start_date=' + start_date;
		url_params = url_params + '&max_supply=' + event_size;
		url_params = url_params + '&account_id=' + store_account_id;
		//goto('/authenticationInner/successmessage/peerplays-nft-ops' + url_params);

		metadata_url_to_go = '/authenticationInner/successmessage/peerplays-nft-ops' + url_params;
		isPrivateKEy = true;
		isOpen = false;
	}

	/**
	 * @param {string} event_uuid
	 * @param {string} user_uuid
	 * @param {string} image_url
	 * @param {string} title
	 * @param {string} description
	 * @param {string} event_location
	 * @param {string} start_date
	 * @param {string} class_name
	 * @param {string} logo
	 * @param {string} bg_img
	 * @param {string} web_url
	 */
	async function setUserEventsMetadata(
		event_uuid,
		user_uuid,
		image_url,
		title,
		description,
		event_location,
		start_date,
		class_name,
		logo,
		bg_img,
		web_url,
		par_owner_id
	) {

		if(par_owner_id != store_account_id){

			alert("Other people's events can't edit.!");
			return;

		}

		let url_params = '?id=' + event_uuid;
		url_params = url_params + '&logo=' + logo;
		url_params = url_params + '&bg_img=' + bg_img;
		url_params = url_params + '&title=' + title;
		url_params = url_params + '&description=' + description;
		url_params = url_params + '&web_url=' + web_url;
		url_params = url_params + '&location=' + event_location;
		url_params = url_params + '&classname=' + class_name;
		url_params = url_params + '&start_date=' + start_date;
		url_params = url_params + '&account_id=' + store_account_id;

		//goto('/authenticationInner/successmessage/peerplays-nft-ops-update' + url_params);
		metadata_url_to_go =
			'/authenticationInner/successmessage/peerplays-nft-ops-update' + url_params;
		isPrivateKEy = true;
		isOpen = false;
	}

	async function getEventMetadata() {
		peerclubEvents = null;

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
		console.log('result_data_size: ' + result_json.length);

		let arrEvents = [];
		//let eventObj = JSON.parse(result_json[28].token_uri_2);
		//arrEvents.push(eventObj);

		for (let i = 0; i < result_json.length; i++) {
			//parse project_id
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined) {
				
				

				//console.log(JSON.parse(result_json[i].token_uri_2).prj_data_type );
				if(JSON.parse(result_json[i].token_uri_2).prj_data_type == "PCL-NFM-1"){
				let calendar_data =JSON.parse(result_json[i].token_uri_2);
				calendar_data.owner_id = result_json[i].owner_id;
				arrEvents.push(calendar_data);
				}
				
			}
			//arrEvents.push(JSON.parse(result_json[i].token_uri_2));
			//console.log(JSON.parse(result_json[i].token_uri_2).invited);
		}

		peerclubEvents = arrEvents;
		CalendarEventsList.defaultevent = arrEvents;
		options = {
			plugins: [BootstrapTheme, dayGridPlugin, interactionPlugin],
			/* events: CalendarEventsList.events, */
			events: arrEvents,
			weekends: { calendarWeekends },
			themeSystem: 'bootstrap',
			handleWindowResize: true,
			slotDuration: '00:15:00',
			editable: true,
			droppable: true,
			selectable: true,
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,dayGridWeek,dayGridDay'
			},
			dateClick: (event) => handleDateClick(event.dateStr),
			eventClick: (event) => handleEventClick(event)
		};
		isDataLoading = false;
	}

	getEventMetadata();



	//Invite Users
	async function inviteEventUsers(event_uuid, event_title) {
		//console.log('email_list: ' + emailList);
		//console.log('invite_event_uuid: ' + event_uuid);

		const res = await fetch(store_server_url + 'opsuserevent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_uuid: '',
				event_uuid: event_uuid,
				is_admin: 'false',
				is_approved: '0',
				is_publisher: 'false',
				is_deleted: 'f',
				adminusername: get(glb_username),
				emailorusername: emailList,
				event_title: event_title,
				optype: 'add'
			})
		});

		const result_json = await res.json();

		result_string = JSON.stringify(result_json);
		//console.log('result: ' + result_json.result);
		if (result_json.result === 'ok') {
			alert('Invitation Sent.');
		}
	}

	async function inviteEventUsersMetadata(id, title,par_owner_id) {

		if(par_owner_id != store_account_id){

			alert("Other people's events can't edit.!");
			return;

		}

		if (data.length < 1) {
			alert('Please add email address to send invitation.!');
			return;
		}

		let grid_email_list = '';

		//console.log(data.length);
		for (let i = 0; i < data.length; i++) {
			let index_arr_data = 1;
			for (const value of data[i].values()) {
				//console.log(value +"__" + index_arr_data);
				if (index_arr_data == 2) {
					console.log('val:' + value);
					grid_email_list = grid_email_list + ',' + value;
				}
				index_arr_data++;
			}
		}

		//final email list to invite
		console.log(grid_email_list.substring(1));

		//console.log('email_list: ' + emailList);
		let url_params = '?id=' + id;
		url_params = url_params + '&title=' + title;
		url_params = url_params + '&email=' + grid_email_list.substring(1);
		//url_params = url_params + '&email=' + emailList;
		url_params = url_params + '&account_id=' + store_account_id;


		metadata_url_to_go =
			'/authenticationInner/successmessage/peerplays-nft-ops-invite' + url_params;
		isPrivateKEy = true;
		isOpen = false;
		//goto('/authenticationInner/successmessage/peerplays-nft-ops-invite' + url_params);
	}

	const toggle = () => {
		isOpen = !isOpen;
		if (!isOpen) {
			setTimeout(() => {
				setEvent = {};

				isedit = false;
			}, 500);
		}
	};

	const eventData1 = {
		id: Math.floor(Math.random() * 100),
		title: 'Laser Tag',
		start: new Date(),
		allDay: false,
		class: 'bg-success text-white'
	};

	const eventData2 = {
		id: Math.floor(Math.random() * 100),
		title: 'Crypto Meeting',
		start: new Date(),
		allDay: false,
		class: 'bg-info text-white'
	};

	const eventData3 = {
		id: Math.floor(Math.random() * 100),
		title: 'Bunker Party',
		start: new Date(),
		allDay: false,
		class: 'bg-warning text-white'
	};

	const eventData4 = {
		id: Math.floor(Math.random() * 100),
		title: 'Karaoke',
		start: new Date(),
		allDay: false,
		class: 'bg-danger text-white'
	};

	function handleDateClick(arg) {
		setSelectedDay = arg;
		//console.log('date click!!!  ' + arg);
		//toggle();
	}

	options = {
		plugins: [BootstrapTheme, dayGridPlugin, interactionPlugin],
		/* events: CalendarEventsList.events, */
		events: peerclubEvents,
		weekends: { calendarWeekends },
		themeSystem: 'bootstrap',
		handleWindowResize: true,
		slotDuration: '00:15:00',
		editable: true,
		droppable: true,
		selectable: true,
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,dayGridWeek,dayGridDay'
		},
		dateClick: (event) => handleDateClick(event.dateStr),
		eventClick: (event) => handleEventClick(event)
	};

	const handleEventClick = (arg) => {
		emailList = '';
		const event = arg.event;
		//console.log('handle event... ' + JSON.stringify(event));
		const date = new Date(event.start);
		let formatted_start_date =
			date.getFullYear() +
			'-' +
			('0' + (date.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + date.getDate()).slice(-2) + //+ 'T00:00';
			'T' +
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2);

		//console.log(formatted_start_date);

		setEvent = {
			//id: parseInt(event.id),
			id: event.id,
			logo: event.extendedProps.logo,
			bg_img: event.extendedProps.bg_img,
			image_url: event.extendedProps.image_url,
			web_url: event.extendedProps.web_url,
			title: event.title,
			title_category: event.title_category,
			start: formatted_start_date,
			className: event.classNames,
			category: event.classNames[0],
			event_category: event.classNames[0],
			description: event.extendedProps.description,
			location: event.extendedProps.location,
			owner_id: event.extendedProps.owner_id
		};

		if(event.extendedProps.owner_id != store_account_id){

			//alert("Other people's events can't edit.!");
			//return;

		}

		isedit = true;

		toggle();
	};

	const toggleCategory = () => {
		modalcategory = !modalcategory;
	};

	const handleValidEventSubmitcategory = ({
		target: {
			elements: { category, title }
		}
	}) => {
		const { events } = options;

		const calendarEvents = [
			...events,
			{
				id: Math.floor(Math.random() * 100),
				title: title.value,
				start: new Date(),
				allDay: false,
				className: category.value + ' text-white'
			}
		];

		options = {
			...options,
			events: calendarEvents
		};

		toggleCategory();
	};

	//add new/edit event handler
	const handleValidEventSubmit = ({
		target: {
			elements: { category, title, description, location, start, logo, bg_img, web_url }
		}
	}) => {
		if (isedit) {
			const { events } = options;

			const updateEvent = {
				id: setEvent.id,
				title: title.value,
				className: category.value + ' text-white',
				start: setEvent.start,
				allDay: false
			};
			// update event
			/*setUserEvents(
				setEvent.id,
				'77314056-10c9-4471-92a3-cc9d42e77cdf',
				'',
				title.value,
				description.value,
				location.value,
				setSelectedDay ? setSelectedDay : start.value,
				category.value + ' text-white'
			);*/

			setUserEventsMetadata(
				setEvent.id,
				'77314056-10c9-4471-92a3-cc9d42e77cdf',
				'',
				title.value,
				description.value,
				location.value,
				setSelectedDay ? setSelectedDay : start.value,
				category.value + ' text-white',
				logo.value,
				bg_img.value,
				web_url.value,
				setEvent.owner_id
			);
			/*const i = CalendarEventsList.events.findIndex((t) => t.id === updateEvent.id);

			CalendarEventsList.events[i] = updateEvent;

			CalendarEventsList.events = [...events];

			options = {
				...options,
				events: CalendarEventsList.events
			};*/
		} else {
			//New Event
			const { events } = options;
			//Adding to DB
			/*
			putUserEvents(
				'77314056-10c9-4471-92a3-cc9d42e77cdf',
				'',
				title.value,
				description.value,
				location.value,
				setSelectedDay ? setSelectedDay : start.value,
				category.value + ' text-white'
			);
			*/

			putUserEventsMetaData(
				'77314056-10c9-4471-92a3-cc9d42e77cdf',
				'',
				title.value,
				description.value,
				location.value,
				setSelectedDay ? setSelectedDay : start.value,
				category.value + ' text-white',
				logo.value,
				bg_img.value,
				web_url.value
			);

			/*const calendarEvents = [
				...events,
				{
					id: Math.floor(Math.random() * 100),
					title: title.value,
					start: setSelectedDay ? setSelectedDay : start.value,
					allDay: false,
					description: description.value,
					location: location.value,
					className: category.value + ' text-white'
				}
			];
			
			options = {
				...options,
				events: calendarEvents
			};
			*/
		}

		setSelectedDay = '';
		//toggle();
	};

	const handleDeleteEvent = () => {
		var calendarEvents = CalendarEventsList.events.filter((e, i) => {
			return e.id !== setEvent.id;
		});

		/*calendarEvents = [...calendarEvents];

		options = {
			...options,
			events: calendarEvents
		};*/

		//delUserEvents();

		setDeleteModal(false, '');
		toggle();
	};

	const setDeleteModal = (status, event_uuid) => {
		deleteModal = status;
		event_uuid_del = event_uuid;
	};

	//Email Widget Settings
	let items = [{ id: 1, name: 'Event', done: false }];
	let name = '';

	const addEmail = () => {
		items = [
			...items,
			{
				id: Math.random(),
				name,
				done: false
			}
		];
		name = '';
	};

	const removeEmail = (item) => {
		items = items.filter((i) => i !== item);
	};

	const toggleEmail = (item) => {
		item.done = !item.done;
		items = items;
	};


	function openEventLanding(landing_name) {

		//console.log(landing_name.toLowerCase().replaceAll(" ","-"));
		window.open(("/landing/" + landing_name.toLowerCase().replaceAll(" ","-")),"_blank").focus();
		//goto("/landing/" + landing_name.toLowerCase().replaceAll(" ","-"));

	}
</script>

<svelte:head>
	<title>Calendar | Homepesa Mega Platform</title>
</svelte:head>

<CDeleteModal
	show={deleteModal}
	onDeleteClick={handleDeleteEvent}
	onCloseClick={() => setDeleteModal(false, '')}
/>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Calendar" pageTitle="Apps" />
		<Row>
			<Col xs={12}>
				<Row>
					<Col xl={3}>
						<Card class="card-h-100">
							<CardBody>
								<button class="btn btn-primary w-100" id="btn-new-event" on:click={toggle}>
									<i class="mdi mdi-plus" /> Create New Event
								</button>

								<div id="external-events">
									<br />
									<p class="text-muted">Drag and drop your event or click in the calendar</p>
									<Draggable eventData={eventData1} class="draggable">
										<div class="bg-soft-success external-event fc-event text-success">
											<i class="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
											Laser Tag
										</div>
									</Draggable>

									<Draggable eventData={eventData2} class="draggable">
										<div class="bg-soft-info external-event fc-event text-info">
											<i class="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
											Crypto Meeting
										</div>
									</Draggable>

									<Draggable eventData={eventData3} class="draggable">
										<div class="bg-soft-warning external-event fc-event text-warning">
											<i class="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
											Bunker Party
										</div>
									</Draggable>

									<Draggable eventData={eventData4} class="draggable">
										<div class="bg-soft-danger external-event fc-event text-danger">
											<i class="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
											Karaoke
										</div>
									</Draggable>
								</div>
							</CardBody>
						</Card>

						<div>
							<h5 class="mb-1">Upcoming Events</h5>
							<p class="text-muted">Don't miss scheduled events</p>
							<div class="pe-2 me-n1 mb-3" data-simplebar style="height: 400px">
								<div id="upcoming-event-list">
									
									{#if CalendarEventsList.defaultevent}
										{#each CalendarEventsList.defaultevent as event}
											<UpcommingEvents {event} />
										{/each}
									{/if}
									
								</div>
							</div>
						</div>

						<Card>
							<CardBody class="bg-soft-info">
								<div class="d-flex">
									<div class="flex-shrink-0">
										<CalendarIcon class="text-info icon-dual-info" size="24" />
									</div>
									<div class="flex-grow-1 ms-3">
										<h6 class="fs-16">Welcome to your Calendar!</h6>
										<p class="text-muted mb-0">
											Event that applications book will appear here. Click on an event to see the
											details and manage applicants event.
										</p>
									</div>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl={9}>
						<Card className="card-h-100">
							<CardBody>
								<FullCalendar bind:this={calendarComponentRef} {options} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	</Container>
</div>
<Modal {isOpen}>
	<ModalHeader {toggle} tag="h4">
		{!!isedit ? 'Edit Event' : 'Add Event'}
	</ModalHeader>
	<ModalBody>
		<form on:submit|preventDefault={handleValidEventSubmit}>
			<Row>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Logo</Label>
						<input
							type="text"
							class="form-control"
							name="logo"
							placeholder="Event Logo"
							value={setEvent && setEvent.logo ? setEvent.logo : ''}
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Background Image</Label>
						<input
							type="text"
							class="form-control"
							name="bg_img"
							placeholder="Event Background Image"
							value={setEvent && setEvent.bg_img ? setEvent.bg_img : ''}
						/>
					</div>
				</Col>

				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Name</Label>
						<input
							type="text"
							class="form-control"
							name="title"
							placeholder="Event Name"
							value={setEvent && setEvent.title ? setEvent.title : ''}
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Description</Label>
						<input
							type="text"
							class="form-control"
							name="description"
							placeholder="Event Description"
							value={setEvent && setEvent.description ? setEvent.description : ''}
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Web Url</Label>
						<input
							type="text"
							class="form-control"
							name="web_url"
							placeholder="Event Description"
							value={setEvent && setEvent.web_url ? setEvent.web_url : ''}
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Location</Label>
						<input
							type="text"
							class="form-control"
							name="location"
							placeholder="Event Location"
							value={setEvent && setEvent.location ? setEvent.location : 'BUNKER'}
							disabled
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event Time</Label>
						<input
							type="datetime-local"
							class="form-control"
							name="start"
							placeholder="Event Time"
							value={setEvent && setEvent.start ? setEvent.start : ''}
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="category">Event Calendar Color</Label>
						<select
							name="category"
							class="form-control form-select"
							placeholder="Select Category"
							value={setEvent ? setEvent.category : 'bg-primary'}
						>
							<option value="bg-soft-danger">Type 1</option>
							<option value="bg-soft-success">Type 2</option>
							<option value="bg-soft-primary">Type 3</option>
							<option value="bg-soft-info">Type 4 </option>
							<option value="bg-soft-dark">Type 5</option>
							<option value="bg-soft-warning">Type 6</option>
						</select>
					</div>
				</Col>

				{#if !isedit}
					<Col class="col-12">
						<div class="mb-3">
							<Label class="form-label" for="category">Event Participant Size</Label>
							<RangeSlider
								bind:values={event_size}
								name="event-size"
								float="true"
								min={0}
								max={100}
								pips
								all="label"
							/>
						</div>
					</Col>
				{/if}
				{#if !!isedit}
					<Col class="col-12">
						<div class="mb-3">
							<Label class="form-label" for="emails">Invite User</Label>
							<div class="d-flex mb-3">
								<input
									bind:value={emailList}
									type="text"
									class="form-control"
									name="emails"
									placeholder="Email Address(es)"
								/>
								<button type="button" class="btn btn-light" on:click={addDataToGrid}> Add </button>
							</div>
							<Grid {data} {columns} />
							<button
								type="button"
								class="btn btn-secondary me-2 mt-3"
								on:click={inviteEventUsersMetadata(setEvent.id, setEvent.title, setEvent.owner_id)}
							>
								Send Invitation
							</button>

							<!-- Email Widget
							<form on:submit|preventDefault={addEmail}>
								<label for="name">Invite User</label>
								<input class="form-control" id="name" type="text" bind:value={name} />
							  </form>
							
							  <ul>
								{#each items as item}
								  <li class:done={item.done}>
									<span>{item.name}</span>
									<button on:click={() => removeEmail(item)}>&times;</button>
								  </li>
								{/each}
							  </ul>
							-->
						</div>
					</Col>
				{/if}
			</Row>
			<Row class="mt-2">
				<Col xs="12" class="text-end">
					{#if !!isedit}
						
					<button
							type="button"
							class="btn btn-warning"
							on:click={() => openEventLanding(setEvent.title)}>Landing</button
						>
					<button
							type="button"
							class="btn btn-danger"
							on:click={() => setDeleteModal(true, setEvent.id)}>Delete</button
						>
					{/if}
					<button type="button" class="btn btn-light mx-2" on:click={toggle}> Close </button>
					<button type="submit" class="btn btn-success save-event"> Save </button>
				</Col>
			</Row>
		</form>
	</ModalBody>
</Modal>

<Modal isOpen={modalcategory}>
	<ModalHeader {toggleCategory} tag="h4">
		{!!isedit ? 'Edit Event' : 'Add Event'}
	</ModalHeader>
	<ModalBody>
		<form on:submit|preventDefault={handleValidEventSubmitcategory}>
			<Row>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="title">Event title</Label>

						<input
							type="text"
							class="form-control"
							name="title"
							placeholder="Event Name"
							value=""
						/>
					</div>
				</Col>
				<Col class="col-12">
					<div class="mb-3">
						<Label class="form-label" for="category">Category</Label>
						<select name="category" class="form-control form-select" placeholder="Select Category">
							<option value="bg-soft-danger" selected>Danger</option>
							<option value="bg-soft-success">Success</option>
							<option value="bg-soft-primary">Primary</option>
							<option value="bg-soft-info">Info</option>
							<option value="bg-soft-dark">Dark</option>
							<option value="bg-soft-warning">Warning</option>
						</select>
					</div>
				</Col>
			</Row>
			<Row class="mt-2">
				<Col xs="12" class="text-end">
					<button type="button" class="btn btn-light me-2" on:click={toggleCategory}>
						Close
					</button>

					<button type="submit" class="btn btn-success save-event"> Save </button>
				</Col>
			</Row>
		</form>
	</ModalBody>
</Modal>

<Modal contentClassName="p-5" isOpen={isDataLoading}>
	<Circle3 size="60" color="#FF3E00" unit="px" duration="1.5s" />
</Modal>

<!--Modal For Private Key-->
<Modal contentClassName="p-2" isOpen={isPrivateKEy}>
	<ModalHeader tag="h4">Private Key Setting</ModalHeader>
	<ModalBody>
		<Row>
			<Col class="col-12">
				<div class="mb-3">
					<Label class="form-label" for="title">Private Key</Label>

					<input
						type="text"
						class="form-control"
						name="prv_key"
						placeholder="Please Enter Private Key"
						bind:value={store_user_private_key}
					/>
				</div>
			</Col>
		</Row>
		<Row class="mt-2">
			<Col xs="12" class="text-end">
				<button
					type="button"
					class="btn btn-light me-2"
					on:click={() => (isPrivateKEy = !isPrivateKEy)}
				>
					Close
				</button>

				<button
					type="submit"
					class="btn btn-success save-event"
					on:click={setPrivateKeyAndContinue}
				>
					Save and Continue
				</button>
			</Col>
		</Row>
	</ModalBody>
</Modal>

<style>
	li button {
		float: right;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		color: #dc4f21;
		font-size: 18px;
		cursor: pointer;
	}
	li button:hover {
		transform: scale(2);
	}
	li button:focus {
		outline: #dc4f21;
	}
	li:last-child {
		border-bottom: none;
	}
	label {
		display: block;
		text-transform: uppercase;
		font-size: 0.8em;
		color: #777;
	}
	li {
		list-style: none;
		padding: 6px 10px;
		border-bottom: 1px solid #ddd;
	}
	ul {
		padding-left: 0;
	}
	.done span {
		opacity: 0.4;
	}
</style>
