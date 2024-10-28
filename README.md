# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

To test if two graphs are isomorphic, they must have the same number of edges, vertices and the same edges connectivity.

For this implementation:

1. It first check if the number of vertices and edges match between the two graphs, the time complexity is $O(1)$; 

2. To test the connectivity, it first call the function matchNodes to create a node map, in function matchNodes, it calls the groupNodes function to group nodes by edges/degrees, which takes $O(V)$; then, a nested loop is used to map the node, which takes up to $O(V^2)$ time complexity

3. After constructed the node map, the edgesMatch function is called to compare neighbors for node1 and node2 based on the map, which takes $O(V)$

To sum up, the overall time complexity is $O(1)+O(V^2)+O(V)\in\Theta(V^2)$

“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.” --Doris Yan