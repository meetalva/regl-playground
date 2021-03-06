---
displayName: Start
options:
  order: 0
---

# Documentation
We’re happy that you made the way to our docs. Here you can find [Guides](#guides) and [References](#references). 
All doc items state the recommended [skill level](#levels):woman_student:. 
  
## Guides

Instructions for common use cases that can be followed step by step. 
This is where you'll want to begin when exploring Alva and its features.
Most guides are written **for beginners**.

```widget
const React = require("react");
const {PatternList} = require("@patternplate/widgets");
module.exports = () => <PatternList query="is=doc AND tag=guide AND tag!=entry" />;
```

## Levels

:information_source: The levels are meant to help you decide how much time you'll need to follow a guide. If you are a beginner: Please tackle the "Expert" level guides! Ask your colleagues for help and [post an issue on GitHub](https://github.com/meetalva/alva/issues/new) if something is hard to understand in our docs. Thank you!

* Beginner
* Intermediate
* Expert

## References

Detailed technical documentation about various Alva features. References are written with **intermediate users** in mind. 

```widget
const React = require("react");
const {PatternList} = require("@patternplate/widgets");
module.exports = () => <PatternList query="is=doc AND tag=reference AND tag!=entry" />;
```
