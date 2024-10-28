function are_isomorphic(graph1, graph2) {

    // check if the number of vertices is the same
    if (graph1.vertices.length !== graph2.vertices.length) {
        return false;
    }

    // check if the number of edges is the same
    if (graph1.numEdges !== graph2.numEdges) {
        return false;
    }

    // use node mapping based on structural properties
    var nodeMapping = matchNodes(graph1, graph2);
    if (nodeMapping === null) {
        return false; // no mapping found
    }

    // check if edges matchs 
    for (var node1 of graph1.vertices) {
        var node2 = nodeMapping.get(node1);
        if (!matchEdges(node1, node2, nodeMapping)) {
            return false;
        }
    }

    // return true if the graphs are isomorphic
    return true;
}

// map nodes 
function matchNodes(graph1, graph2) {
    var edgeNodes1 = groupNodes(graph1.vertices);
    var edgeNodes2 = groupNodes(graph2.vertices);

    var nodeMapping = new Map();

    for (var [edge, nodes1] of edgeNodes1.entries()) {
        var nodes2 = edgeNodes2.get(edge);
        if (!nodes2 || nodes1.length !== nodes2.length) {
            return null; // return null if no matching group
        }

        // map nodes with the same degree 
        for (var i = 0; i < nodes1.length; i++) {
            nodeMapping.set(nodes1[i], nodes2[i]);
        }
    }

    return nodeMapping;//return one-to-one mapping based on degrees
}

// group nodes 
function groupNodes(nodes) {
    var edgesMap = new Map();//initialize a map to store the nodes
    for (var node of nodes) {
        var edges = node.neighbors.length;//the edges of current node
        if (!edgesMap.has(edges)) {//check if the current edge exists in map
            edgesMap.set(edges, []);//if not, create a list to store the edges 
        }
        edgesMap.get(edges).push(node);//add the node with edge
    }
    return edgesMap;
}

// check if edges match for nodes based on the mapping
function matchEdges(node1, node2, nodeMapping) {
    var neighbors1 = new Set(node1.neighbors.map(neighbor => nodeMapping.get(neighbor)));
    var neighbors2 = new Set(node2.neighbors);

    if (neighbors1.size !== neighbors2.size) {
        return false;
    }

    // check each neighbor in neighbors1 exists in neighbors2
    for (var neighbor of neighbors1) {
        if (!neighbors2.has(neighbor)) {
            return false;
        }
    }

    return true;
}