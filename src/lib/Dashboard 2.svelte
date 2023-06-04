<script lang="ts">
    import { onMount } from "svelte";

    export let error_history: Array<number> = [];
    export let epoch_history: Array<number> = [];

    let data = [{}];
    let lossPlot;

    $: lossPlot && update_error_plot_data(error_history);

    function update_error_plot_data(error_history) {
        let trace = {
            x: [],
            y: [],
            type: 'lines'
        };

        let epochs = 0;
        for (let i in error_history) {
            epochs += epoch_history[i];
            trace.x.push(epochs);
            trace.y.push(error_history[i]);
        }

        data[0] = trace;
        Plotly.redraw('loss')
    }


    onMount(() => {

        let layout = {
            title: {
                text: "Loss Graph"
            },
            font: {
                size: 12,
                family: 'Quicksand'
            },
            hovermode: !1,
            autosize: true,
            xaxis: {
                title: {
                    text: 'Epoch'
                },
                showticklabels: true,
                rangemode: 'tozero'
            },
            yaxis: {
                title: {
                    text: 'Loss',
                },
                showticklabels: true,
                rangemode: 'tozero'
            },
            paper_bgcolor: '#00000000',
            plot_bgcolor: '#00000000'
        }

        Plotly.newPlot('loss', data, layout,{responsive: true, displayModeBar: false})
    }); 
    
    
</script>

<div bind:this={lossPlot} id="loss" class="w-full h-full shadow rounded-md"></div>
