import './App.css';
import React,{ Component } from 'react'
import { Map } from 'react-amap';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //eslint-disable-next-line 
    this.map = new window.AMap.Map('map', {
        center: [113.280637, 23.125178],
        resizeEnable: true,
        zoom: 7,
    })
    //eslint-disable-next-line 
    window.AMap.plugin('AMap.DistrictSearch', () => {
        //eslint-disable-next-line 
        let districtSearch = new window.AMap.DistrictSearch({
        // 关键字对应的行政区级别，共有5种级别
        level: 'country',
        //  是否显示下级行政区级数，1表示返回下一级行政区
        subdistrict: 0,
       // 返回行政区边界坐标点
        extensions: 'all',
      })

        // 搜索所有省/直辖市信息
        districtSearch.search(100000, (status, result) => {
          // 查询成功时，result即为对应的行政区信息
          this.handlePolygon(result);
        })
    })
  }

  handlePolygon(result) {
    let bounds = result.districtList[1].boundaries
    if (bounds) {
      for (let i = 0, l = bounds.length; i < l; i++) {
        //生成行政区划polygon
        //eslint-disable-next-line 
        let polygon = new window.AMap.Polygon({
          map: this.map,    // 指定地图对象
          strokeWeight: 2,    // 轮廓线宽度
          path: bounds[i],     //轮廓线的节点坐标数组
          fillOpacity: 0.15,     //透明度
          fillColor: '#256edc',     //填充颜色
          strokeColor: '#256edc',    //线条颜色
        })

        polygon.on('click', (e) => {
        // 点击绘制的区域时执行其他交互
            
        })
      }
      // 地图自适应
      this.map.setFitView()
     }
  }

  render() {
    return (
      <div className="container">
        <div id="map"></div>
      </div>
    )
  }
}
