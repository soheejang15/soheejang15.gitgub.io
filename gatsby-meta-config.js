module.exports = {
  title: `so_ohi BLOG`,
  description: `so_ohi의 개발 기록`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://soheejang15.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `장소희`,
    bio: {
      role: `프론트엔드 개발자`,
      description: ['세상에 가치를 더하는', '끊임없이 성장하는', '보다 더 나은 것을 추구하는'],
      thumbnail: 'emoji.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/soheejang15`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `jsh167528@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.01 ~ 2022.04',
        activity: '신한은행 ICT운영부 개발플랫폼 선임',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        date: '2020.01 ~ 2020.02',
        activity: 'Aurender 인턴',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        date: '2018.03 ~ 2021.01',
        activity: '대덕소프트웨어마이스터고등학교 SW개발과',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'Entry 5.0 - Admin',
        description:
          '대덕소프트웨어마이스터고등학교 2021년도 입학전형 시스템의 Admin 서비스로, 프론트엔드 개발을 담당하였습니다. 2020년 9월~11월, 약 2개월 간 운영되었으며 신입생 모집 종료 이후 운영이 종료되었습니다.',
        techStack: ['react', 'typescript', 'styled-components', 'redux', 'react-saga'],
        thumbnailUrl: 'entry.png',
        links: {
          post: '',
          github: 'https://github.com/EntryDSM/Papillon',
          demo: '',
        },
      },
      {
        title: 'PET’s PAW',
        description: '농림축산식품부 유기동물 정보 오픈 API를 활용한 공고 조회 서비스입니다. ',
        techStack: ['next', 'typescript', 'styled-components', 'contextAPI', 'react-query'],
        thumbnailUrl: 'petspaw.png',
        links: {
          post: '/project-remembrance-pets_paw',
          github: 'https://github.com/soheejang15/PETS-PAW',
          demo: 'https://helpful-hamster-c8a6a3.netlify.app/',
        },
      },
      {
        title: 'Pic_co',
        description: '비슷한 블록 사이 다른 색의 블록을 찾는 캐주얼 게임입니다. ',
        techStack: ['react', 'typescript', 'styled-components'],
        thumbnailUrl: 'picco.png',
        links: {
          post: '/project-remembrance-pic_co',
          github: 'https://github.com/soheejang15/PIC_CO',
          demo: 'https://astonishing-mochi-c62a6b.netlify.app/',
        },
      },
    ],
  },
};
