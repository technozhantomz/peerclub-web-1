<script>
	import { Card, CardBody, CardHeader, Col, Row } from 'sveltestrap';
	import Link from 'svelte-link';
	import Select from 'svelte-select';

	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	import transactionsData from '../../../common/data/cryptoPage';

	const Sortby = [
		{ label: 'All', value: 'All' },
		{ label: 'USD', value: 'USD' },
		{ label: 'KSH', value: 'KSH' },
		{ label: 'BTC', value: 'BTC' },
		{ label: 'EUR', value: 'EUR' },
		{ label: 'JPY', value: 'JPY' }
	];

	const columns = [
		{
			id: 'icon',
			hidden: true
		},
		{
			name: 'iconClass',
			formatter: (cell, row) =>
				html(`<div class="avatar-xs">
                <div class="avatar-title bg-soft-${cell} text-${cell} rounded-circle fs-16">
                    <i class=${row.cells[0].data}></i>
                </div>
            </div>`)
		},
		{
			id: 'time',
			hidden: true
		},
		{
			id: 'image',
			hidden: true
		},
		{
			id: 'date',
			name: 'Timestamp',
			formatter: (cell, row) => html(`${cell}${row.cells[2].data}</small>`)
		},
		{
			id: 'currency',
			name: 'Currency',
			formatter: (cell, row) =>
				html(`<div class="d-flex align-items-center">
                <img src=${row.cells[3].data} alt="" class="avatar-xxs me-2" />
                ${cell}
            </div>`)
		},
		{
			name: 'From',
			id: 'from'
		},
		{
			name: 'To',
			id: 'to'
		},
		{
			name: 'Details',
			id: 'details'
		},
		{
			name: 'Transaction ID',
			id: 'id'
		},
		{
			name: 'Type',
			id: 'type'
		},
		{
			id: 'amount1',
			hidden: true
		},
		{
			name: 'Amount',
			id: 'amount',
			formatter: (cell, row) =>
				html(`<h6 class="text-${row.cells[1].data} amount mb-1">-${cell}</h6>
                <p class="text-muted mb-0">${row.cells[11].data}</p>`)
		},
		{
			name: 'Status',
			id: 'status',
			formatter: (cell) => {
				if (cell === 'Processing') {
					return html(
						`<span class='badge badge-soft-warning fs-11'><i class="ri-time-line align-bottom"></i>${cell}</span>`
					);
				} else if (cell === 'Success') {
					return html(
						`<span class='badge badge-soft-success fs-11'><i class="ri-checkbox-circle-line align-bottom"></i>${cell}</span>`
					);
				} else if (cell === 'Failed') {
					return html(
						`<span class="badge badge-soft-danger fs-11"><i class="ri-close-circle-line align-bottom"></i>${cell}</span>`
					);
				} else {
					return null;
				}
			}
		}
	];

	const data = transactionsData.transactions;
</script>

<Row class="align-items-center mb-4 g-3">
	<Col sm={3}>
		<div class="d-flex align-items-center gap-2">
			<span class="text-muted flex-shrink-0">Sort by: </span>
			<div class="select-single">
				<Select
					name="choices-single-default"
					id="choices-single-default"
					items={Sortby}
					value="All"
				/>
			</div>
		</div>
	</Col>
	<div class="col-sm-auto ms-auto">
		<div class="d-flex gap-2">
			<Link href="" data-bs-toggle="modal" class="btn btn-info">Deposite</Link>
			<Link href="" data-bs-toggle="modal" class="btn btn-danger">Withdraw</Link>
		</div>
	</div>
</Row>

<Card>
	<CardHeader>
		<Row class="align-items-center g-3">
			<Col md={3}>
				<h5 class="card-title mb-0">All Transactions</h5>
			</Col>
			<div class="col-md-auto ms-auto">
				<div class="d-flex gap-2">
					<div class="search-box">
						<input
							type="text"
							class="form-control search"
							placeholder="Search for transactions..."
						/>
						<i class="ri-search-line search-icon" />
					</div>
					<button class="btn btn-success">
						<i class="ri-equalizer-line align-bottom me-1" />
						Filters
					</button>
				</div>
			</div>
		</Row>
	</CardHeader>
	<CardBody>
		{#if transactionsData.transactions.length > 0}
			<div class="table-card gridjs-border-none">
				<Grid
					{data}
					{columns}
					className={{ th: 'text-muted' }}
					pagination={{ enabled: true, limit: 8 }}
				/>
			</div>
		{:else}
			<div class="noresult" style="display: none">
				<div class="text-center">
					<lord-icon
						src="//cdn.lordicon.com/msoeawqm.json"
						trigger="loop"
						colors="primary:#121331,secondary:#08a88a"
						style="width:75px;height:75px"
					/>
					<h5 class="mt-2">Sorry! No Result Found</h5>
					<p class="text-muted mb-0">
						We've searched more than 150+ leads We did not find any leads for you search.
					</p>
				</div>
			</div>
		{/if}
	</CardBody>
</Card>
