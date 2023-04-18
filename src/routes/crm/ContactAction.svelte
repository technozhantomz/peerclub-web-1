<script>
	import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'sveltestrap';
	import Link from 'svelte-link';
	var open = false;

	const onClickDelete = () => {
		open = true;
	};

	const toggle = () => (open = !open);
</script>

<ul class="list-inline hstack gap-2 mb-0">
	<li class="list-inline-item edit" title="Call">
		<Link href="" class="text-muted d-inline-block">
			<i class="ri-phone-line fs-16" />
		</Link>
	</li>
	<li class="list-inline-item edit" title="Message">
		<Link href="" class="text-muted d-inline-block">
			<i class="ri-question-answer-line fs-16" />
		</Link>
	</li>
	<li class="list-inline-item">
		<Dropdown>
			<DropdownToggle href="" class="btn-soft-secondary btn-sm dropdown" tag="button">
				<i class="ri-more-fill align-middle" />
			</DropdownToggle>
			<DropdownMenu class="dropdown-menu-end">
				<DropdownItem class="dropdown-item" href="">
					<i class="ri-eye-fill align-bottom me-2 text-muted" />
					View
				</DropdownItem>
				<DropdownItem class="dropdown-item edit-item-btn" href="" on:click={toggle}>
					<i class="ri-pencil-fill align-bottom me-2 text-muted" />
					Edit
				</DropdownItem>
				<DropdownItem class="dropdown-item remove-item-btn" href="" on:click={onClickDelete}>
					<i class="ri-delete-bin-fill align-bottom me-2 text-muted" />
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</li>
</ul>
