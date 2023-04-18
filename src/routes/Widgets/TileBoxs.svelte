<script>
	import { Card, CardBody, Col, Row } from 'sveltestrap';
	import Link from 'svelte-link';
	import Counter from '../../Components/Common/counter.svelte';
	import { UsersIcon, ActivityIcon, ClockIcon, ExternalLinkIcon } from 'svelte-feather-icons';
	export let WidgetData;
</script>

<Counter />
<Row>
	<Col class="col-12">
		<h5 class="text-decoration-underline mb-3 pb-1">Tile Boxs</h5>
	</Col>
</Row>

<Row>
	{#each WidgetData.tileBoxs1 as item}
		<Col xl={3} md={6}>
			<Card class={'card-animate ' + item.bgColor}>
				<CardBody>
					<div class="d-flex align-items-center">
						<div class="flex-grow-1">
							<p class={'text-uppercase fw-medium mb-0 text-' + item.labelClass}>{item.label}</p>
						</div>
						<div class="flex-shrink-0">
							<h5 class={'fs-14 mb-0 text-' + item.percentageClass}>
								<i class={'fs-13 align-middle' + item.percentageIcon} />
								{item.percentage}
							</h5>
						</div>
					</div>
					<div class="d-flex align-items-end justify-content-between mt-4">
						<div>
							<h4 class="fs-22 fw-semibold ff-secondary mb-4 {item.counterClass}">
								{item.prefix}<span class="counter-value" data-target={item.counter}>0</span
								>{item.suffix}
							</h4>
							<Link href="" class={'text-decoration-underline ' + item.captionClass}
								>{item.caption}</Link
							>
						</div>
						<div class="avatar-sm flex-shrink-0">
							<span class={'avatar-title rounded fs-3 bg-soft-' + item.iconClass}>
								<i class={item.icon + ' text-' + item.iconClass} />
							</span>
						</div>
					</div>
				</CardBody>
			</Card>
		</Col>
	{/each}
</Row>

<Row>
	<Col xl={12}>
		<Card class="crm-widget">
			<CardBody class="p-0">
				<Row class="row-cols-md-3 row-cols-1">
					{#each WidgetData.tileBoxs2 as item}
						<Col class={item.id === 4 ? 'col-lg' : 'col-lg border-end'}>
							<div class="mt-3 mt-md-0 py-4 px-3">
								<h5 class="text-muted text-uppercase fs-13">
									{item.label} <i class={'fs-18 float-end align-middle ' + item.badge} />
								</h5>
								<div class="d-flex align-items-center">
									<div class="flex-shrink-0">
										<i class={'display-6 text-muted ' + item.icon} />
									</div>
									<div class="flex-grow-1 ms-3">
										<h2 class="mb-0">
											{item.prefix}<span class="counter-value" data-target={item.counter}>0</span
											>{item.suffix}
										</h2>
									</div>
								</div>
							</div>
						</Col>
					{/each}
				</Row>
			</CardBody>
		</Card>
	</Col>
</Row>

<Row>
	{#each WidgetData.tileBoxs3 as item}
		<Col xl={3} md={6}>
			<Card class={'card-animate ' + item.bgColor}>
				<CardBody>
					<div class="d-flex justify-content-between">
						<div>
							<p class={'fw-medium mb-0 text-' + item.labelClass}>{item.label}</p>
							<h2 class={'mt-4 ff-secondary fw-semibold ' + item.counterClass}>
								{#each item.subCounter as item}
									{item.prefix}<span class="counter-value" data-target={item.counter}>0</span
									>{item.suffix}
								{/each}
							</h2>
							<p class={'mb-0 text-' + item.labelClass}>
								<span class={'mb-0 badge ' + item.badgeClass}>
									<i class={'align-middle ' + item.badge} />
									{item.percentage}
								</span> vs. previous month
							</p>
						</div>
						<div>
							<div class="avatar-sm flex-shrink-0">
								<span class={'avatar-title rounded-circle fs-2 bg-soft-' + item.iconClass}>
									{#if item.feaIcon === 'activity'}
										<ActivityIcon class={'text-' + item.iconClass} size="24" />
									{:else if item.feaIcon === 'clock'}
										<ClockIcon class={'text-' + item.iconClass} size="24" />
									{:else if item.feaIcon === 'external-link'}
										<ExternalLinkIcon class={'text-' + item.iconClass} size="24" />
									{:else}
										<UsersIcon class={'text-' + item.iconClass} size="24" />
									{/if}
								</span>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</Col>
	{/each}
</Row>

<Row>
	{#each WidgetData.tileBoxes4 as item}
		<Col xl={3} md={6}>
			<Card class={'card-height-100 ' + item.bgColor}>
				<CardBody>
					<div class="d-flex align-items-center">
						<div class="avatar-sm flex-shrink-0">
							<span
								class={'avatar-title rounded-2 fs-2 bg-soft-' +
									item.iconClass +
									' text-' +
									item.iconClass}
							>
								<i class={item.icon} />
							</span>
						</div>
						<div class="flex-grow-1 ms-3">
							<p class={'text-uppercase fw-medium mb-3 text-' + item.labelClass}>{item.label}</p>
							<h4 class={'fs-4 mb-3 ' + item.counterClass}>
								{item.prefix}<span class="counter-value" data-target={item.counter}>0</span
								>{item.suffix}
							</h4>
							<p class={'mb-0 text-' + item.captionClass}>{item.caption}</p>
						</div>
						<div class="flex-shrink-0 align-self-center">
							<span class={'fs-12 badge badge-soft-' + item.percentageClass}
								><i class={'fs-13 align-middle me-1 ' + item.badge} />{item.percentage}<span
								/></span
							>
						</div>
					</div>
				</CardBody>
			</Card>
		</Col>
	{/each}
</Row>
