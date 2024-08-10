<script lang='ts'>
    import { dataFrameStore, outputStrings } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths"
    import { flip } from 'svelte/animate';

    let features: Array<string> = []
    let outputs: Array<string> = []

    if ($dataFrameStore === null) {
        goto(`${base}/data/upload`)
    } else {
        const columns: Array<string> = $dataFrameStore.columns
        features = columns.slice(0, -1)
        outputs = columns.slice(-1)
    }

    function updateOutputs(): void {
        outputStrings.set(outputs)
    }
    
    function featureToOutput(feature: string): void {
        if (features.length > 1) {
            outputs.push(feature);
            features = features.filter((i) => i !== feature);

            outputs = outputs;
        }
    }

    function outputToFeature(output: string): void {
        if (outputs.length > 1) {
            features.push(output);
            outputs = outputs.filter((i) => i !== output);

            features = features;
        }
    }
</script>

<div class="grid grid-cols-2 place-items-center mb-8">
    <h3 class="h3">Features</h3>
    <h3 class="h3">Outputs</h3>
    <div>
        <div>
            <ul>
                {#each features as feature (feature)}
                    <li animate:flip class="text-center cursor-pointer border rounded p-1 my-2 hover:bg-slate-100" on:click={() => featureToOutput(feature)}>{feature}</li>
                {/each}
            </ul>
        </div>
    </div>
    <div>
        
        <div>
            <ul>
                {#each outputs as output (output)}
                    <li animate:flip class="text-center cursor-pointer border rounded p-1 my-2 hover:bg-slate-100" on:click={() => outputToFeature(output)}>{output}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>
<a href="{base}/playground2" on:click={updateOutputs} class="btn variant-filled w-fit mx-auto">Submit</a>
