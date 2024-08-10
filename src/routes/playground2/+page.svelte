<script lang='ts'>
    import { dataFrameStore, outputStrings } from "$lib/stores";
    import { DataFrame } from "$lib/DataFrame";
	import { goto } from "$app/navigation";
    import * as tf from "@tensorflow/tfjs";
	import { onMount } from "svelte";
    // import Sankey2 from "$lib/Sankey2.svelte";
    import Plotly from 'plotly.js-dist';

    let df = $dataFrameStore;

    // onMount(() => {
        // if (false/*df === null*/) {
        //     goto('/data/upload')
        // } else {
        //     // console.log(df)
        //     const categoricalColumns = df.getCategoricalColumns();

        //     for (let column of categoricalColumns) {
        //         let new_categories = df.createDummyColumns(column);
        //         outputStrings.update(list => {
        //             if (list.includes(column)) {
        //                 return [...list, ...new_categories]
        //             } else {
        //                 return list
        //             }
        //         })

        //         outputStrings.update(list => {
        //             return list.filter(item => item != column)
        //         })

        //         df.dropColumn(column);
        //     }

        //     let outputs = $outputStrings
        //     df.normalize();
        //     let [X_train, y_train, X_test, y_test] = df.trainTestSplit(0.1, outputs)   
        //     console.log(X_train, y_train)
        //     // let [X_train_T, y_train_T, X_test_T, y_test_T] = [X_train, y_train, X_test, y_test].forEach((el) => tf.tensor(el.map(obj => Object.values(obj))))
        //     let X_train_T = tf.tensor(X_train.map(obj => Object.values(obj)))
        //     let y_train_T = tf.tensor(y_train.map(obj => Object.values(obj)))
        //     let X_test_T = tf.tensor(X_test.map(obj => Object.values(obj)))
        //     let y_test_T = tf.tensor(y_test.map(obj => Object.values(obj)))

        //     const model = tf.sequential();
        //     model.add(tf.layers.dense({ units: 128, inputShape: [4], activation: 'relu' }));
        //     model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
        //     model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        //     model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));
        //     model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy']})

        //     async function trainModel() {
        //         const history = await model.fit(X_train_T, y_train_T, {
        //             epochs: 20,
        //             validationSplit: 0.1,
        //             callbacks: {
        //                 onEpochEnd: (epoch, logs) => {
        //                     console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`);
        //                 }
        //             }
        //         });

        //         console.log('Training complete')
        //     }
            
        //     trainModel();
        // }
    // })

    onMount(() => {
        var data = {
        type: "sankey",
        orientation: "h",
        node: {
            pad: 15,
            thickness: 30,
            line: {
            color: "black",
            width: 0.5
            },
        label: ["A1", "A2", "B1", "B2", "C1", "C2"],
        color: ["blue", "blue", "blue", "blue", "blue", "blue"]
            },

        link: {
            source: [0,1,0,2,3,3],
            target: [2,3,3,4,4,5],
            value:  [8,4,2,8,4,2]
        }
        }

        var data = [data]

        var layout = {
            title: "Basic Sankey",
            font: {
                size: 10
            }
        }

        Plotly.newPlot('sankey', [data], layout)
    })
    
</script>

<div id="sankey"></div>
<!-- <Sankey2></Sankey2> -->