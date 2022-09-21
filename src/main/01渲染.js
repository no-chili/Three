import {WebGL1Renderer,Scene,PerspectiveCamera,BoxGeometry,MeshBasicMaterial,Mesh} from 'three'

// 创建场景
const scene=new Scene()
// 创建相机
const camera=new PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
// 设置相机位置
camera.position.set(0,0,10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry=new BoxGeometry(1,1,1)
const cubeMaterial=new MeshBasicMaterial({color:0xffff00})
// 根据几何体和材质创建物体
const cube=new Mesh(cubeGeometry,cubeMaterial)
scene.add(cube)

// 初始化渲染器
const renderer=new WebGL1Renderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth,window.innerHeight)

// 将webgl渲染出来的canvas放到body上
document.body.append(renderer.domElement)


// 使用渲染器通过相机渲染场景
renderer.render(scene,camera)
