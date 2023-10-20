<script lang='ts'>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Setup from '$lib/Setup.svelte';
	import Visualizer from '$lib/Visualizer.svelte';
	import { DataFrame } from '$lib/DataFrame';

	let state: 0 | 1 = 0;
	let data: Papa.ParseResult<unknown>;
	let num_hidden: number;  // Range slider
	let activation: string;
	let targets: Array<string>;
	let trash: Array<string>
	let df: DataFrame;
	let tab: number = 0;
	let model_type: string = 'regression';

	function setupModel() {
		state = 1;
		df = new DataFrame(data.meta.fields, data.data);

		for (let header of trash) {
			df.pop(header);
		}
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200-700-token"  shadow="shadow-md">
			<svelte:fragment slot="lead">
				<a href="/"><img class="h-10" src="logo-icon.svg" alt="NVIZ"></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex gap-4">
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/'>Home</a></li>
					<li><a class="decoration-primary-400 decoration-2 underline-offset-8 underline" href='/playground'>Playground</a></li>
					<li><a class="decoration-primary-500 decoration-2 underline-offset-8 hover:underline" href='/contact'>Contact</a></li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		{#if state == 1}
			<button on:click={() => {state = 0}} class="anchor p-4">← Back to setup</button>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if state === 1}
			<div class="w-full h-full bg-surface-50-900-token border-e-2 border-primary-200-700-token">
				<ul>
					<li>
						<button on:click={() => {tab = 0}} class:bg-primary-300-600-token={tab === 0} class:hover:bg-surface-100-800-token={tab !==0 } class="flex justify-center flex-col items-center border border-black p-4 border-primary-200-700-token hover:bg-surface-100-800-token w-full">
							<svg class="dark:fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
							<p>Model</p>
						</button>
					</li>
					<li>
						<button on:click={() => {tab = 1}} class:bg-primary-300-600-token={tab === 1} class:hover:bg-surface-100-800-token={tab !==1 } class="flex justify-center flex-col items-center border border-black p-4 border-primary-200-700-token hover:bg-surface-100-800-token w-full">
							<svg class="dark:fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10zm-2 2.252v1.038c-2.89.862-5 3.542-5 6.71 0 3.863 3.137 7 7 7 1.932 0 3.682-.784 4.949-2.051l.706.706c-1.448 1.449-3.448 2.345-5.655 2.345-4.416 0-8-3.585-8-8 0-3.725 2.551-6.859 6-7.748zm0 3.165v1.119c-1.195.692-2 1.984-2 3.464 0 2.208 1.792 4 4 4 1.104 0 2.104-.448 2.828-1.172l.707.707c-.905.904-2.155 1.465-3.535 1.465-2.76 0-5-2.24-5-5 0-2.049 1.235-3.811 3-4.583zm1 2.851v-6.268c0-.265.105-.52.293-.707.187-.188.442-.293.707-.293.265 0 .52.105.707.293.188.187.293.442.293.707v6.268c.598.346 1 .992 1 1.732 0 1.104-.896 2-2 2s-2-.896-2-2c0-.74.402-1.386 1-1.732z"/></svg>
							<p>Stats</p>
						</button>
					</li>
					<li>
						<button on:click={() => {tab = 2}} class:bg-primary-300-600-token={tab === 2} class:hover:bg-surface-100-800-token={tab !==2 } class="flex justify-center flex-col items-center border border-black p-4 border-primary-200-700-token hover:bg-surface-100-800-token w-full">
							<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.759 20.498l-3.743-7.856c-1.041-2.186-2.016-4.581-2.016-7.007v-2.635h-2c0 3.391-.083 5.188 2.21 10.502l3.743 7.854c.143.302-.068.644-.377.644h-1.246l-4.88-10h-2.984c1.795-4.183 1.528-5.963 1.534-9h-2v2.635c0 2.426-.975 4.82-2.016 7.006l-3.743 7.856c-.165.348-.241.708-.241 1.058 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-13.259 1.502c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm2.5-4c-.553 0-1-.447-1-1 0-.553.447-1 1-1 .552 0 1 .447 1 1 0 .553-.448 1-1 1zm3 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-5-20c0-.552.448-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1h-6c-.552 0-1-.448-1-1z"/></svg>
							<p>Test</p>
						</button>
					</li>

				</ul>
			</div>
		{/if}
	</svelte:fragment>
	<div class="container h-full mx-auto flex flex-col justify-center items-center gap-8 p-4">
		{#if state === 0}
			<Setup bind:data bind:num_hidden bind:activation bind:targets bind:trash bind:model_type on:complete={setupModel}></Setup>
		{:else if state === 1}
			<Visualizer {df} {num_hidden} {activation} {targets} {tab} {model_type}></Visualizer>
		{/if}
	</div>
</AppShell>