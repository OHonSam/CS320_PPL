% Helper to check divisibility
has_factor(N, F) :-
    N mod F =:= 0.

has_factor(N, F) :-
    F * F =< N,
    F2 is F + 1,
    has_factor(N, F2).

% Main prime predicate
is_prime(2).
is_prime(3).
is_prime(N) :-
    N > 3,
    N mod 2 =\= 0,
    \+ has_factor(N, 3).

% Example Query:
% ?- is_prime(17).
% true.
