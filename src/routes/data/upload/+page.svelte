<script lang='ts'>
    import { FileDropzone } from "@skeletonlabs/skeleton";
    import { DataFrame } from "$lib/DataFrame"
    import { dataFrameStore } from "$lib/stores"
    import { goto } from "$app/navigation";
    import { base } from "$app/paths"
    import Papa from "papaparse";


    let files: FileList;

    function onChangeHandler(e: Event): void {
        Papa.parse(files[0], {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                const df = new DataFrame(results.data) // TODO: Kevin fix typing
                dataFrameStore.set(df);
                goto(`${base}/data/view`)
            }
        })
    }
</script>

<h2 class="m-4 h2">Upload File</h2>
<FileDropzone name="files" bind:files={files} on:change={onChangeHandler} accept=".csv">
    <svelte:fragment slot="lead"><img class="mx-auto" src="/upload-icon.svg" alt="" srcset=""></svelte:fragment>
    <svelte:fragment slot="message">Upload a dataset</svelte:fragment>
    <svelte:fragment slot="meta">(Accepts CSVs)</svelte:fragment>
</FileDropzone>