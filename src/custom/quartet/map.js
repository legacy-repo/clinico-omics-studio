import world from '@/custom/quartet/map/world.json'
import china from '@/custom/quartet/map/china.json'
import asia from '@/custom/quartet/map/asia.json'
import shanghai from '@/custom/quartet/map/shanghai.json'
import map from 'lodash.map'

export const metadata = [
  {
    date: '20160621',
    latitude: 31.1109237555,
    longitude: 121.3849986165,
    position: '莘庄',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1210126,
    longitude: 121.3929642,
    position: '外环路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1309716,
    longitude: 121.4027682,
    position: '莲花路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1419686,
    longitude: 121.4138212,
    position: '锦江乐园',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1545316,
    longitude: 121.4299962,
    position: '上海南站',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1682416,
    longitude: 121.4348402,
    position: '漕宝路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1817637408,
    longitude: 121.4362728596,
    position: '上海体育馆',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1939432665,
    longitude: 121.4388263226,
    position: '徐家汇',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2045786,
    longitude: 121.4463202,
    position: '衡山路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2132625422,
    longitude: 121.4509257674,
    position: '常熟路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2173112668,
    longitude: 121.4601874352,
    position: '陕西南路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2227336,
    longitude: 121.4731552,
    position: '黄陂南路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2327156,
    longitude: 121.4756182,
    position: '人民广场',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2384236,
    longitude: 121.4679042,
    position: '新闸路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2416246,
    longitude: 121.4581842,
    position: '汉中路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2495870467,
    longitude: 121.4583152533,
    position: '上海火车站',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2587646,
    longitude: 121.4590832,
    position: '中山北路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2716296,
    longitude: 121.4552242,
    position: '延长路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2799386,
    longitude: 121.4518802,
    position: '上海马戏城',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2925976,
    longitude: 121.4501032,
    position: '汶水路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3066086,
    longitude: 121.4485052,
    position: '彭浦新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3189626,
    longitude: 121.4469592,
    position: '共康路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3311346,
    longitude: 121.4414012,
    position: '通河新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3398856,
    longitude: 121.4375702,
    position: '呼兰路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3551846,
    longitude: 121.4339772,
    position: '共富新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3695706,
    longitude: 121.4308442,
    position: '宝安公路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3809886,
    longitude: 121.4279082,
    position: '友谊西路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3922546,
    longitude: 121.4245232,
    position: '富 锦 路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_L01_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1504666,
    longitude: 121.8057162,
    position: '浦东国际机场',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1683606,
    longitude: 121.7969142,
    position: '海天三路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1994486,
    longitude: 121.7552372,
    position: '远东大道',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1926596,
    longitude: 121.7226802,
    position: '凌空路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1867506,
    longitude: 121.6980992,
    position: '川沙',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1965786,
    longitude: 121.6809642,
    position: '华夏东路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2138626,
    longitude: 121.6735982,
    position: '创新中路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2133486,
    longitude: 121.6564282,
    position: '唐镇',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2110546,
    longitude: 121.6209592,
    position: '广兰路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2042246,
    longitude: 121.6019012,
    position: '金科路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2018346,
    longitude: 121.5875342,
    position: '张江高科',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2024956,
    longitude: 121.5575882,
    position: '龙阳路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2095516,
    longitude: 121.5507302,
    position: '世纪公园',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2173776,
    longitude: 121.5453244,
    position: '上海科技馆',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2333216,
    longitude: 121.5152762,
    position: '东昌路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2382033,
    longitude: 121.5021478,
    position: '陆家嘴',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.238073,
    longitude: 121.484641,
    position: '南京东路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2327156,
    longitude: 121.4756182,
    position: '人民广场',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2298656,
    longitude: 121.4598522,
    position: '南京西路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2232086,
    longitude: 121.4463182,
    position: '静安寺',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.219871164,
    longitude: 121.4325875044,
    position: '江苏路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.21849259,
    longitude: 121.4185139537,
    position: '中山公园',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2110919,
    longitude: 121.4039195,
    position: '娄山关路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2149536,
    longitude: 121.3867952,
    position: '威宁路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2166076,
    longitude: 121.3740642,
    position: '北新泾',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2182306,
    longitude: 121.3593362,
    position: '淞虹路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1942346,
    longitude: 121.326112,
    position: '虹桥2号航站楼',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1939546,
    longitude: 121.3214132,
    position: '虹桥火车站',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1882906,
    longitude: 121.2991902,
    position: '徐泾东',
    receiver: 'Line 2',
    sample_id: 'CN_SH_L02_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1545316,
    longitude: 121.4299962,
    position: '上海南站',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1579296,
    longitude: 121.4430602,
    position: '石龙路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1694656,
    longitude: 121.4442522,
    position: '龙漕路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1767406,
    longitude: 121.4382282,
    position: '漕溪路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1871256,
    longitude: 121.4270182,
    position: '宜山路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1974526,
    longitude: 121.4206362,
    position: '虹桥路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2095926,
    longitude: 121.4169292,
    position: '延安西路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2180106,
    longitude: 121.4155672,
    position: '中山公园',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2321396,
    longitude: 121.4130802,
    position: '金沙江路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2394146,
    longitude: 121.4177462,
    position: '曹杨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2465146,
    longitude: 121.4298652,
    position: '镇坪路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2545946,
    longitude: 121.4409792,
    position: '中潭路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2496946,
    longitude: 121.4580792,
    position: '上海火车站',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2515756,
    longitude: 121.4762312,
    position: '宝山路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2597876,
    longitude: 121.4801082,
    position: '东宝兴路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2706036,
    longitude: 121.4792772,
    position: '虹口足球场',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2812556,
    longitude: 121.4823532,
    position: '赤峰路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2895566,
    longitude: 121.4830872,
    position: '大柏树',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3055206,
    longitude: 121.4849412,
    position: '江湾镇',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3198636,
    longitude: 121.4848232,
    position: '殷高西路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3320546,
    longitude: 121.4914192,
    position: '长江南路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3451526,
    longitude: 121.5002792,
    position: '淞发路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3580266,
    longitude: 121.4985722,
    position: '张华浜',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3710866,
    longitude: 121.4926912,
    position: '淞滨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3814066,
    longitude: 121.4880402,
    position: '水产路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3953196,
    longitude: 121.4794462,
    position: '宝杨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.404014,
    longitude: 121.47595,
    position: '友谊路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.4081686,
    longitude: 121.4610822,
    position: '铁力路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.4078606,
    longitude: 121.4396862,
    position: '江杨北路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_L03_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1871256,
    longitude: 121.4270182,
    position: '宜山路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1827856,
    longitude: 121.4371402,
    position: '上海体育馆',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1854926,
    longitude: 121.4432532,
    position: '上海体育场',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1908196,
    longitude: 121.4547332,
    position: '东安路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1940086,
    longitude: 121.4631792,
    position: '大木桥路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1991996,
    longitude: 121.4748482,
    position: '鲁班路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2019676,
    longitude: 121.4894242,
    position: '西藏南路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2085986,
    longitude: 121.4994392,
    position: '南浦大桥',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2098026,
    longitude: 121.5184882,
    position: '塘桥',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.211854,
    longitude: 121.527734,
    position: '蓝村路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2223716,
    longitude: 121.5319152,
    position: '浦电路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2400176,
    longitude: 121.5192422,
    position: '浦东大道',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2519276,
    longitude: 121.5170792,
    position: '杨树浦路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2579426,
    longitude: 121.5129512,
    position: '大连路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2608716,
    longitude: 121.5005232,
    position: '临平路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2589583274,
    longitude: 121.4896059036,
    position: '海伦路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2515756,
    longitude: 121.4762312,
    position: '宝山路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2496946,
    longitude: 121.4580792,
    position: '上海火车站',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2545946,
    longitude: 121.4409792,
    position: '中潭路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2465146,
    longitude: 121.4298652,
    position: '镇坪路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2394146,
    longitude: 121.4177462,
    position: '曹杨路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2321396,
    longitude: 121.4130802,
    position: '金沙江路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2180106,
    longitude: 121.4155672,
    position: '中山公园',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2095926,
    longitude: 121.4169292,
    position: '延安西路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1974526,
    longitude: 121.4206362,
    position: '虹桥路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_L04_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1210126,
    longitude: 121.3929642,
    position: '莘庄',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0982096,
    longitude: 121.3856462,
    position: '春申路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0893256,
    longitude: 121.3902192,
    position: '银都路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0669916,
    longitude: 121.4017412,
    position: '颛桥',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0450716,
    longitude: 121.4099512,
    position: '北桥',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0264286,
    longitude: 121.4164412,
    position: '剑川路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0182266,
    longitude: 121.4197232,
    position: '东川路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0112316,
    longitude: 121.4100292,
    position: '金平路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0073836,
    longitude: 121.3951182,
    position: '华宁路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0035646,
    longitude: 121.3806682,
    position: '文井路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0005526,
    longitude: 121.3696392,
    position: '闵行开发区',
    receiver: 'Line 5',
    sample_id: 'CN_SH_L05_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3530196,
    longitude: 121.5747032,
    position: '港城路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3478446,
    longitude: 121.5867772,
    position: '外高桥保税区北',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3354456,
    longitude: 121.5938442,
    position: '航津路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3216076,
    longitude: 121.6018562,
    position: '外高桥保税区南',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3123216,
    longitude: 121.5892702,
    position: '洲海路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3025936,
    longitude: 121.5891772,
    position: '五洲大道',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2906726,
    longitude: 121.5887102,
    position: '东靖路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2806846,
    longitude: 121.5883112,
    position: '巨峰路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2720776,
    longitude: 121.5878192,
    position: '五莲路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2635056,
    longitude: 121.5865522,
    position: '博兴路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2571856,
    longitude: 121.5817632,
    position: '金桥路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2503936,
    longitude: 121.5725962,
    position: '云山路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2453952,
    longitude: 121.5640942,
    position: '德平路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2391256,
    longitude: 121.5521232,
    position: '北洋泾路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2358546,
    longitude: 121.5433882,
    position: '民生路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2330086,
    longitude: 121.5345062,
    position: '源深体育中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2201566,
    longitude: 121.5289672,
    position: '浦电路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2118633,
    longitude: 121.5279301,
    position: '蓝村路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2032936,
    longitude: 121.5233542,
    position: '上海儿童医学中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1931886,
    longitude: 121.5165282,
    position: '临沂新村',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1857496,
    longitude: 121.5096562,
    position: '高科西路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1726506,
    longitude: 121.5107312,
    position: '东明路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1600926,
    longitude: 121.5155422,
    position: '高青路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1498746,
    longitude: 121.5143782,
    position: '华夏西路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1491376,
    longitude: 121.5061452,
    position: '上南路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1487676,
    longitude: 121.4951792,
    position: '灵岩南路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_L06_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2112166,
    longitude: 121.5626172,
    position: '花木路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2030424693,
    longitude: 121.5574282408,
    position: '龙阳路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1931646,
    longitude: 121.5499622,
    position: '芳华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1875966,
    longitude: 121.5399042,
    position: '锦绣路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1875776,
    longitude: 121.5249692,
    position: '杨高南路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1857496,
    longitude: 121.5096562,
    position: '高科西路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1821326,
    longitude: 121.5002382,
    position: '云台路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1785176,
    longitude: 121.4944752,
    position: '耀华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1732211,
    longitude: 121.4834805,
    position: '长清路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1718876,
    longitude: 121.4737992,
    position: '后滩',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1849706,
    longitude: 121.4570012,
    position: '龙华中路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1908196,
    longitude: 121.4547332,
    position: '东安路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1994986,
    longitude: 121.4502012,
    position: '肇嘉浜路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2135286,
    longitude: 121.4490042,
    position: '常熟路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2232613156,
    longitude: 121.4484661818,
    position: '静安寺',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2338851,
    longitude: 121.4423902,
    position: '昌平路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.239912121,
    longitude: 121.4381048083,
    position: '长寿路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2464523784,
    longitude: 121.4319384098,
    position: '镇坪路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2562266,
    longitude: 121.4216562,
    position: '岚皋路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2639566,
    longitude: 121.4225452,
    position: '新村路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2738746,
    longitude: 121.4229092,
    position: '大华三路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2849466,
    longitude: 121.4213562,
    position: '行知路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2933246,
    longitude: 121.4164112,
    position: '大场镇',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3038686,
    longitude: 121.4135572,
    position: '场中路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3149676,
    longitude: 121.4084642,
    position: '上大路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3214406,
    longitude: 121.3985872,
    position: '南陈路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3205776,
    longitude: 121.3886752,
    position: '上海大学',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3223196,
    longitude: 121.3734322,
    position: '祁华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3448136,
    longitude: 121.3726262,
    position: '顾村公园',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3575726,
    longitude: 121.3622652,
    position: '刘行',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3641836,
    longitude: 121.3557002,
    position: '潘广路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_31',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3887376,
    longitude: 121.3573142,
    position: '罗南新村',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_32',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.4017256,
    longitude: 121.3499852,
    position: '美兰湖',
    receiver: 'Line 7',
    sample_id: 'CN_SH_L07_33',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0614136,
    longitude: 121.5120912,
    position: '沈杜公路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0734216,
    longitude: 121.5104532,
    position: '联航路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0840266,
    longitude: 121.5084952,
    position: '江月路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0962496,
    longitude: 121.5062512,
    position: '浦江镇',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1190786,
    longitude: 121.4976762,
    position: '芦恒路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1413616,
    longitude: 121.4895062,
    position: '凌兆新村',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1610716,
    longitude: 121.4933262,
    position: '杨思',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1706926,
    longitude: 121.4960992,
    position: '成山路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1785176,
    longitude: 121.4944752,
    position: '耀华路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1854156,
    longitude: 121.4934882,
    position: '中华艺术宫',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2019676,
    longitude: 121.4894242,
    position: '西藏南路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2117731,
    longitude: 121.4859712,
    position: '陆家浜路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2188756,
    longitude: 121.4828022,
    position: '老西门',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2271866,
    longitude: 121.4791785,
    position: '大世界',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2332698,
    longitude: 121.4747606,
    position: '人民广场',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2423116,
    longitude: 121.4714062,
    position: '曲阜路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2532326,
    longitude: 121.4688892,
    position: '中兴路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2635276,
    longitude: 121.4686462,
    position: '西藏北路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2698899303,
    longitude: 121.4794135094,
    position: '虹口足球场',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2765246,
    longitude: 121.4905732,
    position: '曲阳路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2748836,
    longitude: 121.5013442,
    position: '四平路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2732526,
    longitude: 121.5095932,
    position: '鞍山新村',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2749636,
    longitude: 121.5183102,
    position: '江浦路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2787926,
    longitude: 121.5282262,
    position: '黄兴路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2885966,
    longitude: 121.5348032,
    position: '延吉中路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2958356,
    longitude: 121.5330042,
    position: '黄兴公园',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3050066,
    longitude: 121.5318372,
    position: '翔殷路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3147936,
    longitude: 121.5318152,
    position: '嫩江路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3227616,
    longitude: 121.5317972,
    position: '市光路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_L08_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2275316,
    longitude: 121.5485772,
    position: '杨高中路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2303046,
    longitude: 121.5160772,
    position: '商城路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2168676,
    longitude: 121.4982602,
    position: '小南门',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2117731,
    longitude: 121.4859712,
    position: '陆家浜路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2095246,
    longitude: 121.4771192,
    position: '马当路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2063176,
    longitude: 121.4685522,
    position: '打浦桥',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2028596,
    longitude: 121.4607192,
    position: '嘉善路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1994986,
    longitude: 121.4502012,
    position: '肇嘉浜路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1946326,
    longitude: 121.4359982,
    position: '徐家汇',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1871256,
    longitude: 121.4270182,
    position: '宜山路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1747656,
    longitude: 121.4179322,
    position: '桂林路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1706296,
    longitude: 121.3976732,
    position: '漕河泾开发区',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1665496,
    longitude: 121.3846452,
    position: '合川路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1581526,
    longitude: 121.3689132,
    position: '星中路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1552966,
    longitude: 121.3490932,
    position: '七宝',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1496426,
    longitude: 121.3380462,
    position: '中春路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1377366,
    longitude: 121.3191532,
    position: '九亭',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1183236,
    longitude: 121.2603132,
    position: '泗泾',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1044716,
    longitude: 121.2295842,
    position: '佘山',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0844936,
    longitude: 121.2303362,
    position: '洞泾',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0540936,
    longitude: 121.2324802,
    position: '松江大学城',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0303146,
    longitude: 121.2306022,
    position: '松江新城',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0155706,
    longitude: 121.2303512,
    position: '松江体育中心',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0015336,
    longitude: 121.2292142,
    position: '醉白池',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 30.9852276,
    longitude: 121.2309302,
    position: '松江南站',
    receiver: 'Line 9',
    sample_id: 'CN_SH_L09_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3285926,
    longitude: 121.5066292,
    position: '新江湾城站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3217816,
    longitude: 121.5066782,
    position: '殷高东路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3131696,
    longitude: 121.5081562,
    position: '三门路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3028656,
    longitude: 121.5140812,
    position: '江湾体育场站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2980676,
    longitude: 121.5145112,
    position: '五角场站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2893076,
    longitude: 121.5099022,
    position: '国权路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2821866,
    longitude: 121.5061732,
    position: '同济大学站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2748836,
    longitude: 121.5013442,
    position: '四平路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2687086,
    longitude: 121.4944242,
    position: '邮电新村站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2592771,
    longitude: 121.4885382,
    position: '海伦路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2520806,
    longitude: 121.4842152,
    position: '四川北路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2439126,
    longitude: 121.4823122,
    position: '天潼路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2380776,
    longitude: 121.4845042,
    position: '南京东路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2277646,
    longitude: 121.4873412,
    position: '豫园站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2188756,
    longitude: 121.4828022,
    position: '老西门站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2164696,
    longitude: 121.4751582,
    position: '新天地站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2150046,
    longitude: 121.4581292,
    position: '陕西南路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2081046,
    longitude: 121.4442132,
    position: '上海图书馆站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2021985,
    longitude: 121.4351835,
    position: '交通大学站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1966231024,
    longitude: 121.4224943519,
    position: '虹桥路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1965976,
    longitude: 121.4115932,
    position: '宋园路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1988386,
    longitude: 121.4039322,
    position: '伊犁路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1994296,
    longitude: 121.3919392,
    position: '水城路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1943356,
    longitude: 121.3797802,
    position: '龙溪路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1902506,
    longitude: 121.3680092,
    position: '上海动物园站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1913696,
    longitude: 121.3469442,
    position: '虹桥1号航站楼站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1942346,
    longitude: 121.3261122,
    position: '虹桥2号航站楼站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1939546,
    longitude: 121.3214132,
    position: '虹桥火车站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1770726,
    longitude: 121.3702412,
    position: '龙柏新村站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1697646,
    longitude: 121.3642752,
    position: '紫藤路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1658576,
    longitude: 121.3550262,
    position: '航中路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_L10_31',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.141423,
    longitude: 121.668561,
    position: '迪士尼',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.130434,
    longitude: 121.617479,
    position: '康新公路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.13772,
    longitude: 121.599149,
    position: '秀沿路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1528031,
    longitude: 121.5932112,
    position: '罗山路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1581329,
    longitude: 121.5710801,
    position: '御桥',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1508406,
    longitude: 121.5387422,
    position: '浦三路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1464576,
    longitude: 121.5228382,
    position: '三林东',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1432316,
    longitude: 121.5113822,
    position: '三林',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1598516,
    longitude: 121.4596262,
    position: '龙耀路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1665044,
    longitude: 121.458476,
    position: '云锦路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1726758,
    longitude: 121.4527375,
    position: '龙华',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1792256,
    longitude: 121.4415757,
    position: '上海游泳馆',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1946326,
    longitude: 121.4359982,
    position: '徐家汇',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2021985,
    longitude: 121.4351835,
    position: '交通大学',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2205226,
    longitude: 121.4305342,
    position: '江苏路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2305126,
    longitude: 121.4234312,
    position: '隆德路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2377013565,
    longitude: 121.4177441597,
    position: '曹杨路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2418181,
    longitude: 121.4113162,
    position: '枫桥路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2508416,
    longitude: 121.4070572,
    position: '真如',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2626976,
    longitude: 121.4007892,
    position: '上海西站',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2690246,
    longitude: 121.3898322,
    position: '李子园',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2716616,
    longitude: 121.3758202,
    position: '祁连山路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2764708,
    longitude: 121.3648287,
    position: '武威路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2816046,
    longitude: 121.3498288,
    position: '桃浦新村',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2968476,
    longitude: 121.3231322,
    position: '南翔',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3194646,
    longitude: 121.2767022,
    position: '马陆',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3296327,
    longitude: 121.2546845,
    position: '嘉定新城',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3451926,
    longitude: 121.2452842,
    position: '白银路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3770886,
    longitude: 121.2277262,
    position: '嘉定西',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3915156,
    longitude: 121.2371892,
    position: '嘉定北',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_31',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.3318426,
    longitude: 121.2259242,
    position: '上海赛车场',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_32',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2935586,
    longitude: 121.2002472,
    position: '昌吉东路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_33',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2853906,
    longitude: 121.1806712,
    position: '上海汽车城',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_34',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2877866,
    longitude: 121.1631272,
    position: '安亭',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_35',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2889796,
    longitude: 121.1502112,
    position: '兆丰路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_36',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2963346,
    longitude: 121.1171422,
    position: '光明路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_37',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2988006,
    longitude: 121.1041792,
    position: '花桥',
    receiver: 'Line 11',
    sample_id: 'CN_SH_L11_38',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2630466,
    longitude: 121.6384352,
    position: '金海路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2801936,
    longitude: 121.6266442,
    position: '申江路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2798256,
    longitude: 121.6153752,
    position: '金京路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2800966,
    longitude: 121.6028002,
    position: '杨高北路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2800225417,
    longitude: 121.5897971392,
    position: '巨峰路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2825366,
    longitude: 121.5787702,
    position: '东陆路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2805316,
    longitude: 121.5610442,
    position: '复兴岛',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2797926,
    longitude: 121.5525182,
    position: '爱国路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2752136,
    longitude: 121.5445512,
    position: '隆昌路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2686666,
    longitude: 121.5323032,
    position: '宁国路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.266602,
    longitude: 121.5280594,
    position: '江浦公园',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2579426,
    longitude: 121.5129512,
    position: '大连路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2534716,
    longitude: 121.5065392,
    position: '提篮桥',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2500596,
    longitude: 121.4979102,
    position: '国际客运中心',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2439126,
    longitude: 121.4823122,
    position: '天潼路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2423116,
    longitude: 121.4714062,
    position: '曲阜路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2416246,
    longitude: 121.4581842,
    position: '汉中路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2298942,
    longitude: 121.4598666,
    position: '南京西路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2172505,
    longitude: 121.4597002,
    position: '陕西南路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2028596,
    longitude: 121.4607192,
    position: '嘉善路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_20',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1940086,
    longitude: 121.4631792,
    position: '大木桥路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_21',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1849065,
    longitude: 121.4572633,
    position: '龙华中路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_22',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1725036,
    longitude: 121.4527712,
    position: '龙华',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_23',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1694055,
    longitude: 121.4442815,
    position: '龙漕路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_24',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1682568,
    longitude: 121.4349185,
    position: '漕宝路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_25',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1668728,
    longitude: 121.4183627,
    position: '桂林公园',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_26',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.164231,
    longitude: 121.410519,
    position: '虹漕路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_27',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1622032,
    longitude: 121.4024209,
    position: '虹梅路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_28',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1547229,
    longitude: 121.3919739,
    position: '东兰路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_29',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1412146,
    longitude: 121.3942132,
    position: '顾戴路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_30',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1373106,
    longitude: 121.3792372,
    position: '虹莘路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_31',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1326579,
    longitude: 121.3641913,
    position: '七莘路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_L12_32',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2410306,
    longitude: 121.3189902,
    position: '金运路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2411546,
    longitude: 121.3350012,
    position: '金沙江西路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2425466,
    longitude: 121.3550572,
    position: '丰庄',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2376296,
    longitude: 121.3671382,
    position: '祁连山南路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2323616,
    longitude: 121.3815752,
    position: '真北路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2317806,
    longitude: 121.3947572,
    position: '大渡河路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2312338855,
    longitude: 121.411703825,
    position: '金沙江路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2305126,
    longitude: 121.4234312,
    position: '隆德路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2343706,
    longitude: 121.4303852,
    position: '武宁路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2409269,
    longitude: 121.4381836,
    position: '长寿路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2439446,
    longitude: 121.4434212,
    position: '江宁路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2417385,
    longitude: 121.4581787,
    position: '汉中路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2367561,
    longitude: 121.4626195,
    position: '自然博物馆',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2298481,
    longitude: 121.4598355,
    position: '南京西路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_14',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.221247,
    longitude: 121.4633695,
    position: '淮海中路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_15',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.216435,
    longitude: 121.4750808,
    position: '新天地',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_16',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2093839,
    longitude: 121.476387,
    position: '马当路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_17',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.196559,
    longitude: 121.48212,
    position: '世博会博物馆',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_18',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.182425,
    longitude: 121.4844115,
    position: '世博大道',
    receiver: 'Line 13',
    sample_id: 'CN_SH_L13_19',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 30.9072726,
    longitude: 121.9294222,
    position: '滴水湖',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_01',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 30.9242026,
    longitude: 121.9099362,
    position: '临港大道',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_02',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 30.9592946,
    longitude: 121.8503982,
    position: '书院',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_03',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0265606,
    longitude: 121.7936622,
    position: '惠南东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_04',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0537886,
    longitude: 121.7615492,
    position: '惠南',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_05',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0502006,
    longitude: 121.6991072,
    position: '野生动物园',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_06',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0454786,
    longitude: 121.6488452,
    position: '新场',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_07',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0549106,
    longitude: 121.6172972,
    position: '航头东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_08',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.0776346,
    longitude: 121.6110982,
    position: '鹤沙航城',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_09',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1099596,
    longitude: 121.6067692,
    position: '周浦东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_10',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1528066,
    longitude: 121.5932112,
    position: '罗山路',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_11',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.1758486,
    longitude: 121.5829632,
    position: '华夏中路站',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_12',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20160621',
    latitude: 31.2024956,
    longitude: 121.5575882,
    position: '龙阳路站',
    receiver: 'Line 16',
    sample_id: 'CN_SH_L16_13',
    tubes: 2,
    year: '2016'
  },
  {
    date: '20170622',
    latitude: 31.1109237555,
    longitude: 121.3849986165,
    position: '莘庄',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_03',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1210126,
    longitude: 121.3929642,
    position: '外环路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_04',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1309716,
    longitude: 121.4027682,
    position: '莲花路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_05',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1419686,
    longitude: 121.4138212,
    position: '锦江乐园',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_06',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1545316,
    longitude: 121.4299962,
    position: '上海南站',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_07',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1682416,
    longitude: 121.4348402,
    position: '漕宝路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_08',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1817637408,
    longitude: 121.4362728596,
    position: '上海体育馆',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_09',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1939432665,
    longitude: 121.4388263226,
    position: '徐家汇',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_10',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2045786,
    longitude: 121.4463202,
    position: '衡山路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_11',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2132625422,
    longitude: 121.4509257674,
    position: '常熟路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_12',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2173112668,
    longitude: 121.4601874352,
    position: '陕西南路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_13',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2227336,
    longitude: 121.4731552,
    position: '黄陂南路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_14',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2327156,
    longitude: 121.4756182,
    position: '人民广场',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_15',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2384236,
    longitude: 121.4679042,
    position: '新闸路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_16',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2416246,
    longitude: 121.4581842,
    position: '汉中路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_17',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2495870467,
    longitude: 121.4583152533,
    position: '上海火车站',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_18',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2587646,
    longitude: 121.4590832,
    position: '中山北路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_19',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2716296,
    longitude: 121.4552242,
    position: '延长路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_20',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2799386,
    longitude: 121.4518802,
    position: '上海马戏城',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_21',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2925976,
    longitude: 121.4501032,
    position: '汶水路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_22',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3066086,
    longitude: 121.4485052,
    position: '彭浦新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_23',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3189626,
    longitude: 121.4469592,
    position: '共康路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_24',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3311346,
    longitude: 121.4414012,
    position: '通河新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_25',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3398856,
    longitude: 121.4375702,
    position: '呼兰路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_26',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3551846,
    longitude: 121.4339772,
    position: '共富新村',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_27',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3695706,
    longitude: 121.4308442,
    position: '宝安公路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_28',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3809886,
    longitude: 121.4279082,
    position: '友谊西路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_29',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3922546,
    longitude: 121.4245232,
    position: '富 锦 路',
    receiver: 'Line 1',
    sample_id: 'CN_SH_MG_30',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1926596,
    longitude: 121.7226802,
    position: '凌空路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_31',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1994486,
    longitude: 121.7552372,
    position: '远东大道',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_32',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1504666,
    longitude: 121.8057162,
    position: '浦东国际机场',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_33',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1867506,
    longitude: 121.6980992,
    position: '川沙',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_34',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1965786,
    longitude: 121.6809642,
    position: '华夏东路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_35',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2138626,
    longitude: 121.6735982,
    position: '创新中路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_36',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2133486,
    longitude: 121.6564282,
    position: '唐镇',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_37',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2110546,
    longitude: 121.6209592,
    position: '广兰路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_38',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2018346,
    longitude: 121.5875342,
    position: '张江高科',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_39',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2042246,
    longitude: 121.6019012,
    position: '金科路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_40',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1882906,
    longitude: 121.2991902,
    position: '徐泾东',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_41',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1939546,
    longitude: 121.3214132,
    position: '虹桥火车站',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_42',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1942346,
    longitude: 121.326112,
    position: '虹桥2号航站楼',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_43',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2182306,
    longitude: 121.3593362,
    position: '淞虹路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_44',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2166076,
    longitude: 121.3740642,
    position: '北新泾',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_45',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2149536,
    longitude: 121.3867952,
    position: '威宁路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_46',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2110919,
    longitude: 121.4039195,
    position: '娄山关路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_47',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.21849259,
    longitude: 121.4185139537,
    position: '中山公园',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_48',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.219871164,
    longitude: 121.4325875044,
    position: '江苏路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_49',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2232086,
    longitude: 121.4463182,
    position: '静安寺',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_50',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2298656,
    longitude: 121.4598522,
    position: '南京西路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_51',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2327156,
    longitude: 121.4756182,
    position: '人民广场',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_52',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.238073,
    longitude: 121.484641,
    position: '南京东路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_53',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2024956,
    longitude: 121.5575882,
    position: '龙阳路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_54',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2382033,
    longitude: 121.5021478,
    position: '陆家嘴',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_55',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2333216,
    longitude: 121.5152762,
    position: '东昌路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_56',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1683606,
    longitude: 121.7969142,
    position: '海天三路',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_57',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_58',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2173776,
    longitude: 121.5453244,
    position: '上海科技馆',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_59',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2095516,
    longitude: 121.5507302,
    position: '世纪公园',
    receiver: 'Line 2',
    sample_id: 'CN_SH_MG_60',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1545316,
    longitude: 121.4299962,
    position: '上海南站',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_61',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1579296,
    longitude: 121.4430602,
    position: '石龙路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_62',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1694656,
    longitude: 121.4442522,
    position: '龙漕路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_63',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1767406,
    longitude: 121.4382282,
    position: '漕溪路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_64',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1871256,
    longitude: 121.4270182,
    position: '宜山路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_65',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1974526,
    longitude: 121.4206362,
    position: '虹桥路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_66',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2095926,
    longitude: 121.4169292,
    position: '延安西路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_67',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2180106,
    longitude: 121.4155672,
    position: '中山公园',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_68',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2321396,
    longitude: 121.4130802,
    position: '金沙江路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_69',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2394146,
    longitude: 121.4177462,
    position: '曹杨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_70',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2465146,
    longitude: 121.4298652,
    position: '镇坪路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_71',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2545946,
    longitude: 121.4409792,
    position: '中潭路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_72',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2496946,
    longitude: 121.4580792,
    position: '上海火车站',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_73',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2515756,
    longitude: 121.4762312,
    position: '宝山路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_74',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2597876,
    longitude: 121.4801082,
    position: '东宝兴路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_75',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2706036,
    longitude: 121.4792772,
    position: '虹口足球场',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_76',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2812556,
    longitude: 121.4823532,
    position: '赤峰路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_77',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2895566,
    longitude: 121.4830872,
    position: '大柏树',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_78',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3055206,
    longitude: 121.4849412,
    position: '江湾镇',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_79',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3198636,
    longitude: 121.4848232,
    position: '殷高西路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_80',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3320546,
    longitude: 121.4914192,
    position: '长江南路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_81',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3451526,
    longitude: 121.5002792,
    position: '淞发路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_82',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3580266,
    longitude: 121.4985722,
    position: '张华浜',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_83',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3710866,
    longitude: 121.4926912,
    position: '淞滨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_84',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3814066,
    longitude: 121.4880402,
    position: '水产路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_85',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3953196,
    longitude: 121.4794462,
    position: '宝杨路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_86',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.404014,
    longitude: 121.47595,
    position: '友谊路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_87',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.4081686,
    longitude: 121.4610822,
    position: '铁力路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_88',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.4078606,
    longitude: 121.4396862,
    position: '江杨北路',
    receiver: 'Line 3',
    sample_id: 'CN_SH_MG_89',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1827856,
    longitude: 121.4371402,
    position: '上海体育馆',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_90',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1854926,
    longitude: 121.4432532,
    position: '上海体育场',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_91',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1908196,
    longitude: 121.4547332,
    position: '东安路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_92',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1940086,
    longitude: 121.4631792,
    position: '大木桥路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_93',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1991996,
    longitude: 121.4748482,
    position: '鲁班路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_94',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2019676,
    longitude: 121.4894242,
    position: '西藏南路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_95',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2085986,
    longitude: 121.4994392,
    position: '南浦大桥',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_96',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2098026,
    longitude: 121.5184882,
    position: '塘桥',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_97',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.211854,
    longitude: 121.527734,
    position: '蓝村路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_98',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2223716,
    longitude: 121.5319152,
    position: '浦电路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_99',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_100',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2400176,
    longitude: 121.5192422,
    position: '浦东大道',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_101',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2519276,
    longitude: 121.5170792,
    position: '杨树浦路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_102',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2579426,
    longitude: 121.5129512,
    position: '大连路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_103',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2608716,
    longitude: 121.5005232,
    position: '临平路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_104',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2589583274,
    longitude: 121.4896059036,
    position: '海伦路',
    receiver: 'Line 4',
    sample_id: 'CN_SH_MG_105',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1210126,
    longitude: 121.3929642,
    position: '莘庄',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_106',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0982096,
    longitude: 121.3856462,
    position: '春申路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_107',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0893256,
    longitude: 121.3902192,
    position: '银都路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_108',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0669916,
    longitude: 121.4017412,
    position: '颛桥',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_109',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0450716,
    longitude: 121.4099512,
    position: '北桥',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_110',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0264286,
    longitude: 121.4164412,
    position: '剑川路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_111',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0182266,
    longitude: 121.4197232,
    position: '东川路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_112',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0112316,
    longitude: 121.4100292,
    position: '金平路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_113',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0073836,
    longitude: 121.3951182,
    position: '华宁路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_114',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0035646,
    longitude: 121.3806682,
    position: '文井路',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_115',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0005526,
    longitude: 121.3696392,
    position: '闵行开发区',
    receiver: 'Line 5',
    sample_id: 'CN_SH_MG_116',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3530196,
    longitude: 121.5747032,
    position: '港城路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_117',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3478446,
    longitude: 121.5867772,
    position: '外高桥保税区北',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_118',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3354456,
    longitude: 121.5938442,
    position: '航津路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_119',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3216076,
    longitude: 121.6018562,
    position: '外高桥保税区南',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_120',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3123216,
    longitude: 121.5892702,
    position: '洲海路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_121',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3025936,
    longitude: 121.5891772,
    position: '五洲大道',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_122',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2906726,
    longitude: 121.5887102,
    position: '东靖路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_123',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2806846,
    longitude: 121.5883112,
    position: '巨峰路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_124',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2720776,
    longitude: 121.5878192,
    position: '五莲路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_125',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2635056,
    longitude: 121.5865522,
    position: '博兴路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_126',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2571856,
    longitude: 121.5817632,
    position: '金桥路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_127',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2503936,
    longitude: 121.5725962,
    position: '云山路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_128',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2453952,
    longitude: 121.5640942,
    position: '德平路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_129',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2391256,
    longitude: 121.5521232,
    position: '北洋泾路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_130',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2358546,
    longitude: 121.5433882,
    position: '民生路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_131',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2330086,
    longitude: 121.5345062,
    position: '源深体育中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_132',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_133',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2201566,
    longitude: 121.5289672,
    position: '浦电路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_134',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2118633,
    longitude: 121.5279301,
    position: '蓝村路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_135',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2032936,
    longitude: 121.5233542,
    position: '上海儿童医学中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_136',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1931886,
    longitude: 121.5165282,
    position: '临沂新村',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_137',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1857496,
    longitude: 121.5096562,
    position: '高科西路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_138',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1726506,
    longitude: 121.5107312,
    position: '东明路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_139',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1600926,
    longitude: 121.5155422,
    position: '高青路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_140',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1498746,
    longitude: 121.5143782,
    position: '华夏西路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_141',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1491376,
    longitude: 121.5061452,
    position: '上南路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_142',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1487676,
    longitude: 121.4951792,
    position: '灵岩南路',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_143',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 6',
    sample_id: 'CN_SH_MG_144',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2112166,
    longitude: 121.5626172,
    position: '花木路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_145',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2030424693,
    longitude: 121.5574282408,
    position: '龙阳路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_146',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1931646,
    longitude: 121.5499622,
    position: '芳华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_147',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1875966,
    longitude: 121.5399042,
    position: '锦绣路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_148',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1875776,
    longitude: 121.5249692,
    position: '杨高南路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_149',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1857496,
    longitude: 121.5096562,
    position: '高科西路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_150',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1821326,
    longitude: 121.5002382,
    position: '云台路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_151',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1785176,
    longitude: 121.4944752,
    position: '耀华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_152',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1732211,
    longitude: 121.4834805,
    position: '长清路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_153',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1718876,
    longitude: 121.4737992,
    position: '后滩',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_154',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1849706,
    longitude: 121.4570012,
    position: '龙华中路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_155',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1908196,
    longitude: 121.4547332,
    position: '东安路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_156',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1994986,
    longitude: 121.4502012,
    position: '肇嘉浜路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_157',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2135286,
    longitude: 121.4490042,
    position: '常熟路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_158',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2232613156,
    longitude: 121.4484661818,
    position: '静安寺',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_159',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2338851,
    longitude: 121.4423902,
    position: '昌平路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_160',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.239912121,
    longitude: 121.4381048083,
    position: '长寿路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_161',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2464523784,
    longitude: 121.4319384098,
    position: '镇坪路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_162',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2562266,
    longitude: 121.4216562,
    position: '岚皋路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_163',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2639566,
    longitude: 121.4225452,
    position: '新村路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_164',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2738746,
    longitude: 121.4229092,
    position: '大华三路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_165',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2849466,
    longitude: 121.4213562,
    position: '行知路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_166',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2933246,
    longitude: 121.4164112,
    position: '大场镇',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_167',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3038686,
    longitude: 121.4135572,
    position: '场中路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_168',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3149676,
    longitude: 121.4084642,
    position: '上大路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_169',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3214406,
    longitude: 121.3985872,
    position: '南陈路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_170',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3205776,
    longitude: 121.3886752,
    position: '上海大学',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_171',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3223196,
    longitude: 121.3734322,
    position: '祁华路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_172',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3448136,
    longitude: 121.3726262,
    position: '顾村公园',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_173',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3575726,
    longitude: 121.3622652,
    position: '刘行',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_174',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3641836,
    longitude: 121.3557002,
    position: '潘广路',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_175',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3887376,
    longitude: 121.3573142,
    position: '罗南新村',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_176',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.4017256,
    longitude: 121.3499852,
    position: '美兰湖',
    receiver: 'Line 7',
    sample_id: 'CN_SH_MG_177',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0614136,
    longitude: 121.5120912,
    position: '沈杜公路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_178',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0734216,
    longitude: 121.5104532,
    position: '联航路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_179',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0840266,
    longitude: 121.5084952,
    position: '江月路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_180',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0962496,
    longitude: 121.5062512,
    position: '浦江镇',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_181',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1190786,
    longitude: 121.4976762,
    position: '芦恒路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_182',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1413616,
    longitude: 121.4895062,
    position: '凌兆新村',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_183',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_184',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1610716,
    longitude: 121.4933262,
    position: '杨思',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_185',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1706926,
    longitude: 121.4960992,
    position: '成山路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_186',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1785176,
    longitude: 121.4944752,
    position: '耀华路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_187',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1854156,
    longitude: 121.4934882,
    position: '中华艺术宫',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_188',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2019676,
    longitude: 121.4894242,
    position: '西藏南路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_189',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2117731,
    longitude: 121.4859712,
    position: '陆家浜路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_190',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2188756,
    longitude: 121.4828022,
    position: '老西门',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_191',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2271866,
    longitude: 121.4791785,
    position: '大世界',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_192',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2332698,
    longitude: 121.4747606,
    position: '人民广场',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_193',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2423116,
    longitude: 121.4714062,
    position: '曲阜路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_194',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2532326,
    longitude: 121.4688892,
    position: '中兴路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_195',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2635276,
    longitude: 121.4686462,
    position: '西藏北路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_196',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2698899303,
    longitude: 121.4794135094,
    position: '虹口足球场',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_197',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2765246,
    longitude: 121.4905732,
    position: '曲阳路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_198',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2748836,
    longitude: 121.5013442,
    position: '四平路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_199',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2732526,
    longitude: 121.5095932,
    position: '鞍山新村',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_200',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2749636,
    longitude: 121.5183102,
    position: '江浦路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_201',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2787926,
    longitude: 121.5282262,
    position: '黄兴路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_202',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2885966,
    longitude: 121.5348032,
    position: '延吉中路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_203',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2958356,
    longitude: 121.5330042,
    position: '黄兴公园',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_204',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3050066,
    longitude: 121.5318372,
    position: '翔殷路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_205',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3147936,
    longitude: 121.5318152,
    position: '嫩江路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_206',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3227616,
    longitude: 121.5317972,
    position: '市光路',
    receiver: 'Line 8',
    sample_id: 'CN_SH_MG_207',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2168676,
    longitude: 121.4982602,
    position: '小南门',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_208',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2303046,
    longitude: 121.5160772,
    position: '商城路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_209',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2275316,
    longitude: 121.5485772,
    position: '杨高中路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_210',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1994986,
    longitude: 121.4502012,
    position: '肇嘉浜路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_211',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2028596,
    longitude: 121.4607192,
    position: '嘉善路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_212',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2117731,
    longitude: 121.4859712,
    position: '陆家浜路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_213',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2063176,
    longitude: 121.4685522,
    position: '打浦桥',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_214',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2095246,
    longitude: 121.4771192,
    position: '马当路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_215',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2289826,
    longitude: 121.5267132,
    position: '世纪大道',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_216',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1946326,
    longitude: 121.4359982,
    position: '徐家汇',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_217',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1871256,
    longitude: 121.4270182,
    position: '宜山路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_218',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1747656,
    longitude: 121.4179322,
    position: '桂林路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_219',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1706296,
    longitude: 121.3976732,
    position: '漕河泾开发区',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_220',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1665496,
    longitude: 121.3846452,
    position: '合川路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_221',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1581526,
    longitude: 121.3689132,
    position: '星中路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_222',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1552966,
    longitude: 121.3490932,
    position: '七宝',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_223',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1496426,
    longitude: 121.3380462,
    position: '中春路',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_224',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1377366,
    longitude: 121.3191532,
    position: '九亭',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_225',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1183236,
    longitude: 121.2603132,
    position: '泗泾',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_226',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1044716,
    longitude: 121.2295842,
    position: '佘山',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_227',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0844936,
    longitude: 121.2303362,
    position: '洞泾',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_228',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0540936,
    longitude: 121.2324802,
    position: '松江大学城',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_229',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0303146,
    longitude: 121.2306022,
    position: '松江新城',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_230',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0155706,
    longitude: 121.2303512,
    position: '松江体育中心',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_231',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.0015336,
    longitude: 121.2292142,
    position: '醉白池',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_232',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 30.9852276,
    longitude: 121.2309302,
    position: '松江南站',
    receiver: 'Line 9',
    sample_id: 'CN_SH_MG_233',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3285926,
    longitude: 121.5066292,
    position: '新江湾城站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_234',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3217816,
    longitude: 121.5066782,
    position: '殷高东路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_235',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3131696,
    longitude: 121.5081562,
    position: '三门路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_236',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3028656,
    longitude: 121.5140812,
    position: '江湾体育场站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_237',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2980676,
    longitude: 121.5145112,
    position: '五角场站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_238',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2893076,
    longitude: 121.5099022,
    position: '国权路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_239',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2821866,
    longitude: 121.5061732,
    position: '同济大学站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_240',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2748836,
    longitude: 121.5013442,
    position: '四平路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_241',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2687086,
    longitude: 121.4944242,
    position: '邮电新村站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_242',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2592771,
    longitude: 121.4885382,
    position: '海伦路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_243',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2520806,
    longitude: 121.4842152,
    position: '四川北路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_244',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2439126,
    longitude: 121.4823122,
    position: '天潼路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_245',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2380776,
    longitude: 121.4845042,
    position: '南京东路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_246',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2277646,
    longitude: 121.4873412,
    position: '豫园站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_247',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2188756,
    longitude: 121.4828022,
    position: '老西门站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_248',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2164696,
    longitude: 121.4751582,
    position: '新天地站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_249',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2150046,
    longitude: 121.4581292,
    position: '陕西南路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_250',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2081046,
    longitude: 121.4442132,
    position: '上海图书馆站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_251',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2021985,
    longitude: 121.4351835,
    position: '交通大学站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_252',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1966231024,
    longitude: 121.4224943519,
    position: '虹桥路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_253',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1965976,
    longitude: 121.4115932,
    position: '宋园路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_254',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1988386,
    longitude: 121.4039322,
    position: '伊犁路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_255',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1994296,
    longitude: 121.3919392,
    position: '水城路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_256',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1943356,
    longitude: 121.3797802,
    position: '龙溪路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_257',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1902506,
    longitude: 121.3680092,
    position: '上海动物园站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_258',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1913696,
    longitude: 121.3469442,
    position: '虹桥1号航站楼站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_259',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1942346,
    longitude: 121.3261122,
    position: '虹桥2号航站楼站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_260',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1939546,
    longitude: 121.3214132,
    position: '虹桥火车站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_261',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1770726,
    longitude: 121.3702412,
    position: '龙柏新村站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_262',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1697646,
    longitude: 121.3642752,
    position: '紫藤路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_263',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1658576,
    longitude: 121.3550262,
    position: '航中路站',
    receiver: 'Line 10',
    sample_id: 'CN_SH_MG_264',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.141423,
    longitude: 121.668561,
    position: '迪士尼',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_265',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.130434,
    longitude: 121.617479,
    position: '康新公路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_266',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.13772,
    longitude: 121.599149,
    position: '秀沿路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_267',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1528031,
    longitude: 121.5932112,
    position: '罗山路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_268',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1581329,
    longitude: 121.5710801,
    position: '御桥',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_269',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1508406,
    longitude: 121.5387422,
    position: '浦三路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_270',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1464576,
    longitude: 121.5228382,
    position: '三林东',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_271',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1432316,
    longitude: 121.5113822,
    position: '三林',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_272',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1533706,
    longitude: 121.4801672,
    position: '东方体育中心',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_273',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1598516,
    longitude: 121.4596262,
    position: '龙耀路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_274',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1665044,
    longitude: 121.458476,
    position: '云锦路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_275',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1726758,
    longitude: 121.4527375,
    position: '龙华',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_276',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1792256,
    longitude: 121.4415757,
    position: '上海游泳馆',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_277',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1946326,
    longitude: 121.4359982,
    position: '徐家汇',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_278',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2021985,
    longitude: 121.4351835,
    position: '交通大学',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_279',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2205226,
    longitude: 121.4305342,
    position: '江苏路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_280',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2305126,
    longitude: 121.4234312,
    position: '隆德路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_281',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2377013565,
    longitude: 121.4177441597,
    position: '曹杨路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_282',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2418181,
    longitude: 121.4113162,
    position: '枫桥路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_283',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2508416,
    longitude: 121.4070572,
    position: '真如',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_284',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2626976,
    longitude: 121.4007892,
    position: '上海西站',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_285',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2690246,
    longitude: 121.3898322,
    position: '李子园',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_286',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2716616,
    longitude: 121.3758202,
    position: '祁连山路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_287',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2764708,
    longitude: 121.3648287,
    position: '武威路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_288',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2816046,
    longitude: 121.3498288,
    position: '桃浦新村',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_289',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2968476,
    longitude: 121.3231322,
    position: '南翔',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_290',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3194646,
    longitude: 121.2767022,
    position: '马陆',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_291',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.3296327,
    longitude: 121.2546845,
    position: '嘉定新城',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_292',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.3451926,
    longitude: 121.2452842,
    position: '白银路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_293',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.3770886,
    longitude: 121.2277262,
    position: '嘉定西',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_294',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.3915156,
    longitude: 121.2371892,
    position: '嘉定北',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_295',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.3318426,
    longitude: 121.2259242,
    position: '上海赛车场',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_296',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2935586,
    longitude: 121.2002472,
    position: '昌吉东路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_297',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2853906,
    longitude: 121.1806712,
    position: '上海汽车城',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_298',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2877866,
    longitude: 121.1631272,
    position: '安亭',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_299',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2889796,
    longitude: 121.1502112,
    position: '兆丰路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_300',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2963346,
    longitude: 121.1171422,
    position: '光明路',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_301',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2988006,
    longitude: 121.1041792,
    position: '花桥',
    receiver: 'Line 11',
    sample_id: 'CN_SH_MG_302',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2630466,
    longitude: 121.6384352,
    position: '金海路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_303',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2801936,
    longitude: 121.6266442,
    position: '申江路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_304',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2798256,
    longitude: 121.6153752,
    position: '金京路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_305',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2800966,
    longitude: 121.6028002,
    position: '杨高北路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_306',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2800225417,
    longitude: 121.5897971392,
    position: '巨峰路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_307',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2825366,
    longitude: 121.5787702,
    position: '东陆路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_308',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2805316,
    longitude: 121.5610442,
    position: '复兴岛',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_309',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2797926,
    longitude: 121.5525182,
    position: '爱国路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_310',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2752136,
    longitude: 121.5445512,
    position: '隆昌路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_311',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2686666,
    longitude: 121.5323032,
    position: '宁国路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_312',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.266602,
    longitude: 121.5280594,
    position: '江浦公园',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_313',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2579426,
    longitude: 121.5129512,
    position: '大连路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_314',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2534716,
    longitude: 121.5065392,
    position: '提篮桥',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_315',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2500596,
    longitude: 121.4979102,
    position: '国际客运中心',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_316',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2439126,
    longitude: 121.4823122,
    position: '天潼路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_317',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2423116,
    longitude: 121.4714062,
    position: '曲阜路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_318',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2416246,
    longitude: 121.4581842,
    position: '汉中路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_319',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2298942,
    longitude: 121.4598666,
    position: '南京西路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_320',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2172505,
    longitude: 121.4597002,
    position: '陕西南路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_321',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2028596,
    longitude: 121.4607192,
    position: '嘉善路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_322',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1940086,
    longitude: 121.4631792,
    position: '大木桥路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_323',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1849065,
    longitude: 121.4572633,
    position: '龙华中路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_324',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1725036,
    longitude: 121.4527712,
    position: '龙华',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_325',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1694055,
    longitude: 121.4442815,
    position: '龙漕路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_326',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1682568,
    longitude: 121.4349185,
    position: '漕宝路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_327',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1668728,
    longitude: 121.4183627,
    position: '桂林公园',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_328',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.164231,
    longitude: 121.410519,
    position: '虹漕路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_329',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1622032,
    longitude: 121.4024209,
    position: '虹梅路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_330',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1547229,
    longitude: 121.3919739,
    position: '东兰路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_331',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1412146,
    longitude: 121.3942132,
    position: '顾戴路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_332',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1373106,
    longitude: 121.3792372,
    position: '虹莘路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_333',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.1326579,
    longitude: 121.3641913,
    position: '七莘路',
    receiver: 'Line 12',
    sample_id: 'CN_SH_MG_334',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2410306,
    longitude: 121.3189902,
    position: '金运路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_335',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2411546,
    longitude: 121.3350012,
    position: '金沙江西路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_336',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2425466,
    longitude: 121.3550572,
    position: '丰庄',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_337',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2376296,
    longitude: 121.3671382,
    position: '祁连山南路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_338',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2323616,
    longitude: 121.3815752,
    position: '真北路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_339',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2317806,
    longitude: 121.3947572,
    position: '大渡河路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_340',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2312338855,
    longitude: 121.411703825,
    position: '金沙江路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_341',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2305126,
    longitude: 121.4234312,
    position: '隆德路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_342',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2343706,
    longitude: 121.4303852,
    position: '武宁路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_343',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2409269,
    longitude: 121.4381836,
    position: '长寿路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_344',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2439446,
    longitude: 121.4434212,
    position: '江宁路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_345',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2417385,
    longitude: 121.4581787,
    position: '汉中路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_346',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2367561,
    longitude: 121.4626195,
    position: '自然博物馆',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_347',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2298481,
    longitude: 121.4598355,
    position: '南京西路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_348',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.221247,
    longitude: 121.4633695,
    position: '淮海中路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_349',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.216435,
    longitude: 121.4750808,
    position: '新天地',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_350',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170621',
    latitude: 31.2093839,
    longitude: 121.476387,
    position: '马当路',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_351',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.196559,
    longitude: 121.48212,
    position: '世博会博物馆',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_352',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.182425,
    longitude: 121.4844115,
    position: '世博大道',
    receiver: 'Line 13',
    sample_id: 'CN_SH_MG_353',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 30.9072726,
    longitude: 121.9294222,
    position: '滴水湖',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_354',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 30.9242026,
    longitude: 121.9099362,
    position: '临港大道',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_355',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 30.9592946,
    longitude: 121.8503982,
    position: '书院',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_356',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0265606,
    longitude: 121.7936622,
    position: '惠南东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_357',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0537886,
    longitude: 121.7615492,
    position: '惠南',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_358',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0502006,
    longitude: 121.6991072,
    position: '野生动物园',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_359',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0454786,
    longitude: 121.6488452,
    position: '新场',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_360',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0549106,
    longitude: 121.6172972,
    position: '航头东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_361',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.0776346,
    longitude: 121.6110982,
    position: '鹤沙航城',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_362',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1099596,
    longitude: 121.6067692,
    position: '周浦东',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_363',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1528066,
    longitude: 121.5932112,
    position: '罗山路',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_364',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.1758486,
    longitude: 121.5829632,
    position: '华夏中路站',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_365',
    tubes: 2,
    year: '2017'
  },
  {
    date: '20170622',
    latitude: 31.2024956,
    longitude: 121.5575882,
    position: '龙阳路站',
    receiver: 'Line 16',
    sample_id: 'CN_SH_MG_366',
    tubes: 2,
    year: '2017'
  }
]

