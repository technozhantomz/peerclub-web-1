<script>
	import {
		Col,
		Container,
		DropdownItem,
		DropdownMenu,
		Form,
		Modal,
		ModalBody,
		ModalHeader,
		Row,
		Dropdown,
		Collapse,
		Label
	} from 'sveltestrap';
	import Flatpickr from 'svelte-flatpickr';

	// Import Images
	import avatar1 from '../../assets/images/users/avatar-1.jpg';
	import avatar2 from '../../assets/images/users/avatar-2.jpg';
	import avatar3 from '../../assets/images/users/avatar-3.jpg';
	import avatar4 from '../../assets/images/users/avatar-4.jpg';
	import avatar5 from '../../assets/images/users/avatar-5.jpg';
	import avatar6 from '../../assets/images/users/avatar-6.jpg';
	import avatar7 from '../../assets/images/users/avatar-7.jpg';
	import avatar8 from '../../assets/images/users/avatar-8.jpg';
	import avatar9 from '../../assets/images/users/avatar-9.jpg';
	import avatar10 from '../../assets/images/users/avatar-10.jpg';

	import Link from 'svelte-link';
	import taskImg from '../../assets/images/task.png';
	import data from '../../common/data/todoData';
	let droplist = false;
	let modalTodo = false;
	const toggle = () => (modalTodo = !modalTodo);
	const assignee = [
		{ id: 1, img: avatar2, name: 'James Forbes' },
		{ id: 2, img: avatar3, name: 'John Robles' },
		{ id: 3, img: avatar4, name: 'Mary Gant' },
		{ id: 4, img: avatar1, name: 'Curtis Saenz' },
		{ id: 5, img: avatar5, name: 'Virgie Price' },
		{ id: 6, img: avatar10, name: 'Anthony Mills' },
		{ id: 7, img: avatar6, name: 'Marian Angel' },
		{ id: 8, img: avatar7, name: 'Johnnie Walton' },
		{ id: 9, img: avatar8, name: 'Donna Weston' },
		{ id: 10, img: avatar9, name: 'Diego Norris' }
	];
</script>

