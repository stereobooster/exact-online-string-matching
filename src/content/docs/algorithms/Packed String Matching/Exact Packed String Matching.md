---
title: Exact Packed String Matching
date: 2013
abbreviation: EPSM
sidebar:
  order: 124
tags:
  - packed-string-matching
---

Improvement of [[Streaming SIMD Extensions Filter]]. It uses SSE instruction to speed up searching. It consists in four different algorithms depending on the length of the pattern.

Appeared in:

- [44]: Faro, S., Külekci, M.O.: Fast packed string matching for short patterns. In: Sanders, P., Zeh, N. (eds.) Proceedings of the 15th Meeting on Algorithm Engineering and Experiments, ALENEX 2013, New Orleans, Louisiana, USA, January 7, 2013. pp. 113–121. SIAM (2013), http://dx.doi.org/10.1137/1.9781611972931.10
- [45]: Faro, S., K¨ulekci, M.O.: Fast and flexible packed string matching. J. Discrete Algorithms 28, 61–72 (2014), http://dx.doi.org/10.1016/j.jda.2014.07.003
