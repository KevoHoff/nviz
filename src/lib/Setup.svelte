<script lang="ts">
    import Papa from 'papaparse';
    import { FileDropzone, Stepper, Step, RangeSlider, popup, type PopupSettings, Toast, toastStore, type ToastSettings} from '@skeletonlabs/skeleton';
    import { flip } from 'svelte/animate';
	
    export let data: Papa.ParseResult<unknown>;
	export let num_hidden: number;  // Range slider
	export let activation: string;
	export let targets: Array<string>;
	export let trash: Array<string>;
	export let model_type: string = 'regression';

	let files: FileList;
	let draggedItem: string | null;
	let hoverBasket: number | null;

	const popupHoverRegression: PopupSettings = {
		event: 'hover',
		target: 'popupHoverRegression',
		placement: 'right'
	};

	const popupHoverClassification: PopupSettings = {
		event: 'hover',
		target: 'popupHoverClassification',
		placement: 'right'
	};


	$: targets = baskets[1].data;
	$: trash = baskets[2].data

    type Basket = {
		name: string,
		data: Array<string>,
		prev?: Array<number>
	}

	let baskets: Basket[] = [
		{
			name: "input",
			data: []
		},
		{
			name: "output",
			data: []
		},
		{
			name: "trash",
			data: [],
			prev: []
		}
	]

	const t: ToastSettings = {
		message: "Didn't mean to delete that?",
		background: 'bg-surface-400-500-token',
		action: {
			label: 'Undo',
			response: () => {
				baskets[baskets[2].prev[0]].data.push(baskets[2].data[0]); 
				baskets = baskets;
			}
		}
	}

    function parseCSV() {
		let file: File = files[0];

		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			complete: function(results) {
				data = results;

				console.log(data);

				let headers: Array<string> = Object.keys(data.data[0]);

				baskets[1].data.push(headers[0]);
				
				for (let i: number = 1; i < headers.length; i++) {
					baskets[0].data.push(headers[i])
				}
			}
		})
	}

	function dragStart(event: DragEvent, item: string, basket: number) {
		draggedItem = item;

		// Create data object
		const data = {item: item, basket: basket};

		
		// Package data for tranfer
		if (event.dataTransfer !== null) {
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("text/plain", JSON.stringify(data));
		}
	}

	function dragOver(event: DragEvent, basket: number) {
		event.preventDefault();

		// Identify basket hovering over to style
		hoverBasket = basket;
	}

	function dragLeave(event: DragEvent) {
        event.preventDefault();

		// Reset basket
        hoverBasket = null;
    }

	function drop(event: DragEvent, basketIdx: number) {
        event.preventDefault();

		if (event.dataTransfer !== null) {
			const data = JSON.parse(event.dataTransfer.getData("text/plain"));

			
			const index = baskets[data.basket].data.indexOf(data.item);
			
			baskets[data.basket].data.splice(index, 1);

			if ( basketIdx === 2 ) {
				baskets[2].data.unshift(data.item);
				baskets[2].prev?.unshift(data.basket);
				toastStore.trigger(t);
			} else {
				baskets[basketIdx].data.push(data.item);
			}
			
			hoverBasket = null;
			draggedItem = null;
			baskets = baskets;
		}
    }
</script>

