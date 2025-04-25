% Checks if a number N is prime
is_prime(N) :-
    N > 2,
    \+ has_divisor(2, N).

% Succeeds if N has a divisor D such that D*D <= N
has_divisor(N, D) :-
    D < N,
    (N mod D =:= 0 ; D1 is D + D, has_divisor(N, D1)).
