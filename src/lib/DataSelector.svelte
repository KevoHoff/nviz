<script>
    import Papa from 'papaparse';
    import { createEventDispatcher } from 'svelte';
    import { filedrop } from "filedrop-svelte";
    import { slide } from 'svelte/transition';
    import Spinner from '$lib/Spinner.svelte';
    
    /* Props */
    export let csv;
    export let loading = true;
    export let dummy_vars = true;

    /* Vars */
    const dispatch = createEventDispatcher()
    let files;
    let stored_files;
    let options = {};
    let modal = true;

    /* CSV Configuration */
    let manual_delimiters = true;
    let delimiter = "";
    let headers = true;
    let skip_empty_spaces = true;
    let waiting = false;

    $: if (files) {
        let file = files[0];

        Papa.parse(file, {
            delimiter: !manual_delimiters ? delimiter : "",
            skipEmptyLines: skip_empty_spaces,
            header: headers,
            // worker: true,
            before: function() {
                waiting = true;
            },
            complete: function (results) {
                waiting = false;
                dispatch('upload', { csv: results});
            }
        });
    }

    function submitFile() {
        toggleModal();
        files = stored_files;
    }

    function dropHandler(event) {
        stored_files = event.detail.files.accepted
        toggleModal();
    }

    function toggleModal() {
        modal = !modal;
    }
</script>

<section class="flex-grow self-center">
    <div class="w-sm mx-auto">
        <h2 class="w-full mx-auto p-4">Upload CSV File</h2>
        <div class:disabled={waiting} class="w-full">
            <div  class="selector-options">
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" use:filedrop={options} on:filedrop={dropHandler} class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">CSV (Delimeter-Separated File).</p>
                        </div>
                        <input id="dropzone-file" type="file" bind:files={stored_files} class="hidden" accept=".csv"/>
                    </label>
                </div> 
            </div>
        </div>
        {#if waiting}
        <Spinner></Spinner>
        {/if}
    </div>
    {#if !modal}
    <div class="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-blur-sm">
        <!-- Main modal -->
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-x-hidden overflow-y-auto h-modal h-fit">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" on:click={toggleModal} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Specify CSV Configuration</h3>
                        <form class="space-y-6" action="#">
                            <div>
                                <label class="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" bind:checked={manual_delimiters} class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Auto-Detect Delimiters</span>
                                  </label>
                            </div>
                            {#if !manual_delimiters}
                            <div transition:slide class="relative">
                                <input type="text" bind:value={delimiter} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-1/2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="," />
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Delimiter</label>
                            </div>
                            {/if}
                            <div>
                                <label class="inline-flex relative items-center cursor-not-allowed opacity-75">
                                    <input type="checkbox" bind:checked={headers} class="sr-only peer" disabled>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Headers</span>
                                  </label>
                            </div>
                            <div>
                                <label class="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" bind:checked={skip_empty_spaces} class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Skip Empty Spaces</span>
                                  </label>
                            </div>
                            <div>
                                <label class="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" bind:checked={dummy_vars} class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Categorical → Dummy Vars</span>
                                  </label>
                            </div>
                            <button type="submit" on:click={submitFile} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
</section>


<style>
    .disabled {
        filter: blur(4px);
        pointer-events: none;
    }
</style>