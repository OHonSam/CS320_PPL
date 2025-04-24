% Checks if a number N is prime
is_prime(N) :-
    N > 1,
    \+ has_divisor(N, 2).

% Succeeds if N has a divisor D such that D*D <= N
has_divisor(N, D) :-
    D * D =< N,
    (N mod D =:= 0 ; D1 is D + 1, has_divisor(N, D1)).
