<script lang="ts">
    import { onMount } from "svelte";
    import { DataFrame } from '$lib/DataFrame';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    export let net: any;
    export let df: DataFrame;
    export let targets: Array<string>;

    let test: Object = {}
    let test_results: Object = {};
    let running_test = false;

    for (let header of df.headers) {
        if (df.types[header] === 0) {
            test[header] = (df.summary[header].max - df.summary[header].min) / 2.0;
        } else {
            test[header] = 0
        }
    }

    test_model();

    function test_model() {
        running_test = true;
        let test_df = new DataFrame(df.headers, [test]);
        test_df = df.normalize(test_df);

        for (let header in test_df.headers) {
            test_df.pop(header);
        }

        let res = net.run(test_df.data[0])

        let test_results_df = new DataFrame(targets, [res]);
        test_results_df = df.denormalize(test_results_df)

        for (let header of targets) {
            if (df.types[header] === 0 ) {
                test_results[header] = test_results_df.data[0][header];
            } else {
                const val = Math.round(test_results_df.data[0][header]);
                test_results[header] = df.filters[header][val];
            }
        }
        running_test = false
    }

    function randomize_all() {
        for (let header of df.headers) {
            if (!targets.includes(header)) {
                test[header] = df.randomize(header);
            }
        }
        
        test_model()
    }
</script>

<div class="flex flex-col h-full justify-center items-center">
    <div class="flex justify-around gap-8 p-4 items-center">
        <div class="bg-surface-200-700-token p-2 rounded-md shadow">
            <h3 class="h3">Input</h3>
            <div class="max-h-80 overflow-y-scroll p-2">
                {#each df.headers as header}
                    {#if !targets.includes(header)}
                        {#if df.types[header] === 0}
                            <label for={header}>{header}: {test[header].toFixed(3)}</label>
                            <input on:change={test_model} type="range" name={header} bind:value={test[header]} step=0.1 min={df.summary[header].min} max={df.summary[header].max}/>
                        {:else}
                            <label for={header}>{header}</label>
                            <select on:change={test_model} class="select" name={header} bind:value={test[header]}>
                                {#each df.filters[header] as level, i}
                                    <option selected={test[header] === i} value={i}>{level}</option>
                                {/each}
                            </select>
                        {/if}
                    {/if}
                {/each}
            </div>
            <div class="my-2 w-full flex justify-center">
                <button on:click={randomize_all} class="btn variant-filled w-fit">
                    <span><svg class="fill-white dark:fill-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z"/></svg></span>
                    {#if running_test}
                        <ProgressRadial stroke={100} width="w-6" meter="stroke-primary-400" track="stroke-primary-500"/>
                    {:else}
                        <span>Randomize</span>
                    {/if}
                </button>
            </div>
            
        </div>
        <svg class="flex-shrink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        <div class="bg-surface-200-700-token h-fit p-2 rounded-md console.log(df.filters)">
            <h3 class="h3">Output</h3>
            <div class="max-h-80 overflow-y-scroll p-2">
                {#each targets as header}
                    {#if df.types[header] === 0}
                        <p>{header}: {test_results[header].toFixed(3)}</p>
                    {:else}
                        <p>{header}: {test_results[header]}</p>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
    <!-- <button on:click={test_model} class="btn variant-filled w-fit flex-none">Submit</button> -->
</div>


