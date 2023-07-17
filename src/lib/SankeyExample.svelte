<script lang="ts">
    import { onMount } from "svelte";

    let nodes = [
        '# of cookies',
        'Work',
        'Happiness'
    ]

    let comments: string[] = [
        'As you eat more cookies,<br>you tend to feel more happy!',
        'With that new assignment, <br>you have less time eat cookies. <br>This leaves you feeling less happy :('
    ]

    var data = [{
            type: "sankey",
            orientation: "h",
            textfont: {
                color: "black"
            },
            node: {
                line: {
                    color: "black",
                    width: 0.5,
                },
                label: nodes,
                hovertemplate: '%{label}'
            },
            link: {
                source: [0,1],
                target: [2,2],
                value: [2,1],
                customdata: comments,
                color: ['#00FF0055', '#FF000055'],
                hovertemplate: '%{customdata}',
                hoverlabel: {
                    'align': "left"
                }
            },
            arrangement: 'snap',
        }];


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

    onMount(() => {
        Plotly.react('sankey', data, layout, {responsive: true})
    }) 
</script>

<div id="sankey" class="w-full h-full shadow rounded-md"></div>
