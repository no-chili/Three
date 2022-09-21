import {WebGL1Renderer,Scene,PerspectiveCamera,BoxGeometry,MeshBasicMaterial,Mesh,AxesHelper,Clock} from 'three'
// 导入动画库
import gsap from 'gsap'
// 导入gui
import * as dat from 'dat.gui'

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


const gui=new dat.GUI()
gui.add(cube.position,"x").min(0).max(5).step(0.01).name('cubeX')
const params={
  color:'#ffff00',
  fn:()=>{
    gsap.to(cube.position,{x:5,duration:2,yoyo:true,repeat:-1})
  }
}
gui.addColor(params,'color').onChange((value)=>{
  console.log('color:',value);
  cube.material.color.set(value)
})
//设置选项框
gui.add(cube,'visible').name('是否显示立方体')
// 设置文件夹
const folder=gui.addFolder('设置立方体')
folder.add(cube.material,'wireframe')
folder.add(params,'fn').name("立方体运动")

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
// 设置控制器阻尼，让控制器更真实,必须在动画渲染里update
controls.enableDamping=true

//添加坐标辅助器
const helper=new AxesHelper(5)
scene.add(helper)

// 双击全屏
window.addEventListener("dblclick",()=>{
  // 判断是否有元素全屏
  const fullScreenElement=document.fullscreenElement
  if(fullScreenElement){
    document.exitFullscreen()
  }else{
    // 请求全屏 
    renderer.domElement.requestFullscreen()
  }
})

function render(){

  controls.update()

  renderer.render(scene,camera)
  //渲染下一帧自动执行渲染函数
  requestAnimationFrame(render)
}

render()


// 监听页面变化，显示渲染画面
window.addEventListener('resize',()=>{
  // 更新摄像头
  camera.aspect=window.innerWidth/window.innerHeight
  // 更新摄像头投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth,window.innerHeight)
  // 更新渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
