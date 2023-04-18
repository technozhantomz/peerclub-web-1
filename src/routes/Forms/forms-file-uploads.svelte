<svelte:head>
  <title>File Upload | Peer Club Dashboard</title>
</svelte:head>
<script>
	import {
		Card,
		CardBody,
		Container,
		Col,
		Row,
		CardHeader
	} from 'sveltestrap';
	import Dropzone from 'svelte-file-dropzone';
	import Link from 'svelte-link';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';


	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

</script>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="File Upload" pageTitle="Forms" />
		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader class="card-header">
						<h4 class="card-title mb-0">Dropzone</h4>
					</CardHeader>
					<CardBody>
						<p class="text-muted">
							DropzoneJS is an open source library that provides drag’n’drop file uploads with image
							previews.
						</p>

						<Dropzone on:drop={handleFilesSelect}>
							<div>
								<div class="dz-message needsclick">
									<div class="dz-message needsclick">
										<div class="mb-3">
											<i class="display-4 text-muted ri-upload-cloud-2-fill" />
										</div>
										<h4>Drop files here or click to upload.</h4>
									</div>
								</div>
							</div>
						</Dropzone>

						<div class="dropzone-previews mt-3" id="file-previews">
							{#each files.accepted as item}
								<Card
									class="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
								>
									<div class="p-2">
										<Row class="align-items-center">
											<Col>
												<Link href="" class="text-muted font-weight-bold">
													{item.name}
												</Link>
												<p class="mb-0">
													<strong>{item.size}</strong>
												</p>
											</Col>
										</Row>
									</div>
								</Card>
							{/each}
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>