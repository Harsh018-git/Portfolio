import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const navigation = ['My Skills', 'Projects', 'Contact Us']
const nameCharacters = [...'Harsh Pal.']
const aboutParagraphs = [
  "I'm pursuing a B.Tech in Information Technology at Galgotias College of Engineering and Technology, which is affiliated with AKTU. I enjoy learning by building things and solving problems that make me think beyond the obvious solution.",
  "I practice DSA in C++ and have solved 150+ problems on LeetCode. I've completed most of the important DSA topics and am especially comfortable with dynamic programming and recursion. Alongside DSA, I'm learning backend development: I've completed Node.js and Express.js, work with SQL, and can deploy my own projects end to end.",
]
const educationItems = [
  { id: '01', title: 'Class 10', board: 'CBSE Board', value: 85, level: 85, unit: 'percent' },
  { id: '02', title: 'Class 12', board: 'CBSE Board', value: 67, level: 67, unit: 'percent' },
  { id: '03', title: 'JEE Mains', board: 'National Entrance Exam', value: 84, level: 84, unit: 'percentile' },
  { id: '04', title: 'B.Tech', board: 'AKTU · Through Semester 4', value: 6.2, level: 62, unit: 'cgpa' },
]
const contactEmail = 'harshpal9532@gmail.com'
const socialProfiles = {
  Instagram: 'https://www.instagram.com/harshpal2723/',
  Monkeytype: 'https://monkeytype.com/profile/harsh_pal_18',
  LeetCode: 'https://leetcode.com/u/harshpal18/',
  LinkedIn: 'https://www.linkedin.com/in/harshpal18/',
  GitHub: 'https://github.com/Harsh018-git',
}