export function mapValue(data) {
  return map(data, o => {
    return {
      name: o.position,
      value: [o.longitude, o.latitude, o.tubes]
    }
  })
}

export function registerChinaMap(echarts) {
  var log = function(msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  if (!echarts.registerMap) {
    log('ECharts Map is not loaded')
    return
  }
  echarts.registerMap('world', world)
  echarts.registerMap('china', china)
  echarts.registerMap('asia', asia)
  echarts.registerMap('shanghai', shanghai)
}

export function getMapOptions() {
  // 2. 指定配置和数据
  // 2. 指定配置和数据
  var geoCoordMap = {
    Wellington: [174.4638, 41.172],
    Sydney: [150.53, 33.55],
    Tokyo: [139.42, 35.41],
    Seoul: [126.5848, 37.2281],
    HongKong: [113.4948, 22.0881],
    ShangHai: [121.4648, 31.2891],
    DongGuang: [113.8953, 22.901],
    DongYing: [118.7073, 37.5513],
    ZhongShan: [113.4229, 22.478],
    LinFen: [111.4783, 36.1615],
    LinXin: [118.3118, 35.2936],
    DanDong: [124.541, 40.4242],
    LiShui: [119.5642, 28.1854],
    WuLuMuQi: [87.9236, 43.5883],
    FoShan: [112.8955, 23.1097],
    BaoDing: [115.0488, 39.0948],
    LanZhou: [103.5901, 36.3043],
    BaoTou: [110.3467, 41.4899],
    BeiJing: [116.4551, 40.2539],
    BeiHai: [109.314, 21.6211],
    NanJing: [118.8062, 31.9208],
    NanNing: [108.479, 23.1152],
    NanChang: [116.0046, 28.6633],
    NanTong: [121.1023, 32.1625],
    XiaMen: [118.1689, 24.6478],
    TaiZhou: [121.1353, 28.6688],
    HeFei: [117.29, 32.0581],
    HuHeHaoTe: [111.4124, 40.4901],
    XianYang: [108.4131, 34.8706],
    HaErBin: [127.9688, 45.368],
    TangShan: [118.4766, 39.6826],
    JiaXing: [120.9155, 30.6354],
    DaTong: [113.7854, 39.8035],
    DaLian: [122.2229, 39.4409],
    TianJin: [117.4219, 39.4189],
    TaiYuan: [112.3352, 37.9413],
    WeiHai: [121.9482, 37.1393],
    NingBo: [121.5967, 29.6466],
    BaoJi: [107.1826, 34.3433],
    SuQian: [118.5535, 33.7775],
    ChangZhou: [119.4543, 31.5582],
    GuangZhou: [113.5107, 23.2196],
    LangFang: [116.521, 39.0509],
    YanAn: [109.1052, 36.4252],
    ZhangJiaKou: [115.1477, 40.8527],
    XuZhou: [117.5208, 34.3268],
    DeZhou: [116.6858, 37.2107],
    HuiZhou: [114.6204, 23.1647],
    ChengDu: [103.9526, 30.7617],
    YangZhou: [119.4653, 32.8162],
    ChenDe: [117.5757, 41.4075],
    LaSa: [91.1865, 30.1465],
    WuXi: [120.3442, 31.5527],
    RiZhao: [119.2786, 35.5023],
    KunMing: [102.9199, 25.4663],
    HangZhou: [119.5313, 29.8773],
    ZhaoZhuang: [117.323, 34.8926],
    LiuZhou: [109.3799, 24.9774],
    ZhuZhou: [113.5327, 27.0319],
    WuHan: [114.3896, 30.6628],
    ShanTou: [117.1692, 23.3405],
    JiangMen: [112.6318, 22.1484],
    ShenYang: [123.1238, 42.1216],
    XiNing: [101.4038, 36.8207],
    XiAn: [109.1162, 34.2004],
    GuiYang: [106.6992, 26.7682],
    LianYunGang: [119.1248, 34.552],
    XingTai: [114.8071, 37.2821],
    HanDan: [114.4775, 36.535],
    ZhengZhou: [113.4668, 34.6234],
    ChongQing: [107.7539, 30.1904],
    JinHua: [120.0037, 29.1028],
    TongChuang: [109.0393, 35.1947],
    YinChuang: [106.3586, 38.1775],
    ZhenJiang: [119.4763, 31.9702],
    ChangChun: [125.8154, 44.2584],
    ChangSha: [113.0823, 28.2568],
    ChangZhi: [112.8625, 36.4746],
    YangQuan: [113.4778, 38.0951],
    QingDao: [120.4651, 36.3373],
    ShaoGuang: [113.7964, 24.7028]
  }

  var XAData = [
    [{ name: 'BeiJing' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'GuangZhou' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'Seoul' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'Tokyo' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'Sydney' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'Wellington' }, { name: 'ShangHai', value: 100 }],
    [{ name: 'HongKong' }, { name: 'ShangHai', value: 100 }]
  ]

  // var planePath = "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
  var planePath = 'arrow'
  var convertData = function(data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i]

      var fromCoord = geoCoordMap[dataItem[0].name]
      var toCoord = geoCoordMap[dataItem[1].name]
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        })
      }
    }
    return res
  }

  var color = ['#fff', '#fff', '#fff'] //航线的颜色
  var series = []
  ;[['ShangHai', XAData]].forEach(function(item, i) {
    series.push(
      {
        name: item[0] + ' Top3',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: 'red', //arrow箭头的颜色
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + ' Top3',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + ' Top3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{b}'
          }
        },
        symbolSize: function(val) {
          return val[2] / 8
        },
        itemStyle: {
          normal: {
            color: color[i]
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        data: item[1].map(function(dataItem) {
          return {
            name: dataItem[0].name,
            value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
          }
        })
      },
      {
        name: item[0] + ' Top3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: function(val) {
          return val[2] / 8
        },
        itemStyle: {
          normal: {
            color: color[i]
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        data: item[1].map(function(dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          }
        })
      }
    )
  })

  var option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params, ticket, callback) {
        if (params.seriesType == 'effectScatter') {
          return 'City: ' + params.data.name + '<br />' + 'Value: ' + params.data.value[2]
        } else if (params.seriesType == 'lines') {
          return params.data.fromName + ' > ' + params.data.toName + '<br />' + params.data.value
        } else {
          return params.name
        }
      }
    },

    geo: {
      map: 'asia',
      label: {
        emphasis: {
          show: true,
          color: '#fff'
        }
      },
      roam: false,
      //   放大我们的地图
      zoom: 1,
      // center: [121.4648, 31.2891],
      itemStyle: {
        normal: {
          areaColor: 'rgba(43, 196, 243, 0.42)',
          borderColor: 'rgba(43, 196, 243, 1)',
          borderWidth: 1
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      }
    },
    series: series
  }

  return option
}

export function getPointMap() {
  const options = {
    bmap: {
      center: [121.4648, 31.2891],
      zoom: 10,
      roam: true,
      mapStyle: {
        // 百度地图自定义样式
        styleJson: [
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              color: '#001255ff'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#ffffffff'
            }
          },
          {
            featureType: 'subwaystation',
            elementType: 'geometry',
            stylers: {
              color: '#ffffffff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#ffffffff'
            }
          }
        ]
      }
    },
    tooltip: {
      alwaysShowContent: false,
      enterable: true,
      formatter: function(params) {
        var value = params.value
        return params.name + ': ' + value[2]
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: mapValue(metadata),
        symbolSize: 8
      }
    ]
  }

  return options
}
