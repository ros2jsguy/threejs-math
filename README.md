# Stand-alone TypeScript version of three.js math

This module is a rewrite of the following [three.js math](https://threejs.org/docs/#api/en/math/Box2) classes in TypeScript:

* Box2
* Box3
* Color
* Cylindrical
* Euler
* Line3
* MathUtils
* Matrix (interface)
* Matrix3
* Matrix4
* Plane
* Quaternion
* Ray
* Sphere
* Spherical
* Triangle
* Vector (interface)
* Vector2
* Vector3
* Vector4

# API Documentation
The classes in TSDoc format are available [here](https://ros2jsguy.github.io/three.math/index.html).

# Changes
This module is a fork of [three-math-ts](https://github.com/chenhebing/three.math) with the following improvements:
* Reintroduced the Plane class and Plane related methods on classes such as Ray and Triangle.
* Removed deprecated api.
* [Tsdoc provided for all classes](https://ros2jsguy.github.io/three.math/index.html).
* Test suite with over 430 unit tests ported from three.js. 

# Future Plans
The decision to fork and extend the three.math repo was motivated by the
desire to improve the usability of these cool math classes and the
unresponsiveness of the repo owner to respond to an initial set of
improvement PRs. An objective of this module's author is to eventually
merge into three-math-ts should its author become active and open to
contributions.
