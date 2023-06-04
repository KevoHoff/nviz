export class Network {
    net: any;
    layers: Array<unknown>;

    constructor(net) {
        this.net = net;
        this.layers = [];

        let node_counter = 0;

        let headers = Object.keys(net.inputLookup);
        let enders = Object.keys(net.outputLookup);

        for (let layer in this.net.sizes) {
            let nodes = []
            for (let i = 0; i < this.net.sizes[layer]; i++) {
                let node = {}

                node['id'] = node_counter;

                let label = "";

                if (layer == 0) {
                    label = headers[i];
                } else if (layer == this.net.sizes.length - 1) {
                    label = enders[i];
                }

                node['label'] = label;

                node['links'] = [];

                node_counter += 1;

                nodes.push(node);
            }

            this.layers.push(nodes);
        }

        for (let i in this.net.weights) {
            for (let j in this.net.weights[i]) {  // index of node in target layer
                for (let k in this.net.weights[i][j]) {  // index of node in source layer
                    this.layers[i-1][k].links.push({
                        id: this.layers[i][j].id,
                        value: this.net.weights[i][j][k]
                    });
                }
            }
        }
    }

    set_links() {
        for (let i in this.net.weights) {
            for (let j in this.net.weights[i]) {  // index of node in target layer
                for (let k in this.net.weights[i][j]) {  // index of node in source layer
                    let link = {
                        id: this.layers[i][j].id,
                        value: this.net.weights[i][j][k]
                    }
                    
                    this.layers[i-1][k].links[j] = link;
                }
            }
        }
    }

    get_plot_info() {
        let res = {
            source: [],
            target: [],
            value: [],
            color: [],
            label: []
        }

        for (let col in this.layers) {
            for (let row in this.layers[col]) {
                let node = this.layers[col][row];
                let source = node.id;
                let label = node.label;

                for (let link of node.links) {
                    let target = link.id;
                    let value = Math.abs(link.value);
                    let color = link.value >= 0 ? "rgba(76,187,23, 0.5)" : "rgba(237,41,57, 0.5)";

                    res.source.push(source);
                    res.target.push(target);
                    res.value.push(value);
                    res.color.push(color);
                }

                res.label.push(label);
            }
        }

        return res;
    }
    
}