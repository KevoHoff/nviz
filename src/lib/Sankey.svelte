<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { Network } from "$lib/Network.js";
    import { plot } from "plotly.js-dist";

    export let weights = undefined;
    export let net = undefined;

    let n;
    let plot_info = {
        source: [],
        target: [],
        value: [],
        color: []
    }

    var layout = {
        title: "Network Visualizer",
        font: {
            size: 12,
        }
    }

    var data = [{}];

    $: weights && n && n.set_links() && update_data();

    function update_data() {
        plot_info = n.get_plot_info();

        data[0].node.label = plot_info.label;
        data[0].link.source = plot_info.source;
        data[0].link.target = plot_info.target;
        data[0].link.value = plot_info.value;
        data[0].link.color = plot_info.color;
        console.log(data[0].link);

        Plotly.redraw('sankey')

        return true;
    }


    onMount(() => {
        n = new Network(net);
        n.set_links();
        plot_info = n.get_plot_info();
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
                label: plot_info.label,
            },
            link: {
                source: plot_info.source,
                target: plot_info.target,
                value: plot_info.value,
                color: plot_info.color
            }
        }

        console.log(data, layout)


        Plotly.newPlot('sankey', data, layout, {responsive: true})
    }) 
    
    
</script>

<div id="sankey" class="w-full h-canvas"></div>