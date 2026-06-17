import type { BlogPost } from './types'

const post: BlogPost = {
  slug: 'how-to-increase-fps-in-fortnite',
  title: 'How to Increase FPS in Fortnite',
  metaTitle: 'How to Increase FPS in Fortnite (Best Settings 2026)',
  metaDescription:
    'Boost your Fortnite FPS with the best video settings, Performance Mode, driver fixes and competitive config. A simple step-by-step guide for smoother gameplay.',
  publishedAt: '2026-06-17',
  lastModified: '2026-06-17',
  heroImage: '/images/blog/how-to-increase-fps-in-fortnite.webp',
  heroAlt: 'FPS comparison tool to check your Fortnite frame rate side by side',
  showInlineTool: false,
  toolId: 'fps-test',
  excerpt:
    'Fortnite is a competitive game where frame rate wins fights. Here is how to squeeze the most FPS out of your setup with the right settings.',
  sections: [
    {
      heading: 'Why FPS Matters So Much in Fortnite',
      content:
        'Fortnite is a fast building shooter where every frame counts. Higher FPS means lower input lag, smoother edits, and a clearer view of enemies during fast peeks. Pros run the game at hundreds of frames per second on competitive settings, not because the game looks better, but because it feels more responsive and gives a real edge in fights. The single most important change you can make is turning on Performance Mode, which we cover below.',
    },
    {
      heading: 'Turn On Performance Mode',
      content:
        'Performance Mode (Alpha) is Epic built-in low-end rendering mode and it is the biggest FPS boost available in Fortnite. It strips out heavy visual effects and dramatically lowers CPU and GPU load, often doubling frame rates and cutting memory use. Go to Settings, then Video, set Rendering Mode to Performance Mode, and restart the game. Most competitive players use it even on strong PCs because the FPS gain outweighs the visual downgrade.',
    },
    {
      heading: 'Best Fortnite Video Settings for FPS',
      content:
        'After enabling Performance Mode, dial in these settings. Keep View Distance at Medium or higher so you can still spot distant enemies, but push the heavier effects down.',
      table: {
        headers: ['Setting', 'Set To', 'Why'],
        rows: [
          ['Rendering Mode', 'Performance Mode', 'Biggest FPS gain'],
          ['View Distance', 'Medium / Far', 'See enemies, low FPS cost'],
          ['Shadows', 'Off', 'Large FPS gain'],
          ['Anti-Aliasing', 'Off', 'Frees GPU'],
          ['Textures', 'Low', 'Lower VRAM use'],
          ['Effects', 'Low', 'Smoother fights'],
          ['VSync', 'Off', 'Lower input lag'],
          ['Frame Rate Limit', 'Match or exceed monitor Hz', 'Smooth, consistent FPS'],
        ],
      },
    },
    {
      heading: 'System and Driver Fixes',
      content:
        'Settings are only half the battle. Update your GPU drivers, since Nvidia and AMD ship game-ready updates that boost Fortnite directly. Close background apps and browser tabs that steal CPU and RAM. In your GPU control panel, set Fortnite to use the dedicated graphics card and enable low latency mode. On a laptop, always plug in and use the high performance power plan. Set your monitor to its full refresh rate so the extra frames are actually shown.',
    },
    {
      heading: 'Set the Right Frame Rate Limit',
      content:
        'Uncapped FPS can cause coil whine and uneven frame pacing. Instead, set a frame rate limit at or slightly above your monitor refresh rate. On a 144Hz monitor, capping at 144 or 240 FPS keeps frame times consistent, which actually feels smoother than wildly fluctuating uncapped numbers. Watch your 1% low, not just your average, because the dips are what cost you fights.',
    },
    {
      heading: 'Check Your Frame Rate',
      content:
        'Turn on Fortnite built-in counter in Settings, Video, by enabling Show FPS. Play a match and watch both your average and how low it dips during builds and fights. For a system baseline, run the free FPS test on this site. If your browser frame rate is also weak, the fix is system-wide and the driver and background-app steps above will help across every game.',
      image: {
        src: '/images/blog/fps-test-tool.webp',
        alt: 'Free FPS test tool to benchmark frame rate for Fortnite',
        caption: 'Use our free FPS test to benchmark your system and track your 1% low.',
      },
    },
  ],
  faqs: [
    {
      question: 'What is a good FPS for Fortnite?',
      answer:
        '60 FPS is the minimum for smooth play, but competitive Fortnite players aim for 144 FPS or higher on a high refresh rate monitor. The extra frames lower input lag and make building and editing feel crisp.',
    },
    {
      question: 'Does Performance Mode increase FPS in Fortnite?',
      answer:
        'Yes, significantly. Performance Mode is the single biggest FPS boost in Fortnite. It removes heavy visual effects and lowers CPU and GPU load, often doubling frame rates and reducing memory use, which is why most pros use it.',
    },
    {
      question: 'Should I cap my FPS in Fortnite?',
      answer:
        'Yes. Capping your frame rate at or slightly above your monitor refresh rate gives more consistent frame pacing than running uncapped. Consistent frame times feel smoother and reduce coil whine and heat.',
    },
    {
      question: 'Why is my Fortnite FPS dropping in fights?',
      answer:
        'FPS drops during fights come from effects, builds, and player models loading at once. Lowering Effects and Shadows, enabling Performance Mode, and closing background apps all raise your 1% low so the dips are less severe.',
    },
    {
      question: 'Does a 144Hz monitor help in Fortnite?',
      answer:
        'Yes, if your PC can push 144 FPS or more. A 144Hz monitor displays more of the frames your GPU produces, giving smoother motion and lower input lag. Pair it with a frame rate that matches or exceeds 144 FPS.',
    },
  ],
  relatedToolIds: ['fps-test', 'hz-detector', 'fps-reaction-test'],
}

export default post
