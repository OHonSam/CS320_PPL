% Define items as: item(ID, Weight, Value).
item(0, 10, 60).
item(1, 20, 100).
item(2, 30, 120).

% Capacity of the knapsack
capacity(50).

% knapsack(RemainingItems, RemainingCapacity, CurrentValue, CurrentItems, BestValue, BestItems)
% RemainingItems: List of items we haven't decided on yet
% RemainingCapacity: Remaining capacity in knapsack
% CurrentValue: Value of items selected so far
% CurrentItems: IDs of items selected so far
% BestValue: Best value found so far (output)
% BestItems: Items corresponding to best value (output)

% Base case: no more items to consider
knapsack([], _, Value, Items, Value, Items).

% Case 1: Current item can fit, decide whether to include it
knapsack([ItemID|Rest], Capacity, CurrentValue, CurrentItems, BestValue, BestItems) :-
    item(ItemID, Weight, Value),
    Weight =< Capacity, !,
    % Try including the item
    NewCapacity1 is Capacity - Weight,
    NewValue1 is CurrentValue + Value,
    knapsack(Rest, NewCapacity1, NewValue1, [ItemID|CurrentItems], BestValue1, BestItems1),
    
    % Try excluding the item
    knapsack(Rest, Capacity, CurrentValue, CurrentItems, BestValue2, BestItems2),
    
    % Compare results and choose the best
    (BestValue1 >= BestValue2 -> 
        BestValue = BestValue1, BestItems = BestItems1
    ;   
        BestValue = BestValue2, BestItems = BestItems2
    ).

% Case 2: Current item cannot fit, skip it
knapsack([_|Rest], Capacity, CurrentValue, CurrentItems, BestValue, BestItems) :-
    knapsack(Rest, Capacity, CurrentValue, CurrentItems, BestValue, BestItems).

% Solve the knapsack problem
solve_knapsack(MaxValue, SelectedItems) :-
    findall(ID, item(ID, _, _), AllItems),
    capacity(Capacity),
    knapsack(AllItems, Capacity, 0, [], MaxValue, SelectedItemsReversed),
    reverse(SelectedItemsReversed, SelectedItems).

% Main execution with timing
:- 
    get_time(Start),
    solve_knapsack(MaxValue, SelectedItems),
    format('Maximum value: ~w~n', [MaxValue]),
    format('Selected items: ~w~n', [SelectedItems]),
    get_time(End),
    DurationNs is round((End - Start) * 1_000_000_000),
    format('Execution time: ~w ns~n', [DurationNs]).