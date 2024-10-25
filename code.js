function are_isomorphic(graph1, graph2) {

    // check if the number of vertices is the same
    if (graph1.vertices.length !== graph2.vertices.length) {
        return false;
    }

    // check if the number of edges is the same
    if (graph1.numEdges !== graph2.numEdges) {
        return false;
    }

    // create a vertex table for constant-time search
    var graph2VertexMap = [];
    for (var v of graph2.vertices) {
        graph2VertexMap[v.id] = v;
    }

    // check if the edges and corresponding vertices are the same
    for (var v of graph1.vertices) {
        var vG2 = graph2VertexMap[v.id]; 
        if (!vG2) {
            return false; // return false if not found
        }

        // neighbor comparison 
        var neighbors1 = new Set(v.neighbors.map(neighbor => neighbor.id));
        var neighbors2 = new Set(vG2.neighbors.map(neighbor => neighbor.id));

        if (!setsEqual(neighbors1, neighbors2)) {
            return false; // return false if not match
        }
    }

    // return true if the graphs are isomorphic
    return true;
}

// helper function to check if two sets are equal
function setsEqual(set1, set2) {
    if (set1.size !== set2.size) {
        return false;
    }
    for (var item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    return true;
}