<script lang='ts'>
	import Setup from '$lib/Setup.svelte';
	import Visualizer from '$lib/Visualizer.svelte';
	import { DataFrame } from '$lib/DataFrame';
	import { AppShell, AppBar} from '@skeletonlabs/skeleton';

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

<div class="container h-full mx-auto flex flex-col justify-center items-center gap-8 p-4">
	{#if state === 0}
		<Setup bind:data bind:num_hidden bind:activation bind:targets bind:trash bind:model_type on:complete={setupModel}></Setup>
	{:else if state === 1}
		<Visualizer {df} {num_hidden} {activation} {targets} {tab} {model_type}></Visualizer>
	{/if}
</div>