function SocialIcon({ name }) {
  const paths = {
    Instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-.2 2A2.8 2.8 0 0 0 4 6.8v10.4A2.8 2.8 0 0 0 6.8 20h10.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 17.2 4H6.8ZM18.3 5.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    Monkeytype: 'M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v9.5A2.25 2.25 0 0 1 18.75 17h-5.5l-2.4 2.1a1.3 1.3 0 0 1-1.7 0L6.75 17h-1.5A2.25 2.25 0 0 1 3 14.75v-9.5Zm2.25-.75a.75.75 0 0 0-.75.75v9.5c0 .41.34.75.75.75h2.07l2.82 2.47a.28.28 0 0 0 .36 0l2.82-2.47h5.43c.41 0 .75-.34.75-.75v-9.5a.75.75 0 0 0-.75-.75H5.25Zm1.25 3h2v2h-2v-2Zm3.5 0h2v2h-2v-2Zm3.5 0h2v2h-2v-2ZM8.25 12h7.5v1.5h-7.5V12Z',
    LeetCode: 'M13.48 0a2.3 2.3 0 0 0-1.63.68L.69 11.84a2.35 2.35 0 0 0 0 3.32l5.27 5.26a2.35 2.35 0 0 0 3.32 0 1.18 1.18 0 0 0 0-1.66l-5.25-5.25 8.67-8.66a1.18 1.18 0 0 0-1.67-1.67L2.36 11.84a1.18 1.18 0 0 0 0 1.66l5.26 5.26.01.01-5.27-5.27 10.99-11a.17.17 0 0 1 .24 0l2.17 2.17a1.18 1.18 0 0 0 1.67-1.66L15.16.68A2.3 2.3 0 0 0 13.48 0Zm2.6 7.18a1.18 1.18 0 0 0-.83.35l-4.71 4.71a1.18 1.18 0 0 0 0 1.66l4.71 4.71a1.18 1.18 0 1 0 1.66-1.66l-3.88-3.88 3.88-3.88a1.18 1.18 0 0 0-.83-2.01Zm3.02 3.53h-4.7a1.18 1.18 0 1 0 0 2.36h4.7a1.18 1.18 0 1 0 0-2.36Z',
    LinkedIn: 'M6.2 8.3H3.1V21h3.1V8.3ZM4.7 3A1.8 1.8 0 1 0 4.7 6.6 1.8 1.8 0 0 0 4.7 3ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2v-1.8H9.5V21h3.1v-6.3c0-1.7.3-3.3 2.4-3.3 2.1 0 2.1 1.9 2.1 3.4V21H21v-7.3Z',
    GitHub: 'M12 2.7A9.3 9.3 0 0 0 9.1 20.8c.5.1.6-.2.6-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.7.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8.9-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.6.9 1.4.9 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.9.6 1.7v2.6c0 .3.2.6.6.5A9.3 9.3 0 0 0 12 2.7Z',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

function Navigation() {
  return (
    <nav className="glass-nav" aria-label="Primary navigation">
      <div className="nav-left">
        <a className="brand" href="#top" aria-label="Harsh Pal home">
          <span>Harsh Pal</span>
        </a>

        <div className="social-links" aria-label="Social profiles">
          {['Instagram', 'Monkeytype', 'LeetCode', 'LinkedIn', 'GitHub'].map((platform) => (
            <a
              key={platform}
              href={socialProfiles[platform]}
              aria-label={platform}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name={platform} />
            </a>
          ))}
        </div>
      </div>

      <div className="nav-actions">
        <div className="nav-links">
          {navigation.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>
              {item}
            </a>
          ))}
          <a className="resume-button" href="/Harsh-Pal-Resume.pdf" download>
            <span aria-hidden="true">↓</span>
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}

function NameDisplay() {
  const nameRef = useRef(null)

  function handlePointerMove(event) {
    const nameBlock = nameRef.current
    if (!nameBlock) return

    const rect = nameBlock.getBoundingClientRect()
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 22
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -16

    nameBlock.style.setProperty('--tilt-x', `${rotateX}deg`)
    nameBlock.style.setProperty('--tilt-y', `${rotateY}deg`)
  }

  function resetTilt() {
    const nameBlock = nameRef.current
    if (!nameBlock) return

    nameBlock.style.setProperty('--tilt-x', '0deg')
    nameBlock.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <span
      ref={nameRef}
      className="name-letters"
      aria-label="Harsh Pal."
      onMouseMove={handlePointerMove}
      onMouseLeave={resetTilt}
    >
      {nameCharacters.map((letter, index) => (
        <span
          className="name-letter-shell"
          aria-hidden="true"
          key={`${letter}-${index}`}
          style={{ '--i': index }}
        >
          <span className="name-letter">{letter === ' ' ? '\u00A0' : letter}</span>
          <span className="name-letter-depth" aria-hidden="true">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </span>
      ))}
    </span>
  )
}

function ScrollBoldAboutText({ paragraphs }) {
  const blockRef = useRef(null)
  const [boldCount, setBoldCount] = useState(0)
  const letterGroups = useMemo(() => paragraphs.map((text) => [...text]), [paragraphs])
  const totalLetters = useMemo(
    () => letterGroups.reduce((sum, letters) => sum + letters.length, 0),
    [letterGroups],
  )

  useEffect(() => {
    const node = blockRef.current
    if (!node || totalLetters === 0) return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    function updateBoldCount() {
      if (mediaQuery.matches) {
        setBoldCount(totalLetters)
        return
      }

      const viewportHeight = window.innerHeight
      const startScroll = node.offsetTop - viewportHeight * 0.58
      const endScroll = node.offsetTop + node.offsetHeight - viewportHeight * 0.28
      const progress = Math.min(
        Math.max((window.scrollY - startScroll) / (endScroll - startScroll), 0),
        1,
      )

      setBoldCount(Math.floor(progress * totalLetters))
    }

    let frameId = 0
    function onScroll() {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateBoldCount)
    }

    updateBoldCount()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateBoldCount)
    mediaQuery.addEventListener('change', updateBoldCount)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateBoldCount)
      mediaQuery.removeEventListener('change', updateBoldCount)
    }
  }, [totalLetters])

  let letterOffset = 0

  return (
    <div
      ref={blockRef}
      className="scroll-bold-block"
      aria-label={paragraphs.join(' ')}
    >
      {letterGroups.map((letters, paragraphIndex) => {
        const paragraphStart = letterOffset
        letterOffset += letters.length

        return (
          <p key={paragraphIndex} className="scroll-bold-text">
            {letters.map((letter, letterIndex) => {
              const globalIndex = paragraphStart + letterIndex
              const isBold = globalIndex < boldCount

              return (
                <span
                  key={`${paragraphIndex}-${letterIndex}`}
                  className={`scroll-bold-letter${isBold ? ' is-bold' : ''}`}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

function useHoverCountUpFloat(target, isHovering, decimals = 1) {
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!isHovering) {
      setValue(target)
      return undefined
    }

    let frameId = 0
    const duration = 680
    const startTime = performance.now()
    setValue(0)

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Number((eased * target).toFixed(decimals)))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [decimals, isHovering, target])

  return value
}

function EducationCard({ item }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const [isHovering, setIsHovering] = useState(false)
  const percentCount = useHoverCountUp(item.level, isHovering && item.unit === 'percent')
  const percentileCount = useHoverCountUp(item.level, isHovering && item.unit === 'percentile')
  const cgpaCount = useHoverCountUpFloat(item.value, isHovering && item.unit === 'cgpa')
  const activeLevel =
    isHovering && item.unit === 'percent'
      ? percentCount
      : isHovering && item.unit === 'percentile'
        ? percentileCount
        : isHovering && item.unit === 'cgpa'
          ? Math.round(cgpaCount * 10)
          : item.level
  const ringOffset = circumference - (activeLevel / 100) * circumference
  const centerValue =
    item.unit === 'percent'
      ? `${isHovering ? percentCount : item.value}%`
      : item.unit === 'percentile'
        ? `${isHovering ? percentileCount : item.value}`
        : (isHovering ? cgpaCount : item.value).toFixed(1)
  const unitLabel = item.unit === 'cgpa' ? 'CGPA' : item.unit === 'percentile' ? 'Percentile' : null

  return (
    <article
      className={`education-card${isHovering ? ' is-hovering' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span>{item.id}</span>
      <div className="education-ring-chart" aria-hidden="true">
        <svg viewBox="0 0 80 80">
          <circle className="skill-ring-track" cx="40" cy="40" r={radius} />
          <circle
            className="skill-ring-progress skill-ring-progress-animated"
            cx="40"
            cy="40"
            r={radius}
            transform="rotate(-90 40 40)"
            strokeDasharray={circumference}
            strokeDashoffset={ringOffset}
          />
        </svg>
        <strong>
          {centerValue}
          {unitLabel ? <small>{unitLabel}</small> : null}
        </strong>
      </div>
      <h2>{item.title}</h2>
      <p>{item.board}</p>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="intro" id="top" aria-labelledby="intro-title">
        <div className="intro-copy">
          <p className="eyebrow">ABOUT ME · INDIA</p>
          <h1 id="intro-title">
            Hi, I&apos;m <NameDisplay />
          </h1>
          <ScrollBoldAboutText paragraphs={aboutParagraphs} />

          <section className="education" aria-labelledby="education-title">
            <p className="section-label" id="education-title">EDUCATION</p>
            <div className="education-grid">
              {educationItems.map((item) => (
                <EducationCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    skills: [
      { name: 'HTML', level: 92, detail: 'Semantic markup, forms, and accessibility basics' },
      { name: 'CSS', level: 88, detail: 'Flexbox, Grid, animations, and responsive layouts' },
      { name: 'JavaScript', level: 85, detail: 'DOM, ES6+, async logic, and interactive UI' },
      { name: 'React', level: 82, detail: 'Components, hooks, routing, and state management' },
      { name: 'Three.js', level: 78, detail: '3D scenes, models, lighting, and interactive WebGL experiences' },
      { name: 'Responsive Design', level: 90, detail: 'Mobile-first layouts that work on every screen' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 78, detail: 'Server-side JavaScript and npm-based workflows' },
      { name: 'Express.js', level: 76, detail: 'REST APIs, middleware, and route handling' },
      { name: 'SQL', level: 74, detail: 'Queries, schemas, and relational data modeling' },
      { name: 'MongoDB', level: 53, detail: 'NoSQL databases, collections, documents, and CRUD operations' },
      { name: 'API', level: 71, detail: 'Designing and consuming RESTful APIs with proper structure' },
      { name: 'Authentication', level: 63, detail: 'Login flows, tokens, sessions, and secure user access' },
    ],
  },
  {
    id: 'dsa',
    label: 'DSA in C++',
    skills: [
      { name: 'Array', level: 90, detail: 'Two pointers, sliding window, prefix sums, and array manipulation' },
      { name: 'Linked List', level: 81, detail: 'Traversal, reversal, cycle detection, and pointer-based problems' },
      { name: 'String', level: 86, detail: 'Pattern matching, hashing, substrings, and character-based logic' },
      { name: 'Graph', level: 70, detail: 'BFS, DFS, shortest paths, and graph traversal patterns' },
      { name: 'Tree', level: 79, detail: 'Binary trees, BST operations, traversals, and tree recursion' },
      { name: 'DP', level: 87, detail: 'Memoization, tabulation, and classic dynamic programming patterns' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', level: 85, detail: 'Version control, branches, and project hosting' },
      { name: 'Deployment', level: 72, detail: 'Building and shipping projects end to end' },
      { name: 'Docker', level: 68, detail: 'Containerizing apps, images, and consistent dev environments' },
    ],
  },
]

const skillStats = [
  { value: '150+', label: 'LeetCode Problems' },
  { value: '15+', label: 'Technologies' },
  { value: '4', label: 'Skill Areas' },
  { value: 'End-to-end', label: 'Project Delivery' },
]

function getCategoryAverage(skills) {
  const total = skills.reduce((sum, skill) => sum + skill.level, 0)
  return Math.round(total / skills.length)
}

function useHoverCountUp(target, isHovering) {
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!isHovering) {
      setValue(target)
      return undefined
    }

    let frameId = 0
    const duration = 680
    const startTime = performance.now()
    setValue(0)

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(eased * target))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isHovering, target])

  return value
}

function SkillRing({ skill, animate = false, index = 0 }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const [isHovering, setIsHovering] = useState(false)
  const displayLevel = useHoverCountUp(skill.level, isHovering)
  const activeLevel = isHovering ? displayLevel : animate ? skill.level : 0
  const ringOffset = circumference - (activeLevel / 100) * circumference

  return (
    <article
      className={`skill-ring${animate ? ' is-animated' : ''}${isHovering ? ' is-hovering' : ''}`}
      title={skill.detail}
      style={{ '--reveal-i': index }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="skill-ring-chart" aria-hidden="true">
        <svg viewBox="0 0 88 88">
          <circle className="skill-ring-track" cx="44" cy="44" r={radius} />
          <circle
            className="skill-ring-progress skill-ring-progress-animated"
            cx="44"
            cy="44"
            r={radius}
            transform="rotate(-90 44 44)"
            strokeDasharray={circumference}
            strokeDashoffset={ringOffset}
          />
        </svg>
        <strong>{activeLevel}%</strong>
      </div>
      <span className="skill-ring-name">{skill.name}</span>
    </article>
  )
}

function CategoryAverageRing({ average, active }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const [isHovering, setIsHovering] = useState(false)
  const displayLevel = useHoverCountUp(average, isHovering)
  const activeLevel = isHovering ? displayLevel : active ? average : 0
  const ringOffset = circumference - (activeLevel / 100) * circumference

  return (
    <div
      className={`skills-category-average${isHovering ? ' is-hovering' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle className="skill-ring-track" cx="36" cy="36" r={radius} />
        <circle
          className="skill-ring-progress is-accent skill-ring-progress-animated"
          cx="36"
          cy="36"
          r={radius}
          transform="rotate(-90 36 36)"
          strokeDasharray={circumference}
          strokeDashoffset={ringOffset}
        />
      </svg>
      <strong>{activeLevel}%</strong>
    </div>
  )
}

function SkillCategoryChart({ category, index }) {
  const reveal = useScrollReveal({ threshold: 0.14 })
  const average = getCategoryAverage(category.skills)

  return (
    <section
      ref={reveal.ref}
      className={`skills-category-panel skills-reveal-panel${reveal.isVisible ? ' is-visible' : ''}`}
      aria-labelledby={`${category.id}-title`}
      style={{ '--reveal-i': index }}
    >
      <div className="skills-category-panel-head">
        <p className="section-label" id={`${category.id}-title`}>
          {category.label.toUpperCase()}
        </p>
        <CategoryAverageRing average={average} active={reveal.isVisible} />
      </div>

      <div className="skills-ring-grid">
        {category.skills.map((skill, skillIndex) => (
          <SkillRing
            skill={skill}
            animate={reveal.isVisible}
            index={skillIndex}
            key={skill.name}
          />
        ))}
      </div>
    </section>
  )
}

function SkillsSection() {
  const headingReveal = useScrollReveal({ threshold: 0.28 })
  const statsReveal = useScrollReveal({ threshold: 0.18 })
  const toolsReveal = useScrollReveal({ threshold: 0.14 })
  const chartCategories = skillCategories.filter((category) =>
    ['frontend', 'backend', 'dsa'].includes(category.id),
  )
  const toolsCategory = skillCategories.find((category) => category.id === 'tools')

  return (
    <section className="skills-page" id="my-skills" aria-labelledby="skills-title">
      <div
        ref={headingReveal.ref}
        className={`skills-heading skills-reveal-heading${headingReveal.isVisible ? ' is-visible' : ''}`}
      >
        <p className="eyebrow">MY SKILLS</p>
        <h1 id="skills-title">
          Things I enjoy <span>building.</span>
        </h1>
        <p>
          Frontend, backend, and DSA skills at a glance — compact circular charts
          for a quick overview of where I spend most of my learning time.
        </p>
      </div>

      <div
        ref={statsReveal.ref}
        className={`skills-stats skills-reveal-group${statsReveal.isVisible ? ' is-visible' : ''}`}
        aria-label="Skill highlights"
      >
        {skillStats.map((stat, index) => (
          <article className="skills-stat" key={stat.label} style={{ '--reveal-i': index }}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="skills-chart-layout">
        {chartCategories.map((category, index) => (
          <SkillCategoryChart category={category} index={index} key={category.id} />
        ))}
      </div>

      {toolsCategory ? (
        <section
          ref={toolsReveal.ref}
          className={`skills-tools-panel skills-reveal-panel${toolsReveal.isVisible ? ' is-visible' : ''}`}
          aria-labelledby="tools-title"
          style={{ '--reveal-i': 3 }}
        >
          <p className="section-label" id="tools-title">
            {toolsCategory.label.toUpperCase()}
          </p>
          <div className="skills-tools-grid">
            {toolsCategory.skills.map((skill, index) => (
              <SkillRing
                skill={skill}
                animate={toolsReveal.isVisible}
                index={index}
                key={skill.name}
              />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  )
}

function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
      },
    )

    observer.observe(node)

    const rect = node.getBoundingClientRect()
    const inView =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    if (inView) {
      setIsVisible(true)
    }

    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, isVisible }
}

function ProjectsSection() {
  const headingReveal = useScrollReveal({ threshold: 0.35 })

  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div
        ref={headingReveal.ref}
        className={`projects-heading scroll-reveal${headingReveal.isVisible ? ' is-visible' : ''}`}
      >
        <p className="eyebrow">PROJECTS</p>
        <h1 id="projects-title">
          Work I&apos;ve <span>shipped.</span>
        </h1>
        <p>
          Real projects where I applied frontend, backend, and problem-solving skills —
          from polished UI to APIs, databases, and deployment.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const reveal = useScrollReveal()

  return (
    <article
      ref={reveal.ref}
      className={`project-card scroll-reveal${project.featured ? ' is-featured' : ''}${reveal.isVisible ? ' is-visible' : ''}`}
      style={{ '--reveal-i': index }}
    >
      <div className="project-card-top">
        <span>{String(index + 1).padStart(2, '0')}</span>
        {project.featured ? <em className="project-badge">Featured</em> : null}
      </div>

      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <ul className="project-tags" aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {project.live ? (
          <a href={project.live} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : (
          <span className="project-soon">Live soon</span>
        )}
      </div>
    </article>
  )
}

const projects = [
  {
    title: 'Interactive Developer Portfolio',
    description:
      'Personal portfolio with animated hero, skills showcase, and responsive layout built for performance and clean UX.',
    tags: ['React', 'Vite', 'CSS', 'JavaScript'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: true,
  },
  {
    title: 'Jarvis — Virtual Assistant',
    description:
      'Voice-powered virtual assistant inspired by Iron Man\'s Jarvis. Handles commands, answers queries, opens apps, and automates daily tasks with speech recognition and text-to-speech.',
    tags: ['Python', 'Speech Recognition', 'AI', 'Automation'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
  {
    title: 'REST API Backend Service',
    description:
      'Node.js and Express REST API with structured routes, middleware, validation, and SQL database integration for CRUD operations.',
    tags: ['Node.js', 'Express.js', 'SQL', 'REST'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
  {
    title: 'Task Manager Web App',
    description:
      'Full-stack task manager with create, update, delete flows, persistent storage, and a responsive interface for daily productivity.',
    tags: ['React', 'JavaScript', 'Node.js', 'SQL'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
  {
    title: 'Weather Dashboard',
    description:
      'Weather app that fetches live API data, displays conditions with a clean UI, and adapts smoothly across mobile and desktop screens.',
    tags: ['JavaScript', 'API', 'HTML', 'CSS'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
  {
    title: 'LeetCode Progress Tracker',
    description:
      'Dashboard to track DSA practice, topic-wise progress, and solved problem stats with focus on DP, recursion, and core patterns.',
    tags: ['C++', 'React', 'DSA', 'LeetCode'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
  {
    title: 'Blog Platform MVP',
    description:
      'Content platform with user posts, categories, and backend-powered data handling — built to practice end-to-end product development.',
    tags: ['Express.js', 'SQL', 'React', 'Deployment'],
    github: 'https://github.com/Harsh018-git',
    live: null,
    featured: false,
  },
]

const contactDetails = [
  {
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    label: 'Location',
    value: 'India',
    href: null,
  },
  {
    label: 'Availability',
    value: 'Open to internships & collaborations',
    href: null,
  },
]

const emptyForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ContactSection() {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n')

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
    setForm(emptyForm)
  }

  return (
    <section className="contact-page" id="contact-us" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow">CONTACT US</p>
        <h1 id="contact-title">
          Let&apos;s <span>connect.</span>
        </h1>
        <p>
          Have a project idea, internship opportunity, or just want to say hi?
          Send a message and I&apos;ll get back to you as soon as I can.
        </p>
      </div>

      <div className="contact-layout">
        <aside className="contact-info" aria-label="Contact information">
          <article className="contact-info-card">
            <p className="section-label">GET IN TOUCH</p>
            <h2>Open for new opportunities</h2>
            <p>
              I&apos;m always interested in web development projects, backend work,
              and problem-solving challenges. Feel free to reach out.
            </p>

            <ul className="contact-details-list">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  {item.href ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </li>
              ))}
            </ul>
          </article>

          <article className="contact-info-card">
            <p className="section-label">SOCIAL PROFILES</p>
            <div className="contact-social-links">
              {Object.entries(socialProfiles).map(([platform, href]) => (
                <a key={platform} href={href} target="_blank" rel="noreferrer">
                  <SocialIcon name={platform} />
                  <span>{platform}</span>
                </a>
              ))}
            </div>
          </article>
        </aside>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <p className="section-label">SEND A MESSAGE</p>

          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Your name"
                required
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@email.com"
                required
              />
            </label>
          </div>

          <label className="contact-field">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={updateField}
              placeholder="Project inquiry, collaboration, etc."
              required
            />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="Tell me about your idea or opportunity..."
              rows={6}
              required
            />
          </label>

          <button className="contact-submit" type="submit">
            Send Message
          </button>

          {submitted ? (
            <p className="contact-status" role="status">
              Thanks! Your email app should open with the message ready to send.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="page-shell">
      <Navigation />
      <HomePage />
    </main>
  )
}

export default App
