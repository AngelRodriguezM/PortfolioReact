import { FaFileCode, FaIdCard, FaPenToSquare, FaChessKnight, FaDownload } from 'react-icons/fa6'
import placeholder from '../Images/Placeholder_view_vector.svg.png'
import elementsOfAi from '../Images/OG-IMAGE.png'
import newsletterCard from '../Images/Newsletter.jpg'
import newsletterScreenshot from '../Images/newsletterScreenshot.png'
import tetrisIcon from '../Images/TetrisAppIcon.png'
import tetrisScreenshot from '../Images/TetrisDescription.png'
import webDesignCertificate from '../Images/Certificate.png'
import cdLogo from '../Images/CDiconWindows95.png'

const projectsData = [
  {
    id: 6,
    title: 'YouTube to MP3 Web App',
    icon: FaDownload,
    image: cdLogo,
    imageAlt: 'YouTube to MP3 Web App project',
    description: [
      'Stack: React, Vite, TypeScript, Express, yt-dlp, ffmpeg.',
      'A self-hosted React and Express app for converting single YouTube videos or full playlists into MP3 downloads. The client is a React + Vite + TypeScript single-page UI, and the server is an Express + TypeScript API with an in-memory job queue.',
      'Users can preview a YouTube URL before converting, convert a single video to one MP3, or convert a playlist into ordered MP3 files delivered as one ZIP. Background job progress is tracked in the browser, and temporary files are cleaned up automatically after a TTL.',
      'The recommended deployment is a Render Static Site for the client and a Render Docker web service for the server. It is designed for one low-traffic host rather than a serverless platform.',
    ],
    links: [
      {
        label: 'YouTube to MP3 Project Link',
        href: 'https://youtube-to-mp3-web-app.onrender.com/',
      },
    ],
  },
  {
    id: 1,
    title: 'AI Chatbot for English Learning',
    icon: FaFileCode,
    image: placeholder,
    imageAlt: 'Screenshot of the Estudiemás English tutor chatbot',
    description: [
      'Stack: GPT-4o mini, Azure Web App, Excel (lessons and FAQs).',
      'Cloud Based Tutor Chatbot: an Estudiemás English tutor built on GPT-4o mini and hosted as an Azure Web App with sign-in. It was migrated from an initial Microsoft Teams plan because of packaging issues.',
      'Lessons and FAQs are curated in Excel, and settings were tuned for accurate answers, token usage, and throughput. The goal is to reduce teachers\' after-hours workload and provide lesson-aligned answers.',
      'The project ran from January 14 to February 21, 2025. Testing covered topic adherence, memory use, and open questions.',
    ],
    links: [
      {
        label: 'Chatbot Project Report',
        href: 'https://docs.google.com/document/d/1B3Z8PQCxeIKuTAu6q1quPLpFItKjo1sdEPXsZl__LBs/edit?tab=t.0#heading=h.jcdd2bf9s68c',
      },
    ],
  },
  {
    id: 2,
    title: 'Elements Of AI Certificate',
    icon: FaIdCard,
    image: elementsOfAi,
    imageAlt: 'Elements of AI Building AI course graphic',
    description: [
      'Stack: Python (light), AI and machine learning concepts.',
      "Completed the University of Helsinki's Elements of AI and Building AI courses.",
      'Elements of AI covers AI concepts, problem solving, machine learning, neural networks, and societal uses and limitations. Building AI continues with optimization, reasoning, and learning, plus light Python for outlining an AI idea.',
    ],
  },
  {
    id: 3,
    title: 'Newsletter System',
    icon: FaPenToSquare,
    cardImage: newsletterCard,
    image: newsletterScreenshot,
    imageAlt: 'Power Automate flow with a newsletter approval step',
    description: [
      'Stack: Power Automate, SharePoint, Azure.',
      'An internship project at Estudiemás Foundation built with Power Automate, SharePoint for audience and content management, and Azure for secure delivery and scaling.',
      'The system covers drafting, approvals, scheduled sends, open and click tracking, and audit run logs, with an emphasis on reliability, low maintenance, and extensibility.',
    ],
  },
  {
    id: 4,
    title: 'JavaScript Tetris',
    icon: FaChessKnight,
    cardImage: tetrisIcon,
    image: tetrisScreenshot,
    imageAlt: 'Screenshot of the Windows 95 styled Tetris game',
    description: [
      'Stack: JavaScript.',
      'A personal prototype built in two and a half hours, covering grid rendering, rotation, line clearing, input, and scoring.',
      'It was subsequently styled with a Windows 95 theme: gray panels, pixel borders, and classic UI chrome. The game is lightweight, responsive, and extensible.',
    ],
    links: [
      {
        label: 'Tetris Project Link',
        href: 'https://github.com/AngelRodriguezM/TetrisJavaScript',
      },
    ],
  },
  {
    id: 5,
    title: 'Web Design Certificate',
    icon: FaIdCard,
    image: webDesignCertificate,
    imageAlt: 'freeCodeCamp Responsive Web Design certificate for Angel Rodriguez',
    description: [
      'Stack: HTML, CSS (Flexbox, Grid, CSS variables).',
      'Web Design Certified: the freeCodeCamp Responsive Web Design certification.',
      'It covers semantic HTML, accessible components, Flexbox, Grid, CSS variables, forms, responsive patterns, reusable utilities, and performance.',
    ],
    links: [
      {
        label: 'Web design Certificate Link',
        href: 'https://www.freecodecamp.org/certification/angelrodrigu3z/responsive-web-design',
      },
    ],
  },
]

export default projectsData
