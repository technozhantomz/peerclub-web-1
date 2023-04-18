<script>
	import {
		Modal,
		ModalBody,
		ModalHeader,
		Input,
		Progress,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Label
	} from 'sveltestrap';
	import Link from 'svelte-link';
	import { PlusCircleIcon } from 'svelte-feather-icons';

	let open = false;
	const toggle = () => (open = !open);

	import avatar2 from '../../assets/images/users/avatar-2.jpg';
	import avatar3 from '../../assets/images/users/avatar-3.jpg';
	import avatar4 from '../../assets/images/users/avatar-4.jpg';
	import avatar5 from '../../assets/images/users/avatar-5.jpg';
</script>

<div class="email-menu-sidebar">
	<div class="p-4 d-flex flex-column h-100">
		<div class="pb-4 border-bottom border-bottom-dashed">
			<button
				type="button"
				class="btn btn-danger w-100"
				data-bs-toggle="modal"
				data-bs-target="#composemodal"
				on:click={toggle}
			>
				<PlusCircleIcon class="icon-xs me-1 icon-dual-light" />
				Compose
			</button>
		</div>

		<div class="mx-n4 px-4 email-menu-sidebar-scroll" data-simplebar>
			<div class="mail-list mt-3 h-auto">
				<Link href="" class="active">
					<i class="ri-mail-fill me-3 align-middle fw-medium" />
					<span class="mail-list-link">All</span>
				</Link>
				<Link href="">
					<i class="ri-inbox-archive-fill me-3 align-middle fw-medium" />
					Inbox
					<span class="badge badge-soft-success ms-auto  ">5</span>
				</Link>
				<Link href="">
					<i class="ri-send-plane-2-fill me-3 align-middle fw-medium" />{' '}
					Sent
				</Link>
				<Link href="">
					<i class="ri-edit-2-fill me-3 align-middle fw-medium" />
					Draft
				</Link>
				<Link href="">
					<i class="ri-error-warning-fill me-3 align-middle fw-medium" />
					Spam
				</Link>
				<Link href="">
					<i class="ri-delete-bin-5-fill me-3 align-middle fw-medium" />
					Trash
				</Link>
				<Link href="">
					<i class="ri-star-fill me-3 align-middle fw-medium" />
					Starred
				</Link>
				<Link href="">
					<i class="ri-price-tag-3-fill me-3 align-middle fw-medium" />
					Important
				</Link>
			</div>

			<div>
				<h5 class="fs-12 text-uppercase text-muted mt-4">Labels</h5>

				<div class="mail-list mt-1">
					<Link href="">
						<span class="ri-checkbox-blank-circle-line me-2 text-info" />{' '}
						Theme Support{' '}
						<span class="badge badge-soft-success ms-auto">3</span>
					</Link>
					<Link href="">
						<span class="ri-checkbox-blank-circle-line me-2 text-warning" />{' '}
						Freelance
					</Link>
					<Link href="">
						<span class="ri-checkbox-blank-circle-line me-2 text-primary" />{' '}
						Social
					</Link>
					<Link href="">
						<span class="ri-checkbox-blank-circle-line me-2 text-danger" />{' '}
						Friends
						<span class="badge badge-soft-success ms-auto">2</span>
					</Link>
					<Link href="">
						<span class="ri-checkbox-blank-circle-line me-2 text-success" />{' '}
						Family
					</Link>
				</div>
			</div>

			<div class="border-top border-top-dashed pt-3 mt-3">
				<Link href="" class="btn btn-icon btn-sm btn-soft-info btn-rounded float-end">
					<i class="bx bx-plus fs-16" />
				</Link>
				<h5 class="fs-12 text-uppercase text-muted mb-3">Chat</h5>

				<div class="mt-2 vstack gap-3">
					<Link href="" class="d-flex align-items-center">
						<div class="flex-shrink-0 me-2 avatar-xs">
							<img class="img-fluid rounded-circle" src={avatar2} alt="" />
						</div>

						<div class="flex-grow-1 chat-user-box overflow-hidden">
							<h5 class="fs-13 text-truncate mb-0">Scott Median</h5>
							<small class="text-muted text-truncate mb-0"> Hello ! are you there? </small>
						</div>
					</Link>

					<Link href="" class="d-flex align-items-center">
						<div class="flex-shrink-0 me-2 avatar-xs">
							<img class="img-fluid rounded-circle" src={avatar4} alt="" />
						</div>

						<div class="flex-grow-1 chat-user-box overflow-hidden">
							<h5 class="fs-13 text-truncate mb-0">Julian Rosa</h5>
							<small class="text-muted text-truncate mb-0"> What about our next.. </small>
						</div>
					</Link>

					<Link href="" class="d-flex align-items-center">
						<div class="flex-shrink-0 me-2 avatar-xs">
							<img class="img-fluid rounded-circle" src={avatar3} alt="" />
						</div>

						<div class="flex-grow-1 chat-user-box overflow-hidden">
							<h5 class="fs-13 text-truncate mb-0">David Medina</h5>
							<small class="text-muted text-truncate mb-0"> Yeah everything is fine </small>
						</div>
					</Link>

					<Link href="" class="d-flex align-items-center">
						<div class="flex-shrink-0 me-2 avatar-xs">
							<img class="img-fluid rounded-circle" src={avatar5} alt="" />
						</div>

						<div class="flex-grow-1 chat-user-box overflow-hidden">
							<h5 class="fs-13 text-truncate mb-0">Jay Baker</h5>
							<small class="text-muted text-truncate mb-0"> Wow that's great </small>
						</div>
					</Link>
				</div>
			</div>
		</div>

		<div class="mt-auto">
			<h5 class="fs-13">1.75 GB of 10 GB used</h5>
			<Progress color="success" class="progress-sm" value={25} />
		</div>
	</div>
