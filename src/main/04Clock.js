import {WebGL1Renderer,Scene,PerspectiveCamera,BoxGeometry,MeshBasicMaterial,Mesh,AxesHelper,Clock} from 'three'

// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

// 物体移动
// cube.position.x=5
// 物体缩放
// cube.scale.set(3,2,1)
// 物体旋转
// cube.rotation.set(Math.PI/4,0,0)

scene.add(cube)

// 初始化渲染器
const renderer=new WebGL1Renderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth,window.innerHeight)

// 将webgl渲染出来的canvas放到body上
document.body.append(renderer.domElement)


// 使用渲染器通过相机渲染场景
// renderer.render(scene,camera)


// 创建轨道控制器
const controls=new OrbitControls(camera,renderer.domElement)

//添加坐标辅助器
const helper=new AxesHelper(5)
scene.add(helper)

const clock=new Clock()

function render(){
  // 获取总时长
  let time=clock.getElapsedTime()
  // 获取间隔时常
  // clock.getDelta()
  // 物体移动
  cube.position.x=time*1%5
  renderer.render(scene,camera)
  //渲染下一帧自动执行渲染函数
  requestAnimationFrame(render)
}

render()
