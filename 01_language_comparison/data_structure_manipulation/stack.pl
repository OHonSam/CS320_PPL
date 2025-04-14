% Push: Add to front
push(Element, Stack, [Element|Stack]).

% Pop: Remove from front
pop([Top|Rest], Top, Rest).

% Peek: Just read the head
peek([Top|_], Top).

% Example usage:
% ?- push(3, [2,1], S).        => S = [3,2,1].
% ?- pop([3,2,1], X, S2).      => X = 3, S2 = [2,1].
% ?- peek([3,2,1], Top).       => Top = 3.
