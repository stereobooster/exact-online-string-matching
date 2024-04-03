---
title: Introduction
date: 0
abbreviation: ""
sidebar:
  order: -1
category: Bit Parallelism
---

## Algorithms based on Bit Parallelism

Bit-parallelism [8,9] is a technique used for simulating nondeterministic automata. Specifically the bit-parallelism technique takes advantage of the intrinsic parallelism of the bitwise operations inside a computer word, allowing to cut down the number of operations that an algorithm performs by a factor up to $w$,
where $w$ is the number of bits in the computer word. However the correspondent encoding requires one bit per pattern symbol, for a total of $m/w$ computer words. Thus, as long as a pattern fits in a computer word, bit-parallel algorithms are extremely fast, otherwise their performances degrades considerably as $m/w$
grows.
