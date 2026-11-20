export const CATEGORIES = [
 {slug:'fitness',name:'健身训练',en:'FITNESS',short:'健身',image:'/assets/cat-fitness.png',desc:'超越每一次极限，塑造更强大的自己。',menu:['哑铃与杠铃','力量训练','瑜伽与恢复','训练护具']},
 {slug:'badminton',name:'羽毛球',en:'BADMINTON',short:'羽毛球',image:'/assets/cat-badminton.png',desc:'轻盈操控，速度与精准的完美平衡。',menu:['羽毛球拍','羽毛球','拍线与握把','球包']},
 {slug:'volleyball',name:'排球',en:'VOLLEYBALL',short:'排球',image:'/assets/cat-volleyball.png',desc:'每一次起跳，都为突破而来。',menu:['专业排球','训练用球','护膝','排球网']},
 {slug:'tennis',name:'网球',en:'TENNIS',short:'网球',image:'/assets/cat-tennis.png',desc:'精准控球，掌握赛场上的每一分。',menu:['网球拍','网球','拍线','球包']},
 {slug:'table-tennis',name:'乒乓球',en:'TABLE TENNIS',short:'乒乓球',image:'/assets/cat-table-tennis.png',desc:'旋转与速度之间，尽显技术锋芒。',menu:['乒乓球拍','胶皮','乒乓球','训练配件']},
 {slug:'football',name:'足球',en:'FOOTBALL',short:'足球',image:'/assets/cat-football.png',desc:'为热爱奔跑，为下一场胜利蓄势。',menu:['比赛用球','足球鞋','训练器材','护具']},
 {slug:'basketball',name:'篮球',en:'BASKETBALL',short:'篮球',image:'/assets/cat-basketball-cat.png',desc:'从街头到球场，把每一球打出态度。',menu:['专业篮球','训练篮球','护具','训练配件']},
 {slug:'accessories',name:'运动配件',en:'ACCESSORIES',short:'配件',image:'/assets/cat-accessories.png',desc:'每一个细节，都值得认真对待。',menu:['运动包','水壶','运动袜','日常配件']}
];
const p=(id,name,english,category,price,image,description,options={})=>({id,slug:id,name,english,category,price,image,description,stock:options.stock??18,badge:options.badge||'',oldPrice:options.oldPrice||null,featured:!!options.featured,rating:options.rating||4.9,colors:options.colors||['经典配色'],specs:options.specs||{},material:options.material||'专业运动级复合材料',tech:options.tech||'平衡设计 · 稳定表现'});
export const PRODUCTS=[
 p('aero-9000','AERO 9000 专业羽毛球拍','AERO 9000 RACKET','badminton',1299,'/assets/product-racket.png','轻量碳素拍框与精准平衡设计，为快速连续进攻而生。',{badge:'新品',featured:true,colors:['深海蓝','曜石黑'],specs:{重量:'4U / 约 83g',拍框:'高模量碳纤维',平衡:'均衡型',适合:'中高级球员'}}),
 p('aero-7000','AERO 7000 全能羽毛球拍','AERO 7000 RACKET','badminton',899,'/assets/product-racket.png','面向攻守兼备的球员，兼顾挥速与击球稳定性。',{featured:true,colors:['深蓝','银灰'],specs:{重量:'4U / 约 83g',拍框:'碳纤维复合',拍杆:'中等硬度'}}),
 p('flight-pro','FLIGHT PRO 训练羽毛球','FLIGHT PRO SHUTTLE','badminton',129,'/assets/cat-badminton.png','标准飞行轨迹，适用于日常训练与俱乐部运动。',{badge:'热销',specs:{规格:'12 只装',材质:'复合羽毛'}}),
 p('strength-40','STRENGTH 可调节哑铃套装','ADJUSTABLE DUMBBELL SET','fitness',899,'/assets/product-dumbbell.png','模块化配重设计，适合家庭力量训练与渐进式负重。',{badge:'热销',featured:true,oldPrice:1099,specs:{重量:'40kg 套装',材质:'精钢配重',握把:'防滑纹理'}}),
 p('strength-20','STRENGTH 20KG 哑铃','HOME DUMBBELL','fitness',499,'/assets/product-dumbbell.png','紧凑的家用自由重量训练装备。',{specs:{重量:'20kg 套装',材质:'钢芯配重'}}),
 p('core-band','CORE 弹力训练带套装','RESISTANCE KIT','fitness',159,'/assets/cat-fitness.png','支持热身、激活、辅助训练及动作恢复。',{badge:'新品',specs:{阻力:'多档组合',配件:'收纳袋'}}),
 p('v-force','V-FORCE 比赛排球','V-FORCE MATCH VOLLEYBALL','volleyball',259,'/assets/cat-volleyball.png','稳定的空中轨迹与柔和触感，专为高强度对抗设计。',{badge:'热销',featured:true,specs:{规格:'5 号标准球',外层:'复合皮革'}}),
 p('v-practice','V-PRACTICE 训练排球','TRAINING VOLLEYBALL','volleyball',179,'/assets/cat-volleyball.png','耐用耐磨，适合日常教学与团队训练。',{specs:{规格:'5 号',用途:'训练'}}),
 p('v-knee','V-GUARD 排球护膝','VOLLEYBALL KNEE PADS','volleyball',119,'/assets/cat-volleyball.png','加强缓震保护，让每一次救球更从容。',{specs:{尺码:'S / M / L',面料:'弹性透气织物'}}),
 p('tour-98','TOUR 98 专业网球拍','TOUR 98 TENNIS RACKET','tennis',1099,'/assets/product-racket.png','精准控制与稳定回馈，适用于追求手感的进阶球员。',{badge:'新品',featured:true,specs:{拍面:'98 sq in',重量:'305g (未穿线)',材质:'石墨复合'}}),
 p('tour-100','TOUR 100 网球拍','TOUR 100 RACKET','tennis',799,'/assets/product-racket.png','更大的甜区，为快速对抗带来更高容错空间。',{specs:{拍面:'100 sq in',重量:'290g'}}),
 p('ace-tennis','ACE 高弹网球','ACE TENNIS BALLS','tennis',79,'/assets/cat-tennis.png','稳定弹跳与清晰击球反馈。',{specs:{规格:'3 球装',用途:'训练 / 比赛'}}),
 p('spin-pro','SPIN PRO 乒乓球拍','SPIN PRO TABLE TENNIS','table-tennis',399,'/assets/cat-table-tennis.png','偏重旋转与控球的均衡型球拍。',{badge:'新品',featured:true,specs:{类型:'双面反胶',手柄:'横拍 FL'}}),
 p('spin-lite','SPIN LITE 入门乒乓球拍','SPIN LITE PADDLE','table-tennis',189,'/assets/cat-table-tennis.png','手感直接，帮助建立稳定的基础技术。',{specs:{类型:'双面反胶',手柄:'横拍'}}),
 p('rally-balls','RALLY 训练乒乓球','RALLY BALLS','table-tennis',49,'/assets/cat-table-tennis.png','适合多球训练的高耐用度乒乓球。',{specs:{规格:'40+ / 6 只装'}}),
 p('match-fg','SPEEDX FG 专业足球鞋','SPEEDX FG FOOTBALL BOOT','football',699,'/assets/product-football-boot.png','轻盈贴合，抓地迅猛，为快速变向和冲刺设计。',{badge:'推荐',featured:true,colors:['冰川白 / 深蓝','曜石黑'],specs:{鞋底:'FG 硬质天然草',鞋面:'合成纤维',尺码:'39–45'}}),
 p('match-ball','MATCH PRO 足球','MATCH PRO FOOTBALL','football',269,'/assets/cat-football.png','稳定球体结构与柔韧触感。',{featured:true,specs:{规格:'5 号标准球',结构:'机缝复合'}}),
 p('academy-ball','ACADEMY 训练足球','ACADEMY FOOTBALL','football',169,'/assets/cat-football.png','适用于学校、俱乐部与日常训练。',{specs:{规格:'4 / 5 号'}}),
 p('elite-basketball','ELITE PRO 7号篮球','ELITE PRO BASKETBALL','basketball',329,'/assets/product-basketball.png','高摩擦颗粒表皮与深沟槽设计，运控触感稳定。',{badge:'热销',featured:true,specs:{规格:'7 号',场地:'室内 / 室外',材质:'复合皮革'}}),
 p('street-basketball','STREET 7号篮球','STREET BASKETBALL','basketball',229,'/assets/cat-basketball-cat.png','专为街头场地优化，兼顾耐磨和良好抓握感。',{specs:{规格:'7 号',场地:'室外'}}),
 p('junior-basketball','JUNIOR 5号训练篮球','JUNIOR BASKETBALL','basketball',169,'/assets/cat-basketball-cat.png','适合青少年日常练习的轻量设计。',{specs:{规格:'5 号'}}),
 p('transit-bag','TRANSIT 运动装备包','TRANSIT SPORT BAG','accessories',299,'/assets/cat-accessories.png','独立分仓与耐磨面料，让训练装备各归其位。',{badge:'新品',featured:true,colors:['深海蓝','黑色'],specs:{容量:'35 L',面料:'防泼水聚酯纤维'}}),
 p('daily-bag','DAILY 训练收纳包','DAILY GEAR BAG','accessories',199,'/assets/cat-accessories.png','简洁可靠的每日训练收纳方案。',{specs:{容量:'22 L'}}),
 p('grip-tape','GRIP PRO 防滑握把带','GRIP PRO TAPE','accessories',39,'/assets/cat-accessories.png','细腻触感与稳定抓握表现。',{specs:{规格:'3 条装',材质:'吸汗复合材料'}})
];
export const getProduct = slug=>PRODUCTS.find(p=>p.slug===slug);
export const getCategory = slug=>CATEGORIES.find(c=>c.slug===slug);
export const money = n => `¥${Number(n||0).toLocaleString('zh-CN',{maximumFractionDigits:2})}`;
