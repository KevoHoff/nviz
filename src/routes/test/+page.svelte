<script>
    import Sankey from "$lib/Sankey.svelte";
    import { onMount } from "svelte";

    let sizes = [5, 2, 1]

    let weights = [
        [
            [1, 1, 1, 1, 1],
            [1, 1, -1, 1, 1]
        ],
        [
            [1, 1]
        ]
    ]

    function increment() {
        weights[0][0][0] += 1;
    }

    // let sankey;
    // let counter = 0.0;

    // function increment() {
    //     counter += 1;
    // }

    // function getDataRows() {
    //     const rows = [];

    //     for (let i in weights) {
    //         for (let j in weights[i]) {
    //             for (let k in weights[i][j]) {
    //                 const initial = `${i},${k}`;
    //                 const final = `${parseInt(i)+1},${j}`;
    //                 const weight = Math.abs(weights[i][j][k])
    //                 const color = Math.sign(weights[i][j][k]) <= 0.0 ? 'color: rgb(255,0,0)' : 'color: rgb(0,255,0)';
    //                 const row = [initial, final, weight, color, `Weight: \n${weights[i][j][k]}`];

    //                 rows.push(row);
    //             }
    //         }
    //     }

    //     return rows;
    // }

    // onMount(() => {
    //     let rows = getDataRows()
    //     google.charts.load("current", {
    //         packages: ["sankey"]
    //     });
    //     google.charts.setOnLoadCallback(drawChart);

    //     function drawChart() {
            // var data = new google.visualization.DataTable();
            // data.addColumn('string', 'From');
            // data.addColumn('string', 'To');
            // data.addColumn('number', 'Weight');
            // data.addColumn({
            // type: 'string',
            // role: 'style'
            // });
            // data.addColumn({
            //     type: 'string', 
            //     role: 'tooltip'
            // });
            // data.addRows(rows);
            

            // var colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
            // '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'
            // ];

    //         // Set chart options
    //         var options = {
    //         height: 400,
    //         sankey: {
    //             node: {
    //             colors: colors,
    //             width: 5,
    //             nodePadding: 1
    //             },
    //             link: {
    //             // colorMode: 'gradient',
    //             // colors: colors
    //             }
    //         }
    //         };

    //         // Instantiate and draw our chart, passing in some options.
    //         var chart = new google.visualization.Sankey(sankey);
    //         chart.draw(data, options);
    //     }
    // })
	
</script>

<Sankey {weights}></Sankey>
<button on:click={increment}>Test</button>
<!-- <div id="sankey" bind:this={sankey} class="w-[100vw] h-[100vh] border-4"></div> -->
<!-- <button on:click={increment}></button> -->