<Stepper class="w-full md:max-w-2xl" on:complete>
	<Step locked={!files || files.length === 0}>
		<svelte:fragment slot="header">Select A File</svelte:fragment>
			<FileDropzone bind:files on:change={parseCSV} accept=".csv" name="files">
				<svelte:fragment slot="lead"><div class="w-full flex justify-center"><svg class="fill-token" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 9h-6l8-9 8 9h-6v11h-4v-11zm11 11v2h-18v-2h-2v4h22v-4h-2z"/></svg></div></svelte:fragment>
				<svelte:fragment slot="message">
					{#if files && files.length > 0}
						<p class="text-success-600-300-token">Successfully uploaded <span class="font-bold">{files[0].name}</span></p>
					{:else}
						<p><span class="font-bold">Upload a file</span> or drag and drop</p>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="meta"><p>CSV or other delimited files allowed.</p></svelte:fragment>
			</FileDropzone>
			<hr class="m-10">
	</Step>
	<Step>
		<svelte:fragment slot="header">Decide Outputs</svelte:fragment>
		<p>Try dragging your features!</p>
		{#if files && files.length > 0}
		<div class="grid grid-cols-2 gap-2">
			<div>
				<h4 class="h4">Inputs</h4>
				<div class:border-dashed={hoverBasket === 0} class="bg-surface-200-700-token border-surface-400-500-token flex flex-wrap gap-2 border-2 rounded p-2"
				on:drop|preventDefault={event => drop(event, 0)} on:dragover={event => dragOver(event, 0)} on:dragleave={event => dragLeave(event)}>
					{#each baskets[0].data as header, i (header)}
						<div animate:flip on:dragstart={event => dragStart(event, header, 0)} draggable={baskets[0].data.length > 1} class:cursor-grab={baskets[0].data.length > 1} class="bg-surface-500 select-none p-1 rounded-md w-fit">
							<p class="text-white">{header}</p>
						</div>
					{/each}
					{#if hoverBasket === 0 && !baskets[0].data.includes(draggedItem)}
						<div class="pointer-events-none bg-surface-500 select-none p-1 rounded-md w-max opacity-50">
							<p class="text-white">{draggedItem}</p>
						</div>
					{/if}
				</div>
			</div>
			<div>
				<h4 class="h4">Outputs</h4>
				<div class:border-dashed={hoverBasket === 1} class="bg-surface-200-700-token border-dashed border-surface-400-500-token flex flex-wrap gap-2 border-2 rounded p-2"
				on:drop|preventDefault={event => drop(event, 1)} on:dragover={event => dragOver(event, 1)} on:dragleave={event => dragLeave(event)}>
					{#each baskets[1].data as header, i (header)}
						<div animate:flip on:dragstart={event => dragStart(event, header, 1)} draggable={baskets[1].data.length > 1} class:cursor-grab={baskets[1].data.length > 1} class="bg-surface-500 select-none p-1 rounded-md w-fit">
							<p class="text-white">{header}</p>
						</div>
					{/each}
					{#if hoverBasket === 1 && !baskets[1].data.includes(draggedItem)}
						<div class="pointer-events-none inline-block bg-surface-500 select-none p-1 rounded-md w-max opacity-50"><p class="text-white">{draggedItem}</p></div>
					{/if}
				</div>
			</div>
			<div class="col-span-2">
				<div class:border-dashed={hoverBasket === 2} class="bg-surface-200-700-token border-dashed border-surface-400-500-token border-2 rounded p-2 flex justify-center items-center"
				on:drop|preventDefault={event => drop(event, 2)} on:dragover={event => dragOver(event, 2)} on:dragleave={event => dragLeave(event)}>
					<svg class="dark:fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"/></svg>
				</div>
			</div>
		</div>
		{/if}
	</Step>
	<Step>
		<svelte:fragment slot="header">Customize Your Model</svelte:fragment>
		<form action="" class="bg-surface-200-700-token p-4 rounded-lg">
			<div class="space-y-2 w-fit">
				<label for="model-type" class="w-full">
					<p>Model goal</p>
				</label>
				<label class="flex items-center space-x-2" use:popup={popupHoverRegression}>
					<input class="radio" type="radio" checked name="model-type" value="regression" bind:group={model_type}/>
					<p>Regression</p>
				</label>
				<label class="flex items-center space-x-2" use:popup={popupHoverClassification}>
					<input class="radio" type="radio" name="model-type" value="classification" bind:group={model_type}/>
					<p>Classification</p>
				</label>
				<div class="card p-4 variant-filled-primary w-1/2" data-popup="popupHoverRegression">
					<p class="text-xs">Regression is used when we want to understand how one thing can predict or explain another thing, like how the price of a house is influenced by factors such as its size, location, and the number of bedrooms.</p>
				</div>
				<div class="card p-4 variant-filled-primary w-1/2" data-popup="popupHoverClassification">
					<p class="text-xs">Classification is used when we want to assign things into different categories or groups based on certain characteristics, like determining whether an email is spam or not based on its content and subject line.</p>
				</div>
			</div>
			<label for="activation">Activation</label>
			<select bind:value={activation} name="activation" class="select">
				<option value="relu">ReLU</option>
				<option value="leaky-relu">Leaky ReLU</option>
				<option value="sigmoid">Sigmoid</option>
				<option value="tanh">Tanh</option>
			</select>
			<label for="num_hidden" class="space-y-4">Number of nodes in hidden layer: <span class="font-semibold">{num_hidden}</span></label>
			<RangeSlider name="range-slider" bind:value={num_hidden} min={0} max={8} step={1} ticked>
			</RangeSlider>
		</form>
	</Step>
</Stepper>
<Toast></Toast>