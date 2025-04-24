% Prolog Implementation with Timer
:- initialization(main).

binary_search(Array, X, Index) :-
    length(Array, Len),
    binary_search(Array, X, 0, Len - 1, Index).

binary_search(Array, X, Left, Right, Index) :-
    Left =< Right,
    Mid is Left + (Right - Left) // 2,
    nth0(Mid, Array, Value),
    (
        Value =:= X -> 
            Index = Mid
        ;
        Value < X ->
            NewLeft is Mid + 1,
            binary_search(Array, X, NewLeft, Right, Index)
        ;
            NewRight is Mid - 1,
            binary_search(Array, X, Left, NewRight, Index)
    ).

binary_search(_, _, Left, Right, -1) :- Left > Right.

% Helper predicate to time executions
time_iterations(Goal, Iterations, Time) :-
    get_time(Start),
    time_iterations_helper(Goal, Iterations),
    get_time(End),
    Time is End - Start.

time_iterations_helper(_, 0) :- !.
time_iterations_helper(Goal, N) :-
    call(Goal),
    N1 is N - 1,
    time_iterations_helper(Goal, N1).

main :-
    Array = [2, 3, 4, 10, 40, 50, 70, 85, 90, 100],
    X = 40,
    
    % Define the goal to be timed
    Goal = binary_search(Array, X, _Result),
    
    % Set the number of iterations
    Iterations = 10000, % Prolog is slower, using fewer iterations
    
    % Measure the performance
    time_iterations(Goal, Iterations, Time),
    
    % Get the actual result (just once)
    binary_search(Array, X, Result),
    
    % Print results
    (
        Result =\= -1 ->
            format('Element ~w is present at index ~w~n', [X, Result])
        ;
            format('Element ~w is not present in array~n', [X])
    ),
    
    format('Binary search executed ~w times~n', [Iterations]),
    format('Total time: ~3f seconds~n', [Time]),
    AverageTimeMS is (Time * 1000) / Iterations,
    format('Average time per search: ~6f milliseconds~n', [AverageTimeMS]),
    
    halt.