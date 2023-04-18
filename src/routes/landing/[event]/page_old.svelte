<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import 'add-to-calendar-button';

	import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter, Line } from 'svelte-share-buttons-component';

	const url = data.web_url;
	const title = data.title
	const desc = data.description;


	//console.log(data.start.split("T")[0]);
	//To define times
	//startTime="10:15"
	//endTime="23:30"
  //iCalFileName=""

</script>

<h1>Dynamic Event</h1>
<h1>{data.title}</h1>
<div>{@html data.description}</div>

<add-to-calendar-button
	name={data.title}
	startDate={data.start.split('T')[0]}
	timeZone="America/Los_Angeles"
	location={data.location}
	description="{data.description} [br]→ [url]{data.web_url}"
	options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
	lightMode="dark"
  hideBackground="true"
/>
<div class="mt-5">
<Email class="share-button share-radius" subject="{title}" body="{desc} {url}" />
<HackerNews class="share-button share-radius" {title} {url} />
<Reddit class="share-button share-radius" {title} {url} />
<LinkedIn class="share-button share-radius" {url} />
<Tumblr class="share-button share-radius" {title} {url} caption="{title}" />
<Pinterest class="share-button share-radius" {url} media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png" description={title} />
<Telegram class="share-button share-radius" text={title} {url} />
<Vk class="share-button share-radius" {title} {url} />
<WhatsApp class="share-button share-radius" text="{title} {url}" />
<Xing class="share-button share-radius" {title} {url} />
<Facebook class="share-button share-radius" quote="{title}" {url} />
<Twitter class="share-button share-radius" text="{title}" {url} hashtags="github,svelte" via="username" related="other,users" />
<Line class="share-button share-radius" {url} />
</div>