<svelte:head>
	<title>ToDo | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<div class="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
			<div class="file-manager-sidebar">
				<div class="p-4 d-flex flex-column h-100">
					<div class="mb-3">
						<button class="btn btn-success w-100"
							><i class="ri-add-line align-bottom" /> Add Project</button
						>
					</div>

					<div class="px-4 mx-n4" data-simplebar style="height: calc(100vh - 468px);">
						<ul class="to-do-menu list-unstyled" id="projectlist-data">
							<li>
								<Link href="" class="nav-link fs-14 active" id="peerclubAdmin"
									>Peer Club Admin & Dashboard</Link
								>

								<Collapse toggler="#peerclubAdmin" isOpen>
									<ul class="mb-0 sub-menu list-unstyled ps-3 vstack gap-2 mb-2">
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-danger" /> v1.4.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-secondary" /> v1.5.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-info" /> v1.6.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-primary" /> v1.7.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-warning" /> v1.8.0</Link
											>
										</li>
									</ul>
								</Collapse>
							</li>
							<li>
								<Link href="" class="nav-link fs-14" id="projectManagement"
									>Project Management</Link
								>
								<Collapse toggler="#projectManagement">
									<ul class="mb-0 sub-menu list-unstyled ps-3 vstack gap-2 mb-2">
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-danger" /> v2.1.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-secondary" /> v2.2.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-info" /> v2.3.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-primary" /> v2.4.0</Link
											>
										</li>
									</ul>
								</Collapse>
							</li>
							<li>
								<Link href="" class="nav-link fs-14" id="skoteAdmin">Skote Admin & Dashboard</Link>
								<Collapse toggler="#skoteAdmin">
									<ul class="mb-0 sub-menu list-unstyled ps-3 vstack gap-2 mb-2">
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-danger" /> v4.1.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-secondary" /> v4.2.0</Link
											>
										</li>
									</ul>
								</Collapse>
							</li>
							<li>
								<Link href="" class="nav-link fs-14" id="ecommerceProject"
									>Doot - Chat App Template</Link
								>
								<Collapse toggler="#ecommerceProject">
									<ul class="mb-0 sub-menu list-unstyled ps-3 vstack gap-2 mb-2">
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-danger" /> v1.0.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-secondary" /> v1.1.0</Link
											>
										</li>
										<li>
											<Link href=""
												><i class="ri-stop-mini-fill align-middle fs-15 text-info" /> v1.2.0</Link
											>
										</li>
									</ul>
								</Collapse>
							</li>
						</ul>
					</div>

					<div class="mt-auto text-center">
						<img src={taskImg} alt="Task" class="img-fluid" />
					</div>
				</div>
			</div>
			<div class="file-manager-content w-100 p-4 pb-0">
				<div class="hstack mb-4">
					<h5 class="fw-semibold fs-17 flex-grow-1 mb-0">
						Peer Club Admin & Dashboard <span class="badge bg-primary align-bottom ms-2">v1.7.0</span>
					</h5>
					<div class="hstack gap-2">
						<div class="btn-group" role="group" aria-label="Basic example">
							<button class="btn btn-icon fw-semibold btn-soft-danger"
								><i class="ri-arrow-go-back-line" /></button
							>
							<button class="btn btn-icon fw-semibold btn-soft-success"
								><i class="ri-arrow-go-forward-line" /></button
							>
						</div>
					</div>
				</div>
				<div class="p-3 bg-light rounded mb-4">
					<Row class="g-2">
						<Col class="col-lg-auto">
							<select
								class="form-control"
								name="choices-select-sortlist"
								id="choices-select-sortlist"
							>
								<option value="">Sort</option>
								<option value="By ID">By ID</option>
								<option value="By Name">By Name</option>
							</select>
						</Col>
						<Col class="col-lg-auto">
							<select class="form-control" name="choices-select-status" id="choices-select-status">
								<option value="">All Tasks</option>
								<option value="Completed">Completed</option>
								<option value="Inprogress">Inprogress</option>
								<option value="Pending">Pending</option>
								<option value="New">New</option>
							</select>
						</Col>
						<Col class="col-lg">
							<div class="search-box">
								<input
									type="text"
									id="searchTaskList"
									class="form-control search"
									placeholder="Search task name"
								/>
								<i class="ri-search-line search-icon" />
							</div>
						</Col>
						<Col class="col-lg-auto">
							<button class="btn btn-primary createTask" type="button" on:click={toggle}>
								<i class="ri-add-fill align-bottom" /> Add Tasks
							</button>
						</Col>
					</Row>
				</div>

				<div class="todo-content position-relative px-4 mx-n4" id="todo-content">
					{#if !data.todoTaskList}
						<div id="elmLoader">
							<div class="spinner-border text-primary avatar-sm" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					{/if}

					<div class="todo-task" id="todo-task">
						<div class="table-responsive">
							<table class="table align-middle position-relative">
								<thead class="table-active">
									<tr>
										<th scope="col">Task Name</th>
										<th scope="col">Assigned</th>
										<th scope="col">Due Date</th>
										<th scope="col">Status</th>
										<th scope="col">Priority</th>
										<th scope="col">Action</th>
									</tr>
								</thead>

								<tbody id="task-list">
									{#each data.todoTaskList as item}
										<tr>
											<td>
												<div class="d-flex align-items-start">
													<div class="flex-shrink-0 me-3">
														<div class="task-handle px-1 bg-light rounded">: :</div>
													</div>
													<div class="flex-grow-1">
														<div class="form-check">
															<input
																class="form-check-input me-1"
																type="checkbox"
																value="13"
																id={'todo' + item.id}
																checked={item.status === 'Completed' ? 'checked' : ''}
															/>
															<Label class="form-check-label" htmlfor={'todo' + item.id}
																>{item.task}
															</Label>
														</div>
													</div>
												</div>
											</td>
											<td>
												<div class="avatar-group">
													{#each item.subItem as item}
														<Link href="" class="avatar-group-item">
															<img src={item.img} alt="" class="rounded-circle avatar-xxs" />
														</Link>
													{/each}
												</div>
											</td>
											<td>{item.dueDate}</td>
											<td>
												{#if item.status == 'New'}
													<span class="badge badge-soft-info text-uppercase">New</span>
												{:else if item.status == 'Pending'}
													<span class="badge badge-soft-warning text-uppercase">Pending</span>
												{:else if item.status == 'Inprogress'}
													<span class="badge badge-soft-secondary text-uppercase">Inprogress</span>
												{:else if item.status == 'Completed'}
													<span class="badge badge-soft-success text-uppercase">Completed</span>
												{:else}
													<span class="badge badge-soft-success text-uppercase">Completed</span>
												{/if}
											</td>
											<td>
												{#if item.priority == 'High'}
													<span class="badge bg-danger text-uppercase">High</span>
												{:else if item.priority == 'Medium'}
													<span class="badge bg-warning text-uppercase">Medium</span>
												{:else if item.priority == 'Low'}
													<span class="badge bg-success text-uppercase">Low</span>
												{:else}
													<span class="badge bg-success text-uppercase">Low</span>
												{/if}
											</td>
											<td>
												<div class="hstack gap-2">
													<button class="btn btn-sm btn-soft-danger remove-list">
														<i class="ri-delete-bin-5-fill align-bottom" />
													</button>
													<button class="btn btn-sm btn-soft-info edit-list">
														<i class="ri-pencil-fill align-bottom" />
													</button>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
					<div class="py-4 mt-4 text-center" id="noresult" style="display: none">
						<lord-icon
							src="https://cdn.lordicon.com/msoeawqm.json"
							trigger="loop"
							colors="primary:#405189,secondary:#0ab39c"
							style="width: 72px; height: 72px"
						/>
						<h5 class="mt-4">Sorry! No Result Found</h5>
					</div>
				</div>
			</div>
		</div>
	</Container>
</div>

<Modal id="createTask" isOpen={modalTodo} {toggle} centered tabIndex="-1">
	<ModalHeader {toggle} class="p-3 bg-soft-success">Create Task</ModalHeader>
	<ModalBody>
		<div id="task-error-msg" class="alert alert-danger py-2" />
		<Form id="creattask-form">
			<input type="hidden" id="taskid-input" class="form-control" />
			<div class="mb-3">
				<Label htmlfor="task-title-input" class="form-label">Task Title</Label>
				<input
					type="text"
					id="task-title-input"
					class="form-control"
					placeholder="Enter task title"
					name="task"
				/>
			</div>
			<div class="mb-3 position-relative">
				<Label htmlfor="task-assign-input" class="form-label">Assigned To</Label>

				<div class="avatar-group justify-content-center" id="assignee-member" />
				<div class="select-element">
					<button
						class="btn btn-light w-100 d-flex justify-content-between"
						type="button"
						on:click={() => (droplist = !droplist)}
					>
						<span>Assigned To<b id="total-assignee" class="mx-1">0</b>Members</span>
						<i class="mdi mdi-chevron-down" />
					</button>
					<Dropdown>
						<DropdownMenu class={droplist ? 'w-100 show' : 'w-100'}>
							<div data-simplebar style="max-height: 141px">
								<ul class="list-unstyled mb-0">
									{#each assignee as item}
										<li>
											<DropdownItem class="d-flex align-items-center" href="">
												<div class="avatar-xxs flex-shrink-0 me-2">
													<img src={item.img} alt="" class="img-fluid rounded-circle" />
												</div>
												<div class="flex-grow-1">{item.name}</div>
											</DropdownItem>
										</li>
									{/each}
								</ul>
							</div>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
			<Row class="g-4 mb-3">
				<Col lg={6}>
					<Label htmlfor="task-status" class="form-label">Status</Label>
					<select id="task-status" name="taskstatus" class="form-control">
						<option value="New">New</option>
						<option value="Pending">Pending</option>
						<option value="Inprogress">Inprogress</option>
						<option value="Completed">Completed</option>
					</select>
				</Col>
				<Col lg={6}>
					<Label name="priority" htmlfor="priority-field" class="form-label">Priority</Label>
					<select id="priority-status" name="priority" class="form-control">
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</Col>
			</Row>
			<div class="mb-4">
				<Label htmlfor="task-duedate-input" class="form-label">Due Date:</Label>
				<Flatpickr
					name="dueDate"
					id="date-field"
					class="form-control"
					placeholder="Due date"
					options={{
						altInput: true,
						altFormat: 'd M, Y',
						dateFormat: 'd M, Y'
					}}
				/>
			</div>

			<div class="hstack gap-2 justify-content-end">
				<button type="button" class="btn btn-ghost-success" on:click={toggle}
					><i class="ri-close-fill align-bottom" /> Close</button
				>
				<button type="submit" class="btn btn-primary" id="addNewTodo" on:click={toggle}
					>Add Task</button
				>
			</div>
		</Form>
	</ModalBody>
</Modal>
