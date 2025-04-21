% push(+Stack, +Element, -NewStack)
push(Stack, Elem, [Elem|Stack]).

% pop(+Stack, -Element, -NewStack)
pop([H|T], H, T).

% peek(+Stack, -TopElement)
peek([H|_], H).

% Example usage:
% ?- push([], 1, S1), push(S1, 2, S2), peek(S2, Top), pop(S2, Popped, S3).
