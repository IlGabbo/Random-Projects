let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
let mixer = null
let renderer = new THREE.WebGLRenderer()
let loader = new THREE.GLTFLoader()
let clock = new THREE.Clock()
let model_path = "../../models/corridor/untitled.glb", obj

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


loader.load(model_path, function(gltf) {
    console.log(gltf.animations)
    obj = gltf.scene
    // camera = gltf.cameras[0]
    let clip = THREE.AnimationClip.findByName(gltf.animations, "CameraAction")
    mixer = new THREE.AnimationMixer(camera)
    const action = mixer.clipAction(clip)
    action.play()

    /* let box = new THREE.Box3().setFromObject(obj)
    let center = box.getCenter(new THREE.Vector3())
    gltf.scene.position.x += ( gltf.scene.position.x - center.x );
    gltf.scene.position.y += ( gltf.scene.position.y - center.y );
    gltf.scene.position.z += ( gltf.scene.position.z - center.z ); */

    scene.add(gltf.scene)
}, undefined, function(error) {
    console.error(error)
}) 

scene.background = new THREE.Color(0x000000)
let light = new THREE.HemisphereLight(0xffffff, 0x000000, 2)
scene.add(light)
//camera.position.set(-5,-2,-15)

let animate = function() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    //obj.rotation.y = 9.42
    //obj.rotation.x = 0.01
}

animate()
