% Define directed edges in the graph
edge(0, 1).
edge(0, 2).
edge(1, 2).
edge(2, 0).
edge(2, 3).
edge(3, 3).

% Check if there's a path from X to Y with visited nodes list to detect cycles
path(X, Y, Visited) :- 
    edge(X, Z),
    Z \= Y,
    \+ member(Z, Visited),
    path(Z, Y, [Z|Visited]).
path(X, Y, _) :- 
    edge(X, Y).

% Check if there's a cycle starting from Node
has_cycle(Node) :-
    edge(Node, Next),
    path(Next, Node, [Next]).

% Check if the graph has any cycle
graph_has_cycle :-
    has_cycle(_),
    write('Graph contains cycle'), nl.
graph_has_cycle :-
    \+ has_cycle(_),
    write('Graph doesn\'t contain cycle'), nl.

% Main execution with timing in nanoseconds (approximate via get_time)
:- 
    get_time(Start),
    graph_has_cycle,
    get_time(End),
    DurationNs is round((End - Start) * 1_000_000_000),
    format('Execution time: ~w ns~n', [DurationNs]).
