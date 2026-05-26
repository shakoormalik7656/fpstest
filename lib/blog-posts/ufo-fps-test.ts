import type { BlogPost } from './types'

const post: BlogPost = {
  slug: 'ufo-fps-test',
  title: 'UFO FPS Test: What It Is and How to Use It',
  metaTitle: 'UFO FPS Test: See 30 vs 60 vs 144 FPS Visually',
  metaDescription:
    'The UFO FPS test shows moving objects at 30, 60, 120, and 144 FPS so you can see exactly how smooth your monitor really is. Free online tool, no download needed.',
  publishedAt: '2025-05-25',
  lastModified: '2025-05-25',
  heroImage: '/images/blog/ufo-fps-test.webp',
  heroAlt: 'UFO FPS test showing motion blur difference at 30, 60, 120 and 144 FPS',
  showInlineTool: false,
  toolId: 'ufo-test',
  excerpt:
    'The UFO FPS test is the internet standard for seeing exactly how smooth your monitor really is. Here is how it works and what your results mean.',
  sections: [
    {
      heading: 'What Is the UFO FPS Test?',
      content:
        'The UFO FPS test is a web-based display testing tool created by Blur Busters, the research team behind over 50 scientific papers on display technology. Its purpose is simple: show you how your monitor actually handles motion by animating objects across the screen at different frame rates simultaneously. Unlike software FPS counters that tell you what your GPU produces, the UFO test shows you what your eyes actually see. That is a crucial difference. You can have a GPU pushing 200 FPS but if your monitor is set to 60Hz, every track on the UFO test will look identical because your screen physically cannot show more than 60 unique frames per second.',
    },
    {
      heading: 'The Science Behind the Test',
      content:
        'The UFO moves at exactly 960 pixels per second across your screen. At 30 FPS each frame is visible for 33 milliseconds, which creates roughly 16 pixels of motion blur as your eyes track the object. At 144 FPS that drops to 6.9 milliseconds per frame and only about 4 pixels of blur. The science involves three concepts working together.',
      subSections: [
        {
          heading: 'Sample and Hold',
          content:
            'Modern LCD and OLED displays hold each frame stationary until the next refresh cycle. Your eyes move continuously but the image stays frozen. This mismatch between continuous eye movement and discrete frame updates is what creates retinal blur at lower frame rates.',
        },
        {
          heading: 'Persistence of Vision',
          content:
            'Your visual system blends images together when they appear in rapid sequence. At 30 FPS the gap between frames is long enough that your brain perceives the motion as choppy. At 144 FPS the gaps are so short the motion appears fluid and continuous.',
        },
        {
          heading: 'Motion Picture Response Time',
          content:
            'Blur Busters pioneered MPRT measurement, which directly measures how much blur a human eye perceives during motion. This is different from the GtG (Gray-to-Gray) response time you see on monitor spec sheets. MPRT is what actually matters for gaming feel and the UFO test makes it visible.',
        },
      ],
    },
    {
      heading: 'FPS vs Hz: Why Your Monitor Is the Bottleneck',
      content:
        'FPS measures how many frames your GPU generates per second. Hz measures how many times your monitor physically refreshes per second. Your monitor is the final gatekeeper. A 60Hz monitor can only show 60 unique frames per second no matter how powerful your GPU is. This is why the UFO test caps at 60 on a 60Hz monitor even if your PC is producing 300 FPS. The GPU frames queue up but the monitor can only display 60 of them each second. The other 240 are wasted.',
      table: {
        headers: ['Refresh Rate', 'Max Visible FPS', 'Frame Time', 'Blur at 960px/s'],
        rows: [
          ['60Hz', '60 FPS', '16.7ms', '~16 pixels'],
          ['120Hz', '120 FPS', '8.3ms', '~8 pixels'],
          ['144Hz', '144 FPS', '6.9ms', '~4 pixels'],
          ['240Hz', '240 FPS', '4.2ms', '~2 pixels'],
          ['360Hz', '360 FPS', '2.8ms', '~1 pixel'],
        ],
      },
    },
    {
      heading: 'Why Is My UFO Test Stuck at 60 FPS?',
      content:
        'This is the most common question about the UFO test. If your monitor is rated at 144Hz but the UFO test only shows 60 FPS, here are all the possible causes in order of likelihood.',
      subSections: [
        {
          heading: 'Windows Display Settings',
          content:
            'Right click your desktop and select Display Settings. Scroll to Advanced Display. Check the refresh rate shown. Windows often defaults to 60Hz even on high refresh monitors. Change it to your monitor maximum and retest.',
        },
        {
          heading: 'Wrong Cable Type',
          content:
            'HDMI 2.0 can cap you at 120Hz at 1080p. For 144Hz and above use DisplayPort 1.4 or HDMI 2.1. If you are using an older cable that came in the box, this is likely your problem. Swap to DisplayPort for best results.',
        },
        {
          heading: 'Browser or Battery Mode',
          content:
            'Browsers throttle animations when your laptop is on battery saver mode or unplugged. Plug in your laptop and retest. Chrome and Edge tend to score best for high refresh rate browser tests.',
        },
        {
          heading: 'Outdated GPU Drivers',
          content:
            'Old GPU drivers can cause incorrect refresh rate output. Update your Nvidia or AMD drivers to the latest version and check your GPU control panel to confirm the refresh rate matches your monitor spec.',
        },
      ],
    },
    {
      heading: 'What the UFO Test Results Actually Mean',
      content:
        'When you run the UFO FPS test, look at each track carefully. The spacing between UFO positions tells you the frame rate. Identical spacing across all tracks means your monitor is capped at one refresh rate. You should see clearly different spacing and blur amounts on each track.',
      subSections: [
        {
          heading: 'Bright Halos Around the UFO',
          content:
            'If you see bright white or light colored halos appearing just ahead of the UFO, your monitor overdrive setting is too aggressive. Reduce the overdrive level in your monitor OSD menu.',
        },
        {
          heading: 'Dark Shadows Behind the UFO',
          content:
            'Dark ghosting trails behind the UFO mean your panel response time is too slow. The pixel has not finished transitioning before the next frame arrives. This is common on IPS panels at very high refresh rates.',
        },
        {
          heading: 'All Tracks Look Identical',
          content:
            'If 60, 120, and 144 FPS tracks all look the same, your monitor is almost certainly capped at 60Hz. Check your Windows display settings first. This is the most common fix.',
        },
      ],
    },
    {
      heading: 'Mouse Polling Rate and FPS Drops',
      content:
        'Some users notice FPS dropping on the UFO test when moving their mouse. This is a real and documented issue. High polling rate mice (1000Hz and above) generate many interrupt requests to the CPU per second. On some systems this overhead disrupts the browser rendering thread, causing frame drops during mouse movement. Microsoft released Windows 11 updates to address high frequency mouse input handling. If you experience this, try lowering your mouse polling rate to 500Hz during the test, or test without moving the mouse.',
    },
    {
      heading: 'How to Get the Most Accurate UFO Test Results',
      content:
        'Follow these steps before running the test for the most reliable results.',
      subSections: [
        {
          heading: 'Disable Variable Refresh Rate',
          content:
            'Turn off G-Sync or FreeSync before testing. Variable refresh rate technology adjusts your monitor refresh dynamically which can cause uneven spacing between UFO positions, making results harder to read.',
        },
        {
          heading: 'Close Background Tabs and Apps',
          content:
            'Close all other browser tabs and background applications. Discord, Spotify, and other apps consuming CPU or GPU resources can affect frame pacing and give inaccurate results.',
        },
        {
          heading: 'Plug In Your Laptop',
          content:
            'Always test with your laptop plugged into power. Battery saver mode throttles both CPU and GPU performance, which directly caps your browser frame rate.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is the UFO FPS test?',
      answer:
        'The UFO FPS test is a web-based tool created by Blur Busters that shows animated objects moving at different frame rates simultaneously. It lets you visually compare how smooth 30, 60, 120, and 144 FPS look on your actual monitor.',
    },
    {
      question: 'Why does my UFO test show only 60 FPS on a 144Hz monitor?',
      answer:
        'The most common cause is Windows display settings being set to 60Hz. Right click your desktop, go to Display Settings, then Advanced Display, and change your refresh rate to 144Hz. Also check your cable type as older HDMI cables can cap refresh rates.',
    },
    {
      question: 'What is the difference between the UFO test and a regular FPS counter?',
      answer:
        'A software FPS counter like MSI Afterburner shows what your GPU produces. The UFO test shows what your monitor actually displays and what your eyes perceive. You can have 300 FPS from your GPU but only see 60 FPS on a 60Hz monitor.',
    },
    {
      question: 'Why does my FPS drop when I move my mouse during the UFO test?',
      answer:
        'High polling rate mice (1000Hz and above) can overwhelm the CPU with interrupt requests, disrupting the browser rendering thread. Try lowering your mouse polling rate to 500Hz during the test, or test without moving the mouse.',
    },
    {
      question: 'Can I see the difference between 60 and 144 FPS on the UFO test?',
      answer:
        'Yes. Most people can clearly see the difference. The 144 FPS track has noticeably less motion blur and the UFO appears sharper during movement. The difference between 60 and 144 is much more obvious than between 144 and 240.',
    },
    {
      question: 'Does the UFO test work on mobile?',
      answer:
        'Yes but mobile browsers are typically capped at 60Hz unless your phone has a high refresh rate display (90Hz or 120Hz). Most modern flagship phones support 120Hz which will show a visible difference on the test.',
    },
    {
      question: 'What does a good UFO FPS test result look like?',
      answer:
        'A good result shows clearly different motion blur levels on each track, with 144 FPS appearing noticeably sharper than 30 FPS. If all tracks look identical your monitor may be capped at 60Hz.',
    },
  ],
  relatedToolIds: ['fps-test', 'hz-detector', 'fps-reaction-test'],
}

export default post
