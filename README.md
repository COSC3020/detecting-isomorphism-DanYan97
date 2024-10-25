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

For this implementation, it first check if the number of vertices and edges are eaqual, which takes $O(1)$ time complaxity; it then create a talbe for graph2 that store the id for each vertex, which could aviod the repeated search work in the furture, the time complexty is $O(V)$ becuase it need process each vertex; in the main for loop, it need process each vertex, so the time complexity is $O(V)$, it first check if the corresponding vertex in graph 2 exist for the current vertex in graph1, which takes $O(1)$ time complaxity; create two new sets for neighbors comparsion takes $O(1)$, the neighbor comparsion call the helper function, and the helper function takes $O(V)$, beucase it iterates each element in set. So the main for loop takes overall $O(V^2)$ time complaxity.

Combine them together, the time complexity of the worst-case is $O(V)+O(V^2)\in \Theta(V^2)$