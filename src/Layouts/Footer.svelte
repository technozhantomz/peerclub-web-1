<script>
	import { Col, Container, Row } from 'sveltestrap';
</script>

<footer class="footer">
	<Container fluid>
		<Row>
			<Col sm={6}>
				{new Date().getFullYear()} © Homepesa Mega.
			</Col>
			<Col sm={6}>
				<div class="text-sm-end d-none d-sm-block">Design & Develop by Homepesa</div>
			</Col>
		</Row>
	</Container>
</footer>
