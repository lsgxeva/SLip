/* Part of DynarchLIB
   Copyright (c) Dynarch.com 2005-2009.  All rights reserved.
   See http://www.dynarchlib.com/licensing for details.

//--
// Based on a C implementation of the AES algorithm found in the
// Crypt::Rijndael Perl module.
//
//    http://search.cpan.org/~bdfoy/Crypt-Rijndael-1.05/
//    http://search.cpan.org/src/BDFOY/Crypt-Rijndael-1.05/_rijndael.c
//
// Original C code is Copyright 2000, 2001 Rafael R. Sevilla <sevillar@team.ph.inter.net>
// The Perl module is currently maintained by brian d foy, <bdfoy@cpan.org>
//
// Great work guys!
//
// The Original C code is distributed under the GNU LGPL, version 2.0 or later.
//
// Written in JavaScript for DynarchLIB by Mihai Bazon.
//--

*/DEFINE_CLASS("DlCryptAES",null,function(a,b){function n(a){return a>>>8|(a&255)<<24}function o(a){return a<<8|a>>>24&255}function p(a,b){return b[a&255]|b[a>>>8&255]<<8|b[a>>>16&255]<<16|b[a>>>24&255]<<24}function q(a){var b=a&128?27:0;return a<<=1,a^=b,a}function r(a,b){return a&&b?f[(e[a]+e[b])%255]:0}function s(a,b,c){var d,e,f=[[],[],[],[]];for(e=0;e<4;++e)for(d=0;d<4;++d)f[e][d]=r(14,a[e+c]>>>(d<<3)&255)^r(11,a[e+c]>>>((d+1&3)<<3)&255)^r(13,a[e+c]>>>((d+2&3)<<3)&255)^r(9,a[e+c]>>>((d+3&3)<<3)&255);for(d=0;d<4;++d){b[d+c]=0;for(e=0;e<4;++e)b[d+c]|=f[d][e]<<(e<<3)}}function t(a){var b,c=[],d=a.length/4;for(b=0;b<d;++b)c[b]=a[b<<2]|a[(b<<2)+1]<<8|a[(b<<2)+2]<<16|a[(b<<2)+3]<<24;return c}function u(a){var b,c,d=a.length,e=Array(d*4),f=0;for(c=0;c<d;++c)b=a[c],e[f++]=b&255,e[f++]=b>>>8&255,e[f++]=b>>>16&255,e[f++]=b>>>24&255;return e}function v(a){var b,d,e,f=t(a),g=a.length/4,h=1,i=l[a.length]/4;for(b=g;b<i;++b)d=f[b-1],b%g==0?(d=p(n(d),c)^h,h=q(h)&255):g>6&&b%g==4&&(d=p(d,c)),f[b]=f[b-g]^d;e=[];for(b=0;b<4;++b)e[b]=f[b],e[i-4+b]=f[i-4+b];for(b=4;b<i-4;b+=4)s(f,e,b);this._exk=f,this._rexk=e}function w(a,b,c,d){var e;d<<=2;for(e=4;--e>=0;)b[e]=a[e]^c[d|e]}function x(a){var b,d,e,f=this._exk,h=this._rounds;a=t(a),w(a,a,f,0),d=[];for(e=1;e<h;++e){for(b=0;b<4;++b)d[b]=g[a[b]&255]^o(g[a[i[1][b]]>>>8&255]^o(g[a[i[2][b]]>>>16&255]^o(g[a[i[3][b]]>>>24&255])));w(d,a,f,e)}for(b=0;b<4;++b)d[b]=p(a[b]&255|a[i[1][b]]&65280|a[i[2][b]]&16711680|a[i[3][b]]&4278190080,c);return w(d,a,f,h),u(a)}function y(a){var b,c,e,f=this._rexk,g=this._rounds;a=t(a),w(a,a,f,g),c=[];for(e=g;--e>0;){for(b=0;b<4;++b)c[b]=h[a[b]&255]^o(h[a[j[1][b]]>>>8&255]^o(h[a[j[2][b]]>>>16&255]^o(h[a[j[3][b]]>>>24&255])));w(c,a,f,e)}for(b=0;b<4;++b)c[b]=p(a[b]&255|a[j[1][b]]&65280|a[j[2][b]]&16711680|a[j[3][b]]&4278190080,d);return w(c,a,f,0),u(a)}function z(a,b){var c,d,e;b=b?y:x,c=[];for(d=0;d<a.length;d+=16)e=a.slice(d,d+16),e=b.call(this,e),c.push.apply(c,e);return c}function A(a){return z.call(this,a,!1)}function B(a){return z.call(this,a,!0)}function C(a){var b,c,d,e=this._iv.slice(0),f=[],g=a.length;for(b=0;b<g;b+=16){d=e.slice(0),d=x.call(this,d);for(c=16;--c>=0&&!(e[c]=e[c]+1&255););for(c=16;--c>=0;)f[c+b]=d[c]^a[c+b]}return f}function D(a){var b,c,d=this._iv.slice(0),e=[],f=a.length;for(b=0;b<f;b+=16){for(c=16;--c>=0;)d[c]^=a[c+b];d=x.call(this,d);for(c=16;--c>=0;)e[c+b]=d[c]}return e}function E(a){var b,c,d=a.slice(0,16),e=[],f=a.length;d=y.call(this,d);for(c=16;--c>=0;)e[c]=d[c]^this._iv[c];for(b=16;b<f;b+=16){d=a.slice(b,b+16),d=y.call(this,d);for(c=16;--c>=0;)e[c+b]=d[c]^a[b-16+c]}return e}function F(a){var b,c,d=this._iv.slice(0),e=[],f=a.length;for(b=0;b<f;b+=16){d=x.call(this,d);for(c=16;--c>=0;)d[c]^=a[c+b];e.push.apply(e,d)}return e}function G(a){var b,c,d=this._iv.slice(0),e=[],f=a.length;for(b=0;b<f;b+=16){d=x.call(this,d);for(c=16;--c>=0;)e[c+b]=d[c]^a[c+b];d=a.slice(b,b+16)}return e}function H(a){var b,c,d=this._iv.slice(0),e=[],f=a.length;for(b=0;b<f;b+=16){d=x.call(this,d);for(c=16;--c>=0;)e[c+b]=d[c]^a[c+b]}return e}var c,d,e,f,g,h,i,j,k,l,m;a.DEFAULT_ARGS={_key:["key",null],_mode:["mode","ECB"],_iv:["iv",null]},a.CONSTRUCT=function(){v.call(this,this._key),this._mode=m[this._mode.toUpperCase()],this._rounds=k[this._key.length],this._iv||(this._iv=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])},c=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],d=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],e=[0,0,25,1,50,2,26,198,75,199,27,104,51,238,223,3,100,4,224,14,52,141,129,239,76,113,8,200,248,105,28,193,125,194,29,181,249,185,39,106,77,228,166,114,154,201,9,120,101,47,138,5,33,15,225,36,18,240,130,69,53,147,218,142,150,143,219,189,54,208,206,148,19,92,210,241,64,70,131,56,102,221,253,48,191,6,139,98,179,37,226,152,34,136,145,16,126,110,72,195,163,182,30,66,58,107,40,84,250,133,61,186,43,121,10,21,155,159,94,202,78,212,172,229,243,115,167,87,175,88,168,80,244,234,214,116,79,174,233,213,231,230,173,232,44,215,117,122,235,22,11,245,89,203,95,176,156,169,81,160,127,12,246,111,23,196,73,236,216,67,31,45,164,118,123,183,204,187,62,90,251,96,177,134,59,82,161,108,170,85,41,157,151,178,135,144,97,190,220,252,188,149,207,205,55,63,91,209,83,57,132,60,65,162,109,71,20,42,158,93,86,242,211,171,68,17,146,217,35,32,46,137,180,124,184,38,119,153,227,165,103,74,237,222,197,49,254,24,13,99,140,128,192,247,112,7],f=[1,3,5,15,17,51,85,255,26,46,114,150,161,248,19,53,95,225,56,72,216,115,149,164,247,2,6,10,30,34,102,170,229,52,92,228,55,89,235,38,106,190,217,112,144,171,230,49,83,245,4,12,20,60,68,204,79,209,104,184,211,110,178,205,76,212,103,169,224,59,77,215,98,166,241,8,24,40,120,136,131,158,185,208,107,189,220,127,129,152,179,206,73,219,118,154,181,196,87,249,16,48,80,240,11,29,39,105,187,214,97,163,254,25,43,125,135,146,173,236,47,113,147,174,233,32,96,160,251,22,58,78,210,109,183,194,93,231,50,86,250,21,63,65,195,94,226,61,71,201,64,192,91,237,44,116,156,191,218,117,159,186,213,100,172,239,42,126,130,157,188,223,122,142,137,128,155,182,193,88,232,35,101,175,234,37,111,177,200,67,197,84,252,31,33,99,165,244,7,9,27,45,119,153,176,203,70,202,69,207,74,222,121,139,134,145,168,227,62,66,198,81,243,14,18,54,90,238,41,123,141,140,143,138,133,148,167,242,13,23,57,75,221,124,132,151,162,253,28,36,108,180,199,82,246,1],g=[2774754246,2222750968,2574743534,2373680118,234025727,3177933782,2976870366,1422247313,1345335392,50397442,2842126286,2099981142,436141799,1658312629,3870010189,2591454956,1170918031,2642575903,1086966153,2273148410,368769775,3948501426,3376891790,200339707,3970805057,1742001331,4255294047,3937382213,3214711843,4154762323,2524082916,1539358875,3266819957,486407649,2928907069,1780885068,1513502316,1094664062,49805301,1338821763,1546925160,4104496465,887481809,150073849,2473685474,1943591083,1395732834,1058346282,201589768,1388824469,1696801606,1589887901,672667696,2711000631,251987210,3046808111,151455502,907153956,2608889883,1038279391,652995533,1764173646,3451040383,2675275242,453576978,2659418909,1949051992,773462580,756751158,2993581788,3998898868,4221608027,4132590244,1295727478,1641469623,3467883389,2066295122,1055122397,1898917726,2542044179,4115878822,1758581177,0,753790401,1612718144,536673507,3367088505,3982187446,3194645204,1187761037,3653156455,1262041458,3729410708,3561770136,3898103984,1255133061,1808847035,720367557,3853167183,385612781,3309519750,3612167578,1429418854,2491778321,3477423498,284817897,100794884,2172616702,4031795360,1144798328,3131023141,3819481163,4082192802,4272137053,3225436288,2324664069,2912064063,3164445985,1211644016,83228145,3753688163,3249976951,1977277103,1663115586,806359072,452984805,250868733,1842533055,1288555905,336333848,890442534,804056259,3781124030,2727843637,3427026056,957814574,1472513171,4071073621,2189328124,1195195770,2892260552,3881655738,723065138,2507371494,2690670784,2558624025,3511635870,2145180835,1713513028,2116692564,2878378043,2206763019,3393603212,703524551,3552098411,1007948840,2044649127,3797835452,487262998,1994120109,1004593371,1446130276,1312438900,503974420,3679013266,168166924,1814307912,3831258296,1573044895,1859376061,4021070915,2791465668,2828112185,2761266481,937747667,2339994098,854058965,1137232011,1496790894,3077402074,2358086913,1691735473,3528347292,3769215305,3027004632,4199962284,133494003,636152527,2942657994,2390391540,3920539207,403179536,3585784431,2289596656,1864705354,1915629148,605822008,4054230615,3350508659,1371981463,602466507,2094914977,2624877800,555687742,3712699286,3703422305,2257292045,2240449039,2423288032,1111375484,3300242801,2858837708,3628615824,84083462,32962295,302911004,2741068226,1597322602,4183250862,3501832553,2441512471,1489093017,656219450,3114180135,954327513,335083755,3013122091,856756514,3144247762,1893325225,2307821063,2811532339,3063651117,572399164,2458355477,552200649,1238290055,4283782570,2015897680,2061492133,2408352771,4171342169,2156497161,386731290,3669999461,837215959,3326231172,3093850320,3275833730,2962856233,1999449434,286199582,3417354363,4233385128,3602627437,974525996],h=[1353184337,1399144830,3282310938,2522752826,3412831035,4047871263,2874735276,2466505547,1442459680,4134368941,2440481928,625738485,4242007375,3620416197,2151953702,2409849525,1230680542,1729870373,2551114309,3787521629,41234371,317738113,2744600205,3338261355,3881799427,2510066197,3950669247,3663286933,763608788,3542185048,694804553,1154009486,1787413109,2021232372,1799248025,3715217703,3058688446,397248752,1722556617,3023752829,407560035,2184256229,1613975959,1165972322,3765920945,2226023355,480281086,2485848313,1483229296,436028815,2272059028,3086515026,601060267,3791801202,1468997603,715871590,120122290,63092015,2591802758,2768779219,4068943920,2997206819,3127509762,1552029421,723308426,2461301159,4042393587,2715969870,3455375973,3586000134,526529745,2331944644,2639474228,2689987490,853641733,1978398372,971801355,2867814464,111112542,1360031421,4186579262,1023860118,2919579357,1186850381,3045938321,90031217,1876166148,4279586912,620468249,2548678102,3426959497,2006899047,3175278768,2290845959,945494503,3689859193,1191869601,3910091388,3374220536,0,2206629897,1223502642,2893025566,1316117100,4227796733,1446544655,517320253,658058550,1691946762,564550760,3511966619,976107044,2976320012,266819475,3533106868,2660342555,1338359936,2720062561,1766553434,370807324,179999714,3844776128,1138762300,488053522,185403662,2915535858,3114841645,3366526484,2233069911,1275557295,3151862254,4250959779,2670068215,3170202204,3309004356,880737115,1982415755,3703972811,1761406390,1676797112,3403428311,277177154,1076008723,538035844,2099530373,4164795346,288553390,1839278535,1261411869,4080055004,3964831245,3504587127,1813426987,2579067049,4199060497,577038663,3297574056,440397984,3626794326,4019204898,3343796615,3251714265,4272081548,906744984,3481400742,685669029,646887386,2764025151,3835509292,227702864,2613862250,1648787028,3256061430,3904428176,1593260334,4121936770,3196083615,2090061929,2838353263,3004310991,999926984,2809993232,1852021992,2075868123,158869197,4095236462,28809964,2828685187,1701746150,2129067946,147831841,3873969647,3650873274,3459673930,3557400554,3598495785,2947720241,824393514,815048134,3227951669,935087732,2798289660,2966458592,366520115,1251476721,4158319681,240176511,804688151,2379631990,1303441219,1414376140,3741619940,3820343710,461924940,3089050817,2136040774,82468509,1563790337,1937016826,776014843,1511876531,1389550482,861278441,323475053,2355222426,2047648055,2383738969,2302415851,3995576782,902390199,3991215329,1018251130,1507840668,1064563285,2043548696,3208103795,3939366739,1537932639,342834655,2262516856,2180231114,1053059257,741614648,1598071746,1925389590,203809468,2336832552,1100287487,1895934009,3736275976,2632234200,2428589668,1636092795,1890988757,1952214088,1113045200],i=[[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2]],j=[[0,1,2,3],[3,0,1,2],[2,3,0,1],[1,2,3,0]],k={16:10,24:12,32:14},l={16:176,24:208,32:240},b.encodeBytes=function(a){return this._mode[0].call(this,a)},b.decodeBytes=function(a){return this._mode[1].call(this,a)},b.encodeText=function(a){var b,c;a=a.length+":"+a,b=a.toBytes(),c=b.length%16;while(c++<16)b.push(32);return this.encodeBytes(b)},b.decodeText=function(a){var b=this.decodeBytes(a).bytesToString(),c=b.indexOf(":"),d=parseInt(b.substr(0,c));return b.substr(c+1).substr(0,d)},b.setIV=function(a){this._iv=a},b.getIV=function(){return this._iv},b.setTimestampIV=function(){this.setIV((new Date).getTime().hex(16).hexToBytes().concat([0,0,0,0,0,0,0,0]))},m={ECB:[A,B],CBC:[D,E],CFB:[F,G],OFB:[H,H],CTR:[C,C]}});