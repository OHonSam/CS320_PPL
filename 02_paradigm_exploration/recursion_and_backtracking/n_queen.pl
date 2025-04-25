% This implementation gives wrong answer.
% :- initialization(main).

% % Check if queen can be placed safely
% safe([], _, _).
% safe([Col|RestCols], Queen, Distance) :-
%     Queen =\= Col,
%     Queen =\= Col + Distance,
%     Queen =\= Col - Distance,
%     NewDistance is Distance + 1,
%     safe(RestCols, Queen, NewDistance).

% % Solve N-Queens problem
% solve_n_queens(N, Queens) :-
%     length(Queens, N),
%     board_values(Queens, N),
%     solve_queens(Queens, 1).

% % Define possible values for the board
% board_values([], _).
% board_values([X|Xs], N) :-
%     between(1, N, X),
%     board_values(Xs, N).

% % Place queens on the board
% solve_queens([], _).
% solve_queens([Queen|RestQueens], Distance) :-
%     safe(RestQueens, Queen, Distance),
%     solve_queens(RestQueens, Distance + 1).

% % Print the chessboard with queens placed
% print_board(Queens) :-
%     length(Queens, N),
%     print_rows(Queens, 1, N).

% print_rows(_, Row, N) :- Row > N, nl, !.
% print_rows(Queens, Row, N) :-
%     print_row(Queens, Row, 1, N),
%     nl,
%     NextRow is Row + 1,
%     print_rows(Queens, NextRow, N).

% print_row(_, _, Col, N) :- Col > N, !.
% print_row(Queens, Row, Col, N) :-
%     nth1(Col, Queens, Row) -> write('Q '); write('. '),
%     NextCol is Col + 1,
%     print_row(Queens, Row, NextCol, N).

% % Count solutions
% count_solutions(N, Count) :-
%     findall(Queens, solve_n_queens(N, Queens), Solutions),
%     length(Solutions, Count).

% % Main program
% main :-
%     N = 8, % Default value, can be changed
    
%     % Get current time
%     get_time(Start),
    
%     % Find all solutions
%     findall(Queens, solve_n_queens(N, Queens), Solutions),
%     length(Solutions, Count),
    
%     % Calculate time taken
%     get_time(End),
%     TimeTaken is End - Start,
    
%     % Print results
%     format('Found ~w solutions for ~w-Queens problem~n', [Count, N]),
%     format('Time taken: ~6f seconds~n~n', [TimeTaken]),
    
%     % Print first solution if exists
%     (Solutions = [FirstSolution|_] ->
%         write('First solution:'), nl,
%         print_board(FirstSolution)
%     ;
%         true
%     ),
    
%     halt.

:- initialization(main).

% N-Queens solution
% Queens is a list where each position represents a row and the value represents the column
% For example, [1,3,5,2,4] means queens are at positions (1,1), (2,3), (3,5), (4,2), (5,4)

% Check if placement is safe: no queens attack each other
safe_queens([]).
safe_queens([Queen|Rest]) :- 
    safe_queens(Rest),
    no_attack(Queen, Rest, 1).

% Check if a queen doesn't attack any other queen
no_attack(_, [], _).
no_attack(Queen, [OtherQueen|Rest], Dist) :-
    Queen =\= OtherQueen,             % Not in same column
    Queen =\= OtherQueen + Dist,      % Not in same diagonal \
    Queen =\= OtherQueen - Dist,      % Not in same diagonal /
    Dist1 is Dist + 1,
    no_attack(Queen, Rest, Dist1).

% Generate a list of positions for N queens
queens(N, Queens) :-
    length(Queens, N),                % Create a list of N variables
    board_values(Queens, N),          % Each queen must be in a column 1..N
    safe_queens(Queens).              % Queens must not attack each other

% Set domain for board positions
board_values([], _).
board_values([X|Xs], N) :-
    between(1, N, X),                 % X is between 1 and N
    board_values(Xs, N).

% Print the chessboard with queens placed
print_board(Queens) :-
    length(Queens, N),
    print_board(Queens, 1, N).

print_board(_, Row, N) :- Row > N, !.
print_board(Queens, Row, N) :-
    print_row(Queens, Row, 1, N),
    nl,
    NextRow is Row + 1,
    print_board(Queens, NextRow, N).

print_row(_, _, Col, N) :- Col > N, !.
print_row(Queens, Row, Col, N) :-
    nth1(Row, Queens, QCol),
    (QCol =:= Col -> write('Q '); write('. ')),
    NextCol is Col + 1,
    print_row(Queens, Row, NextCol, N).

% Main program
main :-
    N = 8,  % Size of the board (can be changed)
    
    % Get current time
    get_time(Start),
    
    % Find all solutions
    findall(Queens, queens(N, Queens), Solutions),
    length(Solutions, Count),
    
    % Calculate time taken
    get_time(End),
    TimeTaken is End - Start,
    
    % Print results
    format('Found ~w solutions for ~w-Queens problem~n', [Count, N]),
    format('Time taken: ~6f seconds~n~n', [TimeTaken]),
    
    % Print first solution if exists
    (Solutions = [FirstSolution|_] ->
        write('First solution:'), nl,
        print_board(FirstSolution)
    ;
        write('No solutions found.'), nl
    ),
    
    halt.