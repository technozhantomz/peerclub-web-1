<script>
	import { Container } from 'sveltestrap';
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
	import Grid from 'gridjs-svelte';
	import data from '../../../common/data/NFTMarketplace';

	var nftranking = data.NFTRanking;

	const columns = [
		{
			name: 'Ranking',
			formatter: (cell) => {
				if (cell < 4) {
					html(`<div class="ranking text-info fw-semibold">#${cell}</div>`);
				} else {
					html(`<div class="ranking">#${cell}</div>`);
				}
			}
		},
		{
			id: 'img',
			hidden: true
		},
		{
			name: 'Collection',
			filterable: false,
			formatter: (cell) => {
				html(`<div class="collection">
                    <div class="d-flex align-items-center">
                        <img src=${cell[1]} alt="" class="avatar-xs rounded-circle object-cover me-2" /> <a href="/NFTmarketplace/Itemdetails/apps-nft-item-details" class="link-dark">${cell}</a>
                    </div>
                </div>`);
			}
		},
		{
			name: 'Volume',
			id: 'volume_price',
			filterable: false
		},
		{
			name: '24h%',
			id: 'hours',
			filterable: false,
			formatter: (cell) => {
				if (cell.value > 0) {
					html(`<h6 class="text-success mb-1 24h" > ${cell} KSH</h6 >`);
				} else {
					html(`<h6 class="text-danger mb-1 24h">${cell} KSH</h6>`);
				}
			}
		},
		{
			name: '7d%',
			id: 'day',
			filterable: false,
			formatter: (cell) => {
				if (cell.value > 0) {
					html(`<h6 class="text-success mb-1 7d" > ${cell} KSH</h6 >`);
				} else {
					html(`<h6 class="text-danger mb-1 7d">${cell} KSH</h6>`);
				}
			}
		},
		{
			name: 'Item',
			id: 'item',
			filterable: false
		},
		{
			name: 'Floor Price',
			id: 'floor_price',
			filterable: false
		}
	];
</script>

<svelte:head>
	<title>Ranking | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Ranking" pageTitle="NFT Marketplace" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card" id="contactList">
					<div class="card-header border-0">
						<div class="d-flex align-items center">
							<h5 class="mb-0 flex-grow-1">The top NFTs ranking on Peer Club</h5>
							<p class="text-muted mb-0">Updated: 28 April, 2022 08:05:00</p>
						</div>
					</div>
					<div class="card-body">
						<Grid {nftranking} {columns} pagination={{ enabled: true, limit: 10 }} />

						<div class="noresult">
							<div class="text-center">
								<lord-icon
									src="https://cdn.lordicon.com/msoeawqm.json"
									trigger="loop"
									colors="primary:#405189,secondary:#0ab39c"
									style="width: 75px; height: 75px"
								/>
								<h5 class="mt-2">Sorry! No Result Found</h5>
								<p class="text-muted mb-0">
									We've searched more than 150+ transactions We did not find any transactions for
									you search.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</div>
