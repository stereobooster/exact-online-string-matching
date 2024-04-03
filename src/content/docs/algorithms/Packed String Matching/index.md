---
title: Introduction
date: 0
abbreviation: ""
sidebar:
  order: -1
category: Packed String Matching
---

## Algorithms based on Packed String Matching

In the packed string matching technique multiple characters are packed into one larger word, so that the characters can be compared in bulk rather than individually. In this context, if the characters of a string are drawn from an alphabet of size $σ$, then $\lfloor \frac{w}{\log σ} \rfloor$ different characters fit in a single word, using $\lceil \log σ \rceil$ bits per characters. The packing factor is $α = \lfloor \frac{w}{\log σ} \rfloor$
