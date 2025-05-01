## NOTES
---
- We need a renderer,camera,scene obj to work with THREE.JS
- [documentation](https://threejs.org/docs/)
---
## CAMERA
- THREE.PerspectiveCamera(fov, aspect, near, far);
    - `fov` is called *field of view* whihc is measured in degree
    - `aspect` is the aspect ratio **w/h**
    - `near`,`far` they tell abt the clipping plane,beyond this point camera will not be rendered.
- `position.z` when positive value moves away from the screen=>*out of the screen*
---
## init_structure
##### html file
```html []
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THREE</title>
    <style>
        body{
            margin: 0px;
        }
    </style>
</head>
<body>
    <script type="importmap">
        {
          "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/"
          }
        }
      </script>
    <script type="module" src="script.js"> </script>
</body>
</html>
```
##### script file
```js []
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```
---
#### OVERVIEW
- `Geometry` defines the shape,skeleton
  - It is a collection of points or faces
- `Material` describes how surface if the geometry looks like,colour,texture,reflectivity.
  - Diff material interact with light differently
  - It is like skin or paint on that object
- Mesh= geometry+material
---