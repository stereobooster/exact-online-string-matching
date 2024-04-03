---
title: Introduction
date: 0
abbreviation: ""
sidebar:
  order: -1
---

## Algorithms based on Comparison of Characters

In a computational model where the matching algorithm is restricted to read all the characters of the text one by one the optimal complexity is $O(n)$, and was achieved the first time by the well known [[Morris-Pratt]] algorithm [80]. However, in many practical cases it is possible to avoid reading all the characters of the text achieving sub-linear performances on the average.

The optimal average $O(\frac{n \log_{σ} m}{m})$ time complexity [99] was reached by many comparison based algorithms. However, all algorithms with a sub-linear average behavior may have to read all the text characters in the worst case. It is interesting to note that many of those algorithms have an even worse $O(nm)$-time
complexity in the worst-case [48,52].

In what follows we present the list of all string matching algorithms based on comparison of characters.
