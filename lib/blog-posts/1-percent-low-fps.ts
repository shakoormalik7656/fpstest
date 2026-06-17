import type { BlogPost } from './types'

const post: BlogPost = {
  slug: '1-percent-low-fps',
  title: 'What Is 1% Low FPS and Why It Matters',
  metaTitle: 'What Is 1% Low FPS? 1% and 0.1% Lows Explained',
  metaDescription:
    '1% low FPS is the average of your slowest 1% of frames. It predicts stutter better than average FPS. Here is what 1% and 0.1% lows mean and how to measure them.',
  publishedAt: '2026-06-17',
  lastModified: '2026-06-17',
  heroImage: '/images/blog/1-percent-low-fps.webp',
  heroAlt: 'Frame time graph highlighting 1% low and 0.1% low FPS dips',
  showInlineTool: false,
  toolId: 'fps-test',
  excerpt:
    'Average FPS hides your worst moments. The 1% low and 0.1% low reveal the stutters you actually feel. Here is what they mean and how to test yours.',
  sections: [
    {
      heading: 'What Is 1% Low FPS?',
      content:
        'The 1% low FPS is the average frame rate of your slowest 1% of frames during a test, and the 0.1% low is the average of your slowest 0.1%. They exist because average FPS is misleading. You can average 120 FPS and still feel constant stutter if your frame rate keeps dropping to 40 for short bursts. Those drops are exactly what the 1% and 0.1% lows capture. They are the dips, hitches, and micro-stutters your eyes notice in fast gameplay, which is why experienced players watch them more closely than the average.',
    },
    {
      heading: 'How 1% Low Is Calculated',
      content:
        'The calculation is simpler than it sounds. A benchmark records how long every single frame takes to render, measured in milliseconds. To find the 1% low, it sorts every frame from slowest to fastest, takes the slowest 1% of them, averages their frame times, and converts that back into a frame rate. The 0.1% low does the same with the slowest 0.1% of frames. Because these metrics focus only on your worst frames, they are far more sensitive to stutter than a simple average across the whole run.',
      table: {
        headers: ['Metric', 'What It Measures', 'Good Result'],
        rows: [
          ['Average FPS', 'Mean across all frames', 'High and steady'],
          ['1% Low FPS', 'Average of slowest 1% of frames', 'Close to your average'],
          ['0.1% Low FPS', 'Average of slowest 0.1% of frames', 'Close to your average'],
          ['Frame Time', 'Milliseconds per frame', 'Under 16.7ms for 60 FPS'],
          ['Jitter', 'Frame-to-frame timing variation', 'Under 2ms'],
        ],
      },
    },
    {
      heading: 'Why 1% Low Matters More Than Average FPS',
      content:
        'Smoothness is about consistency, not just peak numbers. Two PCs can both average 100 FPS and feel completely different in a game. The one with a 1% low of 90 feels buttery, while the one with a 1% low of 35 feels like it stutters every few seconds. The closer your 1% low sits to your average, the smoother and more predictable your gameplay. A large gap between average and 1% low is the signature of a frame pacing problem, and it often comes from background apps, thermal throttling, a CPU bottleneck, or storage stutter rather than a weak GPU.',
    },
    {
      heading: 'What Causes Low 1% Lows',
      content:
        'If your average is fine but your 1% low keeps crashing, one of these is usually the culprit.',
      subSections: [
        {
          heading: 'Background Apps and Browser Tabs',
          content:
            'Discord, Spotify, overlays, and dozens of open browser tabs steal CPU time in bursts, causing sudden frame drops. Close them before testing or gaming for the most consistent results.',
        },
        {
          heading: 'CPU Bottleneck',
          content:
            'When your CPU cannot feed frames to the GPU fast enough, you get periodic stalls. These show up as a healthy average with poor 1% and 0.1% lows, especially in CPU-heavy games and large multiplayer matches.',
        },
        {
          heading: 'Thermal Throttling',
          content:
            'As your CPU or GPU heats up it slows itself down to stay safe, producing frame rate dips a few minutes into a session. Better cooling and airflow keep your lows high.',
        },
        {
          heading: 'Storage and Shader Stutter',
          content:
            'Loading new assets or compiling shaders mid-game causes brief hitches. An SSD and letting games pre-compile shaders both help reduce these spikes.',
        },
      ],
    },
    {
      heading: 'How to Test Your 1% Low FPS',
      content:
        'You do not need heavy software to see your lows. The free FPS test on this site records every frame in your browser and reports your average FPS, 1% low, 0.1% low, frame time, jitter, and a performance score, all in about ten seconds with no download. For in-game measurement, tools like CapFrameX, MSI Afterburner with RivaTuner, or the built-in benchmarks in many games will report 1% and 0.1% lows over a longer session. Whichever you use, the goal is the same: get your 1% low as close to your average as possible.',
    },
  ],
  faqs: [
    {
      question: 'What is a good 1% low FPS?',
      answer:
        'A good 1% low stays close to your average FPS. If you average 120 FPS, a 1% low of 90 or higher is excellent and means smooth, consistent gameplay. A 1% low far below your average signals stutter and frame pacing problems.',
    },
    {
      question: 'What is the difference between 1% low and 0.1% low?',
      answer:
        'The 1% low is the average frame rate of your slowest 1% of frames, while the 0.1% low averages your slowest 0.1%. The 0.1% low focuses on your very worst, rarest hitches, so it is usually lower than the 1% low.',
    },
    {
      question: 'Why is my 1% low so much lower than my average FPS?',
      answer:
        'A big gap usually points to background apps, a CPU bottleneck, thermal throttling, or storage and shader stutter rather than a weak GPU. Closing background programs and improving cooling are the fastest fixes.',
    },
    {
      question: 'Is 1% low more important than average FPS?',
      answer:
        'For how a game actually feels, yes. Average FPS tells you the headline number, but the 1% low predicts whether the experience feels smooth or stuttery. Competitive players prioritize a high, stable 1% low.',
    },
    {
      question: 'How do I measure 1% low FPS for free?',
      answer:
        'Use the free FPS test on this site, which records every frame in your browser and reports your 1% low, 0.1% low, frame time, and jitter in about ten seconds. For in-game numbers, CapFrameX and MSI Afterburner also report lows.',
    },
    {
      question: 'Does higher average FPS improve 1% low?',
      answer:
        'Not always. Raising your average helps, but if a CPU bottleneck or background task is causing the dips, your 1% low can stay poor even as the average climbs. Fixing the root cause of the stutter matters more.',
    },
  ],
  relatedToolIds: ['fps-test', 'frame-comparison', 'ufo-test'],
}

export default post
