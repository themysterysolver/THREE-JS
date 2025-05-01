## NOTES
- We need a renderer,camera,scene obj to work with THREE.JS
- [documentation](https://threejs.org/docs/)

## CAMERA
- THREE.PerspectiveCamera(fov, aspect, near, far);
    - `fov` is called *field of view* whihc is measured in degree
    - `aspect` is the aspect ratio **w/h**
    - `near`,`far` they tell abt the clipping plane,beyond this point camera will not be rendered.
- `position.z` when positive value moves away from the screen=>*out of the screen*