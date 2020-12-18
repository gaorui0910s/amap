import './App.css';
import React,{ Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let disCountry = new window.AMap.DistrictLayer.Country({
        zIndex:10,
        SOC:'CHN',
        depth:2,
        styles:{
            'nation-stroke':'#transparent',
            'coastline-stroke':[0.85, 0.63, 0.94, 0],
            'province-stroke':'red',
            'city-stroke': 'rgba(255,255,255,0)',//中国特有字段
        }
    })
    //eslint-disable-next-line 
    this.map = new window.AMap.Map('map', {
        center: [104.29885, 31.957237],
        resizeEnable: true,
        zoom: 4,
        layers: [
          disCountry
        ]
    })

    //eslint-disable-next-line 
    let districtSearch = new window.AMap.DistrictSearch({
      // 关键字对应的行政区级别，共有5种级别
      level: 'country',
      //  是否显示下级行政区级数，1表示返回下一级行政区
      subdistrict: 0,
     // 返回行政区边界坐标点
      extensions: 'all',
    });

    // 搜索所有省/直辖市信息
    districtSearch.search('中国', (status, result) => {
      // 查询成功时，result即为对应的行政区信息
      this.handlePolygon(result);
    })
  }

  handlePolygon(result) {
    let bounds = result.districtList[0].boundaries
    // let newBounds = [];
    // bounds.map((v, k) => {
    //   let newItem;

    //   newItem = v.filter((element, index, array) => {
    //     return index % 2 === 0;
    //   })

    //   newBounds.push(newItem);
    // })

    let outer = [
        new window.AMap.LngLat(-360,90,true),
        new window.AMap.LngLat(-360,-90,true),
        new window.AMap.LngLat(360,-90,true),
        new window.AMap.LngLat(360,90,true),
    ];

    let pathArray = [
        outer
    ];

    pathArray.push.apply(pathArray, bounds);

    if (pathArray) {
      //eslint-disable-next-line 
      new window.AMap.Polygon({
        map: this.map,    // 指定地图对象
        strokeWeight: 2,    // 轮廓线宽度
        path: pathArray,     //轮廓线的节点坐标数组
        fillOpacity: 0.15,     //透明度
        fillColor: '#256edc',     //填充颜色
        strokeColor: '#256edc',    //线条颜色
      })
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
