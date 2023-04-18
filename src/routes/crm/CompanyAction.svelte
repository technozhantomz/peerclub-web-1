<script>
	import Link from 'svelte-link';
</script>

<ul class="list-inline hstack gap-2 mb-0">
	<li class="list-inline-item edit">
		<Link href="" class="text-muted d-inline-block">
			<i class="ri-phone-line fs-16" />
		</Link>
	</li>
	<li class="list-inline-item edit">
		<Link href="" class="text-muted d-inline-block">
			<i class="ri-question-answer-line fs-16" />
		</Link>
	</li>
	<li class="list-inline-item">
		<Link href="">
			<i class="ri-eye-fill align-bottom text-muted" />
		</Link>
	</li>
	<li class="list-inline-item">
		<Link class="edit-item-btn" href="">
			<i class="ri-pencil-fill align-bottom text-muted" />
		</Link>
	</li>
	<li class="list-inline-item">
		<Link class="remove-item-btn" href="">
			<i class="ri-delete-bin-fill align-bottom text-muted" />
		</Link>
	</li>
</ul>
