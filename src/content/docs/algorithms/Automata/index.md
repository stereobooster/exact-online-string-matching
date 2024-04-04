---
title: Introduction
sidebar:
  order: -1
---

## Algorithms based on Automata

Also automata play a very important role in the design of efficient string matching algorithms. For instance, the [[Deterministic-Finite-Automaton|Deterministic Finite Automaton Matcher]] [31] was one of the first linear-time solutions, whereas the [[Backward-DAWG-Matching]] algorithm [35] reached the optimal $O(\frac{n \log_{σ} m}{m})$ lower bound time complexity on the average. Both of them are based on finite automata; in particular, they respectively simulate a deterministic automaton for the language $Σ^∗p$ and the deterministic suffix automaton of the reverse of $p$.

The efficiency of string matching algorithms depends on the underlying automaton used for recognizing the pattern $p$ and on the encoding used for simulating it.
