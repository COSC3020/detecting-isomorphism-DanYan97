const jsc = require('jsverify');
const fs = require('fs');
eval(fs.readFileSync('code.js', 'utf-8'));  

//create a graph class structure
class Graph {
    constructor() {
        this.vertices = [];
        this.numEdges = 0;
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
    }

    addEdge(v1, v2) {
        v1.neighbors.push(v2);
        v2.neighbors.push(v1);
        this.numEdges++;
    }

    hasEdge(v1, v2) {
        return v1.neighbors.includes(v2);
    }
}

class Vertex {
    constructor(id) {
        this.id = id;
        this.neighbors = [];
    }
}

//test the isomorphic with shuffled graph
const test = jsc.forall("dict(dict(nat))", function (graphDict) {
    // convert dict to graph structure
    const graph1 = new Graph();
    const graph2 = new Graph();

    // create graphs
    Object.keys(graphDict).forEach(key => {
        const v1 = new Vertex(key);
        const v2 = new Vertex(key);
        graph1.addVertex(v1);
        graph2.addVertex(v2);
    });

    // add edges 
    Object.keys(graphDict).forEach(key => {
        const node = graph1.vertices.find(v => v.id === key);
        const connections = graphDict[key];

        Object.keys(connections).forEach(neighbor => {
            const neighborNode = graph1.vertices.find(v => v.id === neighbor);
            if (neighborNode) {
                graph1.addEdge(node, neighborNode);
            }
        });
    });

    // shuffle graph2 from graph1 
    const shuffledGraph2 = new Graph();
    const shuffledMapping = {};

    graph1.vertices.forEach(v => {
        const newVertex = new Vertex(v.id);
        shuffledGraph2.addVertex(newVertex);
        shuffledMapping[v.id] = newVertex;
    });

    // shuffle edges 
    graph1.vertices.forEach(v => {
        v.neighbors.forEach(neighbor => {
            const newV = shuffledMapping[v.id];
            const newNeighbor = shuffledMapping[neighbor.id];
            if (!shuffledGraph2.hasEdge(newV, newNeighbor)) {
                shuffledGraph2.addEdge(newV, newNeighbor);
            }
        });
    });

    
    return are_isomorphic(graph1, shuffledGraph2);
});


jsc.assert(test, { tests: 1000 });