</div>

<Modal id="composemodal" class="modal-lg" isOpen={open} {toggle} centered>
	<ModalHeader class="p-3 bg-light" {toggle}>New Message</ModalHeader>
	<ModalBody>
		<div>
			<div class="mb-3 position-relative">
				<Input
					type="text"
					class="form-control email-compose-input"
					defaultValue="support@peerplays.com"
				/>
				<div class="position-absolute top-0 end-0">
					<div class="d-flex">
						<button class="btn btn-link text-reset fw-semibold px-2" type="button"> Cc </button>
						<button class="btn btn-link text-reset fw-semibold px-2" type="button"> Bcc </button>
					</div>
				</div>
			</div>
			<div class="collapse" id="CcRecipientsCollapse">
				<div class="mb-3">
					<Label>Cc:</Label>
					<Input type="text" class="form-control" placeholder="Cc recipients" />
				</div>
			</div>
			<div class="collapse" id="BccRecipientsCollapse">
				<div class="mb-3">
					<Label>Bcc:</Label>
					<Input type="text" class="form-control" placeholder="Bcc recipients" />
				</div>
			</div>

			<div class="mb-3">
				<Input type="text" class="form-control" placeholder="Subject" />
			</div>
		</div>
	</ModalBody>
	<div class="modal-footer">
		<button type="button" class="btn btn-ghost-danger" on:click={toggle}> Discard </button>

		<Dropdown class="btn-group">
			<button type="button" class="btn btn-success" on:click={toggle}> Send </button>
			<DropdownToggle tag="button" type="button" class="btn btn-success" split>
				<span class="visually-hidden">Toggle Dropdown</span>
			</DropdownToggle>
			<DropdownMenu class="dropdown-menu-end">
				<li>
					<DropdownItem href="">
						<i class="ri-timer-line text-muted me-1 align-bottom" />{' '}
						Schedule Send
					</DropdownItem>
				</li>
			</DropdownMenu>
		</Dropdown>
	</div>
</Modal>
