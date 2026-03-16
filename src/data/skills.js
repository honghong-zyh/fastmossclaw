export const skillsData = [
  {
    id: 1,
    name: 'tiktok-smart-selection',
    desc: '智能挖掘 TikTok 热门商品及高潜力新品。支持按类目、销量增长率、达人带货力等维度筛选，并...',
    enabled: true,
    official: false,
    category: 'ecommerce',
    date: '2026年3月12日',
    detail: {
      what: '基于 FastMoss 数据平台，自动分析 TikTok Shop 各类目商品的销量趋势、增长动力与竞争格局，输出高潜力选品清单和机会洞察。',
      goodFor: [
        '想快速了解某个类目哪些商品正在起量',
        '寻找"增长快、竞争小"的蓝海新品',
        '希望按达人带货力、好评率等指标做精细筛选',
      ],
      notFor: [
        '已有明确的商品链接，只需做单品竞对分析',
        '需要生成广告创意脚本或短视频文案',
        '非 TikTok 平台的电商选品需求（如 Amazon、Shopee）',
      ],
      inputs: [
        { label: '目标站点/国家', example: '美国 US、英国 UK、东南亚等' },
        { label: '类目关键词', example: 'beauty, skincare, home decor' },
        { label: '筛选条件（可选）', example: '7天销量增长率 > 50%、达人数 > 10' },
      ],
      outputs: [
        { label: '高潜力商品清单', example: '含商品名、销量、价格、增长率、关联达人数' },
        { label: '类目机会评分', example: '综合竞争强度与增长速度的打分' },
        { label: '选品建议摘要', example: '一段文字总结当前类目的机会与风险' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '美区美妆类目 Top 增长新品',
          prompt: '帮我找一下最近7天 TikTok 美区 beauty 类目中，销量增长最快的10个新品',
          preview: '筛选出 10 款近 7 日销量增长率超 200% 的美妆新品，包含价格带、达人覆盖数、好评率等关键指标。',
        },
        {
          id: 'ex2',
          title: '东南亚家居蓝海机会',
          prompt: '分析 TikTok 东南亚 home decor 类目，找出竞争压力小且增长快的商品',
          preview: '从竞争度和增速两个维度筛选出 8 款蓝海家居品，附带达人推荐策略。',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'internet-skill-finder',
    desc: 'Search and recommend Agent Skills from verified GitHub repositories. Use when users ask to find,...',
    enabled: true,
    official: true,
    date: '2026年1月23日',
    detail: {
      what: '从经过验证的 GitHub 仓库中搜索并推荐 Agent 技能，帮助用户发现可安装到 Agent 的即用型技能包。',
      goodFor: [
        '想为 Agent 寻找特定领域的新技能',
        '不确定是否已有开源技能可以满足需求',
        '需要对比多个候选技能的功能差异',
      ],
      notFor: [
        '已知技能名称，只想直接安装',
        '需要自己从零创建技能',
        '非 Agent 相关的通用 GitHub 项目搜索',
      ],
      inputs: [
        { label: '需求描述', example: '我需要一个能分析竞品广告的技能' },
        { label: '关键词（可选）', example: 'TikTok, ads, competitor' },
      ],
      outputs: [
        { label: '推荐技能列表', example: '含名称、描述、来源仓库、适用场景' },
        { label: '安装指引', example: '一键添加到 Agent 的操作方式' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '寻找数据分析相关技能',
          prompt: '帮我找一些可以做数据分析和可视化的 Agent 技能',
          preview: '推荐了 3 个经过社区验证的数据分析技能，含 Excel 生成、图表绘制等能力。',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'github-gem-seeker',
    desc: 'Search GitHub for battle-tested libraries and tools. Use when users need alternatives instead of reinventing the wheel.',
    enabled: false,
    official: true,
    date: '2026年1月23日',
    detail: {
      what: '在 GitHub 上搜索经过实战检验的开源库和工具，当用户的需求已有成熟开源方案时，推荐最佳选择而非重新造轮子。',
      goodFor: [
        '寻找某类问题的开源解决方案',
        '需要对比多个开源库的活跃度和质量',
        '希望找到社区认可的最佳实践项目',
      ],
      notFor: [
        '搜索 Agent 技能（请使用 internet-skill-finder）',
        '需要创建新的开源项目',
        '非技术类的通用搜索需求',
      ],
      inputs: [
        { label: '需求描述', example: '我需要一个轻量的 Python 任务队列' },
      ],
      outputs: [
        { label: '推荐项目列表', example: '含项目名、Star 数、最近更新、核心功能' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '寻找 PDF 解析库',
          prompt: '帮我找一个好用的 PDF 文本提取开源库',
          preview: '推荐了 PyMuPDF、pdfplumber 等 3 个高星项目，含性能和功能对比。',
        },
      ],
    },
  },
  {
    id: 4,
    name: 'skill-creator',
    desc: '创新技能的指南，通过专业知识、工作流程成来扩展 Manus。对于任何修改或改...',
    enabled: true,
    official: false,
    date: '2026年2月16日',
    detail: {
      what: '引导用户创建或更新 Agent 技能的完整工作流，通过专业知识、工作流或工具集成来扩展 Agent 的能力边界。',
      goodFor: [
        '想要创建一个全新的自定义技能',
        '需要修改或优化已有技能的逻辑',
        '希望将内部 SOP 封装成可复用的技能',
      ],
      notFor: [
        '只想搜索和安装现有技能',
        '非技能相关的一般性问答',
      ],
      inputs: [
        { label: '技能目标描述', example: '创建一个能自动生成周报的技能' },
        { label: '现有技能文件（可选）', example: 'SKILL.md 文件内容' },
      ],
      outputs: [
        { label: '完整的技能文件', example: '包含 SKILL.md、配置和示例' },
        { label: '测试验证报告', example: '技能功能的测试结果' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '创建竞品监控技能',
          prompt: '帮我创建一个 TikTok 竞品店铺监控技能，每天自动抓取销量变化',
          preview: '生成了包含数据采集、变化检测、报告输出三个模块的完整技能包。',
        },
      ],
    },
  },
  {
    id: 5,
    name: 'video-generator',
    desc: '专业的 AI 视频制作工作流。在创建视频、短片、广告或任何使用 AI 生成工具的视频内容时使用。',
    enabled: false,
    official: true,
    date: '2026年2月3日',
    detail: {
      what: '专业的 AI 视频制作工作流，支持从脚本、图片素材到最终视频的全链路生成，适用于广告短片、产品展示等场景。',
      goodFor: [
        '需要快速生成产品宣传短视频',
        '想用 AI 批量制作广告素材视频',
        '需要将文案/脚本转化为视频内容',
      ],
      notFor: [
        '需要高精度真人拍摄级别的视频',
        '纯文字内容的创作（请使用文案类技能）',
        '视频剪辑和后期（需要专业剪辑软件）',
      ],
      inputs: [
        { label: '视频脚本/文案', example: '30秒产品展示广告脚本' },
        { label: '风格偏好（可选）', example: '简约、科技感、温暖治愈' },
      ],
      outputs: [
        { label: '生成的视频文件', example: 'MP4 格式，支持多种比例' },
        { label: '分镜脚本', example: '每帧画面描述与时间轴' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '生成美妆产品广告',
          prompt: '帮我生成一个 15 秒的口红产品 TikTok 广告视频',
          preview: '生成了包含产品特写、使用展示、卖点字幕的 15 秒竖版视频。',
        },
      ],
    },
  },
  {
    id: 6,
    name: 'stock-analysis',
    desc: '使用金融市场数据分析股票和公司。获取公司概况、技术见解、价格图表、内部持股和 SEC 申...',
    enabled: false,
    official: true,
    date: '2026年1月23日',
    detail: {
      what: '使用金融市场数据全面分析股票和公司，覆盖基本面、技术面、内部持股及 SEC 申报文件等多维信息。',
      goodFor: [
        '需要快速了解一只股票的基本面',
        '想获取技术分析指标和价格趋势',
        '需要追踪内部人持股变动和 SEC 文件',
      ],
      notFor: [
        '加密货币或外汇分析',
        '需要实时交易执行（本技能仅做分析）',
        '非上市公司的财务分析',
      ],
      inputs: [
        { label: '股票代码或公司名', example: 'AAPL、Tesla、META' },
      ],
      outputs: [
        { label: '综合分析报告', example: '含估值、技术指标、新闻摘要' },
        { label: '价格走势图表', example: '近期K线图和关键价位' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '分析苹果公司股票',
          prompt: '帮我全面分析一下 AAPL 最近的表现',
          preview: '输出了包含财报解读、技术面信号、内部人交易在内的完整分析报告。',
        },
      ],
    },
  },
  {
    id: 7,
    name: 'similarweb-analytics',
    desc: '使用 SimilarWeb 数据分析网站流量和竞争对手。获取流量估算、关键词分析...',
    enabled: false,
    official: true,
    date: '2026年1月23日',
    detail: {
      what: '使用 SimilarWeb 流量数据分析网站和域名，获取流量指标、参与度统计、全球排名、流量来源和地理分布等信息。',
      goodFor: [
        '想了解竞品网站的流量规模和趋势',
        '需要分析流量来源结构（搜索、社交、直接等）',
        '对比多个网站的用户行为指标',
      ],
      notFor: [
        '分析移动 App 的数据（仅支持网站）',
        '需要精确到个位数的流量数据',
        'TikTok 店铺或社交媒体账号分析',
      ],
      inputs: [
        { label: '网站域名', example: 'amazon.com、shein.com' },
      ],
      outputs: [
        { label: '流量分析报告', example: '月访问量、跳出率、停留时长等' },
        { label: '竞品对比', example: '同行业网站的流量排名对比' },
      ],
      examples: [
        {
          id: 'ex1',
          title: '分析 Shein 官网流量',
          prompt: '帮我分析 shein.com 最近的流量和用户行为数据',
          preview: '输出了 Shein 月度流量趋势、TOP 流量来源国家、关键词排名等核心指标。',
        },
      ],
    },
  },
];
