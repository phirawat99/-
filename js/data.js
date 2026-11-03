// ข้อมูลภาพยนตร์สยองขวัญจำลอง (Horror Movies Database) - โปสเตอร์แท้ + ลิงก์ดูหนังและตัวอย่าง
const TMDB_IMG = "https://image.tmdb.org/t/p";

const horrorMovies = [
  {
    id: "tee-yod",
    titleTh: "ธี่หยด (Death Whisperer)",
    titleEn: "Death Whisperer",
    year: 2023,
    duration: "121 นาที",
    director: "ทวีวัฒน์ วันทา",
    category: "thai",
    categoryLabel: "ผีไทย / ไสยศาสตร์",
    poster: `${TMDB_IMG}/w780/48TDjSJpCdJ4SBOHZX3G5IjaV02.jpg`,
    backdrop: `${TMDB_IMG}/w1280/55hRgXkbvHoc9dL58S9HAGyxmZt.jpg`,
    tagline: "เสียงเพรียกสยองยามค่ำคืน... ได้ยินแล้วอย่าทัก!",
    synopsis: "เรื่องราวสุดสะพรึงในอดีต ณ หมู่บ้านห่างไกล เมื่อน้องสาวในครอบครัวเริ่มมีพฤติกรรมผิดปกติหลังจากได้ยินเสียงพึมพำแปลกๆ 'ธี่หยด...' ความสยองขวัญจากไสยศาสตร์โบราณที่พร้อมจะกลืนกินทุกคนในบ้าน",
    trailerEmbed: "https://www.youtube.com/embed/ArZfDU6tAtc?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=ArZfDU6tAtc",
    watchPlatforms: [
      { name: "Netflix", url: "https://www.netflix.com/search?q=Death+Whisperer", icon: "fa-solid fa-play" },
      { name: "TrueID", url: "https://movie.trueid.net/th-th/search?q=ธี่หยด", icon: "fa-solid fa-tv" }
    ],
    ratings: {
      overall: 8.8,
      spookiness: 9.0,
      jumpScare: 9.5,
      gore: 7.5,
      story: 8.0
    },
    warnings: ["Jump Scare ถี่และเสียงดังมาก", "มีฉากกระชากไส้และเลือด", "เสียงกระซิบชวนหลอนประสาท"],
    highlight: "แอ็กชันปะทะผีสไตล์พี่ณเดชน์สุดมันส์ Jump Scare หนักหน่วงสะใจคนชอบตกใจ",
    verdict: "หนังผีไทยยุคใหม่ที่ยกระดับความบันเทิง ผสมความหลอนโบราณกับแอ็กชันเดือดๆ ได้อย่างลงตัว ไม่เหมาะกับคนเป็นโรคหัวใจ!",
    userReviews: [
      { author: "คนกลัวผีแต่ชอบดู", rating: 9, comment: "เสียงธี่หยดติดหูไปหลายวัน ปิดไฟนอนไม่ได้เลย!", date: "2 วันที่แล้ว" },
      { author: "เซียนหนังสยอง", rating: 8, comment: "จังหวะ Jump Scare กระแทกหน้ามาก ณเดชน์แบกเรื่องดีสุดๆ", date: "1 สัปดาห์ที่แล้ว" }
    ]
  },
  {
    id: "shutter",
    titleTh: "ชัตเตอร์ กดติดวิญญาณ",
    titleEn: "Shutter",
    year: 2004,
    duration: "97 นาที",
    director: "บรรจง ปิสัญธนะกูล, ภาคภูมิ วงศ์ภูมิ",
    category: "thai",
    categoryLabel: "ผีไทย / หลอนจิตตก",
    poster: `${TMDB_IMG}/w780/7Tq7SrB14r3WpjJQOldbDHQk89J.jpg`,
    backdrop: `${TMDB_IMG}/w1280/cX48taTcXP2oGXPvka8QFa4f4Qb.jpg`,
    tagline: "ภาพบางภาพ... ซ่อนความตายที่คุณมองไม่เห็น",
    synopsis: "ธรรม์ ช่างภาพหนุ่มกับเจน แฟนสาว ขับรถชนผู้หญิงคนหนึ่งแล้วหลบหนี หลังจากนั้นธรรม์เริ่มพบเงาประหลาดบนรูปถ่ายของเขา และเพื่อนร่วมรุ่นก็ทยอยเสียชีวิตอย่างลึกลับทีละคน",
    trailerEmbed: "https://www.youtube.com/embed/y_bVp_e8vQo?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=y_bVp_e8vQo",
    watchPlatforms: [
      { name: "Netflix", url: "https://www.netflix.com/search?q=Shutter", icon: "fa-solid fa-play" },
      { name: "TrueID", url: "https://movie.trueid.net/th-th/search?q=ชัตเตอร์", icon: "fa-solid fa-tv" }
    ],
    ratings: {
      overall: 9.6,
      spookiness: 10.0,
      jumpScare: 8.5,
      gore: 4.0,
      story: 9.8
    },
    warnings: ["ฉากหักมุมสะเทือนอารมณ์", "อาการปวดคอชวนระแวง", "บรรยากาศมืดหม่นกดดัน"],
    highlight: "ฉากเฉลยท้ายเรื่องระดับตำนานที่ติดตาคนดูทั้งประเทศจนถึงทุกวันนี้",
    verdict: "ผลงานระดับ Masterpiece ของหนังผีไทย พล็อตกลมกล่อม ความหลอนระดับสิบกะโหลก ดูจบแล้วระแวงไหล่ตัวเองแน่นอน",
    userReviews: [
      { author: "แฟนพันธุ์แท้หนังผี", rating: 10, comment: "ดูซ้ำกี่รอบก็ยังขนลุก ฉากสุดท้ายคือที่สุดของประวัติศาสตร์หนังไทย", date: "3 วันที่แล้ว" }
    ]
  },
  {
    id: "the-medium",
    titleTh: "ร่างทรง",
    titleEn: "The Medium",
    year: 2021,
    duration: "130 นาที",
    director: "บรรจง ปิสัญธนะกูล",
    category: "found-footage",
    categoryLabel: "Found Footage / พิธีกรรม",
    poster: `${TMDB_IMG}/w780/wOJbWVMqdKIerkvOegeHfORxWqV.jpg`,
    backdrop: `${TMDB_IMG}/w1280/iwCti1LGupsMjCzuhaccUA4OZfo.jpg`,
    tagline: "เมื่อศรัทธา... ถูกท้าทายด้วยความชั่วร้ายสุดขั้ว",
    synopsis: "ทีมงานสารคดีตามติดชีวิตของ 'ป้านิ่ม' ร่างทรงย่าบาหยันแห่งแดนอีสาน แต่แล้วหลานสาวอย่าง 'มิ้ง' เริ่มมีพฤติกรรมก้าวร้าว ผิดมนุษย์ นำไปสู่การค้นหาความจริงที่ดำมืดเกินกว่าจะรับมือได้",
    trailerEmbed: "https://www.youtube.com/embed/Eq10a90g9mU?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=Eq10a90g9mU",
    watchPlatforms: [
      { name: "Netflix", url: "https://www.netflix.com/search?q=The+Medium", icon: "fa-solid fa-play" }
    ],
    ratings: {
      overall: 8.9,
      spookiness: 9.2,
      jumpScare: 7.8,
      gore: 9.0,
      story: 8.5
    },
    warnings: ["มีฉากทารุณสัตว์และคน", "พฤติกรรมก้าวร้าวทางเพศและศีลธรรม", "ฉากไคลแม็กซ์โกลาหล ชวนคลื่นไส้"],
    highlight: "การแสดงขั้นเทพของ 'ญดา นริลญา' ที่เปลี่ยนสภาพจากหญิงสาวสู่ร่างปีศาจได้อย่างน่าขนลุก",
    verdict: "งานภาพสไตล์สารคดีปลอมที่บีบคั้นอารมณ์ ครึ่งหลังระเบิดความวิปลาสแบบจัดเต็ม ใครใจไม่แข็งพออย่าดูคนเดียวเด็ดขาด",
    userReviews: [
      { author: "คอหนังสายดาร์ก", rating: 9, comment: "ครึ่งหลังคือบ้าคลั่งมาก อึดอัด หายใจไม่ทั่วท้อง แต่ชอบความสมจริง", date: "5 วันที่แล้ว" }
    ]
  },
  {
    id: "hereditary",
    titleTh: "กรรมพันธุ์นรก",
    titleEn: "Hereditary",
    year: 2018,
    duration: "127 นาที",
    director: "Ari Aster",
    category: "psychological",
    categoryLabel: "จิตวิทยาสยองขวัญ / ลัทธิ",
    poster: `${TMDB_IMG}/w780/4GFPuL14eXi66V96xBWY73Y9PfR.jpg`,
    backdrop: `${TMDB_IMG}/w1280/pS9Aub8MPyQbENblGD8mHeaqMuv.jpg`,
    tagline: "บางมรดกตกทอด... ปฏิเสธไม่ได้ และหนีไม่พ้น",
    synopsis: "หลังจากคุณยายผู้ลึกลับเสียชีวิต ครอบครัวเกรแฮมเริ่มค้นพบความลับอันดำมืดและน่าสะพรึงกลัวเกี่ยวกับสายเลือดของพวกเขา ยิ่งพยายามหนี ก็ยิ่งถลำลึกสู่ชะตากรรมที่หลีกเลี่ยงไม่ได้",
    trailerEmbed: "https://www.youtube.com/embed/V6wWKNij_1M?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=V6wWKNij_1M",
    watchPlatforms: [
      { name: "Apple TV", url: "https://tv.apple.com/th/movie/hereditary/umc.cmc.2m26t0e7bovv6z9a8z66n03h0", icon: "fa-brands fa-apple" },
      { name: "Prime Video", url: "https://www.primevideo.com", icon: "fa-brands fa-amazon" }
    ],
    ratings: {
      overall: 9.4,
      spookiness: 9.8,
      jumpScare: 6.0,
      gore: 8.2,
      story: 9.6
    },
    warnings: ["ฉากอุบัติเหตุสะเทือนขวัญติดตา", "เสียงเดาะลิ้นชวนผวา", "ความกดดันทางจิตใจและครอบครัวแตกสลาย"],
    highlight: "ไม่พึ่งพา Jump Scare เกลื่อนกลาด แต่ใช้บรรยากาศกดดันจนคนดูแทบขาดใจตายช้าๆ",
    verdict: "หนึ่งในหนังสยองขวัญจิตวิทยาที่ดีที่สุดในรอบ 20 ปี ลึกซึ้ง น่าสะพรึง และตราตรึงในความมืดไปอีกนาน",
    userReviews: [
      { author: "MovieNerd", rating: 10, comment: "ฉากในรถทำผมอ้าปากค้างไป 10 นาที เป็นความเงียบที่กรีดร้องที่สุด", date: "1 เดือนที่แล้ว" }
    ]
  },
  {
    id: "the-conjuring",
    titleTh: "คนเรียกผี",
    titleEn: "The Conjuring",
    year: 2013,
    duration: "112 นาที",
    director: "James Wan",
    category: "western",
    categoryLabel: "สากล / บ้านผีสิง / ปราบผี",
    poster: `${TMDB_IMG}/w780/wVYREutTvI2tmxr6ujrHT704wGF.jpg`,
    backdrop: `${TMDB_IMG}/w1280/ecKQlAEG95k62SMGhvX83oEqANK.jpg`,
    tagline: "สร้างจากแฟ้มคดีจริงของสองสามีภรรยานักปราบผี วอร์เรน",
    synopsis: "ครอบครัวเพอร์รอนย้ายเข้าสู่บ้านไร่ชนบทอันเงียบสงบ แต่กลับถูกคุกคามด้วยพลังงานชั่วร้ายจนต้องขอความช่วยเหลือจาก เอ็ด และ ลอร์เรน วอร์เรน ผู้เชี่ยวชาญด้านปรากฏการณ์เหนือธรรมชาติ",
    trailerEmbed: "https://www.youtube.com/embed/k10ETZ41q5o?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    watchPlatforms: [
      { name: "HBO GO", url: "https://www.hbogo.co.th", icon: "fa-solid fa-play" },
      { name: "Netflix", url: "https://www.netflix.com/search?q=The+Conjuring", icon: "fa-solid fa-film" }
    ],
    ratings: {
      overall: 9.1,
      spookiness: 9.0,
      jumpScare: 8.8,
      gore: 3.5,
      story: 8.7
    },
    warnings: ["การเล่นเกมตบมือซ่อนหาในความมืด", "เสียงดนตรีเร้าอารมณ์บีบหัวใจ", "ฉากผีโผล่ระยะประชิด"],
    highlight: "ฉากเกมซ่อนหา Clap Game จุดไฟแช็กในห้องใต้ดินที่ขึ้นหิ้งความระทึกขวัญระดับโลก",
    verdict: "งานกำกับระดับครูของ เจมส์ วาน ที่เชี่ยวชาญการปั่นหัวคนดู จังหวะตกใจแม่นยำและลุ้นระทึกตั้งแต่ต้นจนจบ",
    userReviews: [
      { author: "กุ๊กกู๋", rating: 9, comment: "เสียงตบมือสองแปะ แปะ... ขนลุกซู่! ดูกี่ทีก็สะดุ้งทุกรอบ", date: "2 สัปดาห์ที่แล้ว" }
    ]
  },
  {
    id: "incantation",
    titleTh: "มนตรา",
    titleEn: "Incantation",
    year: 2022,
    duration: "110 นาที",
    director: "Kevin Ko",
    category: "found-footage",
    categoryLabel: "ผีเอเชีย / คำสาปไต้หวัน",
    poster: `${TMDB_IMG}/w780/cWz28oGV3cSajWdziVQbqrYCmnX.jpg`,
    backdrop: `${TMDB_IMG}/w1280/vqEX1uF3Spl12rOACQ3gJ6j4MSR.jpg`,
    tagline: "ยิ่งคนท่องคาถามากเท่าไร... คำสาปยิ่งกระจายออกไป",
    synopsis: "หญิงสาวคนหนึ่งอัดคลิปวิดีโอขอร้องให้ผู้ชมช่วยกันสวดมนต์และทำสัญลักษณ์มือ เพื่อช่วยชีวิตลูกสาวของเธอจากคำสาปโบราณที่เธอเคยไปล่วงเกินเข้าเมื่อ 6 ปีก่อน",
    trailerEmbed: "https://www.youtube.com/embed/HnyNZdcL_GY?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=HnyNZdcL_GY",
    watchPlatforms: [
      { name: "Netflix", url: "https://www.netflix.com/title/81599888", icon: "fa-solid fa-play" }
    ],
    ratings: {
      overall: 8.7,
      spookiness: 9.5,
      jumpScare: 7.0,
      gore: 6.5,
      story: 8.4
    },
    warnings: ["ภาพชวนเวียนหัว (Found footage)", "การสะกดจิตคนดูผ่านหน้าจอ", "ฉาก trypophobia รูพรุนชวนขนลุก"],
    highlight: "การเล่นกับคนดูโดยตรง ชวนให้เราเป็นส่วนหนึ่งของพิธีกรรมต้องห้าม",
    verdict: "หนังที่ทำให้เรารู้สึกผิดที่เปิดดู! การเล่าเรื่องแหวกแนวและทิ้งความรู้สึกอัปมงคลติดตัวหลังดูจบได้อย่างน่าทึ่ง",
    userReviews: [
      { author: "อย่าสวดตาม", rating: 9, comment: "ดูจบไม่กล้าทำมือตามเลย กลัวคำสาปตกถึงตัวจริง หลอนมาก", date: "3 วันที่แล้ว" }
    ]
  },
  {
    id: "talk-to-me",
    titleTh: "จับ มือ ผี",
    titleEn: "Talk to Me",
    year: 2023,
    duration: "95 นาที",
    director: "Danny Philippou, Michael Philippou",
    category: "western",
    categoryLabel: "สากล / วัยรุ่นลองดี",
    poster: `${TMDB_IMG}/w780/kdPMUMJzyYAc4roD52qavX0nLIC.jpg`,
    backdrop: `${TMDB_IMG}/w1280/46Os8U0DEPmI0OnvKDxucl6SLVZ.jpg`,
    tagline: "กฎข้อเดียว: อย่าจับมือผีเกิน 90 วินาที ไม่งั้นพวกมันจะไม่ยอมไป",
    synopsis: "กลุ่มวัยรุ่นค้นพบวิธีเรียกวิญญาณโดยใช้ 'มืออาบน้ำยาเซรามิก' เพียงจับมือแล้วพูดว่า Talk to me พวกเขาจะได้สัมผัสวิญญาณอย่างเมามันส์ จนกระทั่งมีคนละเมิดกฎเวลา!",
    trailerEmbed: "https://www.youtube.com/embed/aLAKJu9aJys?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=aLAKJu9aJys",
    watchPlatforms: [
      { name: "Netflix", url: "https://www.netflix.com/search?q=Talk+to+Me", icon: "fa-solid fa-play" },
      { name: "Prime Video", url: "https://www.primevideo.com", icon: "fa-brands fa-amazon" }
    ],
    ratings: {
      overall: 8.9,
      spookiness: 8.7,
      jumpScare: 8.2,
      gore: 8.0,
      story: 8.8
    },
    warnings: ["ฉากทำร้ายตัวเองรุนแรงมาก", "ประเด็นยาเสพติดและบาดแผลทางใจ", "วิญญาณสภาพสยดสยอง"],
    highlight: "คอนเซปต์สดใหม่ เปรียบเทียบการสื่อสารกับผีเหมือนการเสพยาของวัยรุ่นยุคโซเชียล",
    verdict: "หนังสยองขวัญยุคใหม่จากค่าย A24 ที่ทั้งเร็ว แรง สยอง และสะเทือนอารมณ์ คอหนังสยองไม่ควรพลาด",
    userReviews: [
      { author: "TeenGhost", rating: 9, comment: "ฉากเอาหัวโขกโต๊ะคือทำเอาปิดตาเลย โหดและเร็วมาก!", date: "6 วันที่แล้ว" }
    ]
  },
  {
    id: "scream",
    titleTh: "หวีดสุดขีด (Slasher Classic)",
    titleEn: "Scream",
    year: 1996,
    duration: "111 นาที",
    director: "Wes Craven",
    category: "slasher",
    categoryLabel: "สแลชเชอร์ / ฆาตกรหน้ากากผี",
    poster: `${TMDB_IMG}/w780/lr9ZIrmuwVmZhpZuTCW8D9g0ZJe.jpg`,
    backdrop: `${TMDB_IMG}/w1280/4w6nQYAY0eb7B0VVRDXilXcgAUV.jpg`,
    tagline: "Whats your favorite scary movie? หนังผีเรื่องโปรดของคุณคือเรื่องอะไร?",
    synopsis: "ฆาตกรลึกลับในหน้ากาก Ghostface ออกไล่ล่ากลุ่มวัยรุ่นในเมืองวูดส์โบโร โดยใช้ความรู้เรื่องกฎของหนังสยองขวัญมาเล่นงานเหยื่อทีละคน",
    trailerEmbed: "https://www.youtube.com/embed/AWm_mkbdpCA?autoplay=1",
    trailerUrl: "https://www.youtube.com/watch?v=AWm_mkbdpCA",
    watchPlatforms: [
      { name: "HBO GO", url: "https://www.hbogo.co.th", icon: "fa-solid fa-play" },
      { name: "Apple TV", url: "https://tv.apple.com/th/movie/scream/umc.cmc.14g09j4k5j9n7z8v1g7m4r0f1", icon: "fa-brands fa-apple" }
    ],
    ratings: {
      overall: 9.0,
      spookiness: 7.5,
      jumpScare: 8.5,
      gore: 8.5,
      story: 9.2
    },
    warnings: ["ฉากแทงด้วยมีดและเลือดท่วม", "ความรุนแรงระดับเรต R", "ความระแวงคนใกล้ตัว"],
    highlight: "เปิดเรื่อง 12 นาทีแรกกับฉากโทรศัพท์ของดรูว์ แบร์รีมอร์ ที่เป็นตำนานภาพยนตร์โลก",
    verdict: "ต้นตำรับหนังเชือดที่ล้อเลียนขนบหนังผีได้อย่างฉลาดหลักแหลม สนุก ลุ้นตัวโก่ง และมีเสน่ห์เหนือกาลเวลา",
    userReviews: [
      { author: "Ghostface Fan", rating: 9, comment: "คลาสสิกตลอดกาล หน้ากากผีหวีดคือสัญลักษณ์ฮาโลวีนที่ไม่มีวันตาย", date: "4 วันที่แล้ว" }
    ]
  }
];

// ข้อความสุ่มเมื่อกด "วงล้อสุ่มหนังผี" ตามระดับความกล้า
const braveryLevels = {
  1: {
    title: "ระดับ 1: มือใหม่ขวัญอ่อน (Baby Ghost)",
    desc: "เน้นเนื้อเรื่องสนุก ไม่แหวะ ไม่จัมป์สแกร์รุนแรงจนหัวใจวาย",
    recommendId: "scream"
  },
  2: {
    title: "ระดับ 2: คอหนังผีตัวจริง (Horror Seeker)",
    desc: "ชอบความระทึกขวัญ บรรยากาศหลอนๆ ตกใจสะดุ้งตัวลอย",
    recommendId: "the-conjuring"
  },
  3: {
    title: "ระดับ 3: สายจิตแข็งไร้ความกลัว (Hardcore Soul)",
    desc: "หลอนจนจิตตก ภาพติดตา ปิดไฟนอนไม่ได้ไปเป็นเดือน!",
    recommendId: "shutter"
  }
};
