<script lang="ts">
    import { onMount } from "svelte";
    import { Network } from "$lib/Network";

    export let net: any;

    $: updatePlot(net)

    var data = [{}];
    let n: any;
    let plotData = {
        source: [],
        target: [],
        value: [],
        color: []
    }

    var layout = {
        title: "Network Visualizer",
        font: {
            size: 12,
            family: 'Quicksand'
        },
        xaxis: {
            title: 'Feature importance'
        },
        paper_bgcolor: '#00000000'
    }

    function updatePlot(net) {
        if (net?.weights.length > 0 && n !== undefined) {
            n.set_links();
            plotData = n.get_plot_info();

            data[0].node.label = plotData.label;
            data[0].link.source = plotData.source;
            data[0].link.target = plotData.target;
            data[0].link.value = plotData.value;
            data[0].link.color = plotData.color;

            Plotly.redraw('sankey')
        }
    }


    onMount(() => {
        console.log(net);
        n = new Network(net);
        n.set_links();
        plotData = n.get_plot_info();
        // console.log(nodes);

        data[0] = {
            type: "sankey",
            orientation: "h",
            textfont: {
                color: "black"
            },
            node: {
                // pad: 15,
                // thickness: 30,
                line: {
                    color: "black",
                    width: 0.5,
                },
                label: plotData.label,
            },
            link: {
                source: plotData.source,
                target: plotData.target,
                value: plotData.value,
                color: plotData.color
            },
            arrangement: 'snap'
        }


        Plotly.react('sankey', data, layout, {responsive: true})
    }) 
</script>

<div id="sankey" class="w-full h-full shadow rounded-md"></div>
