import './style.css'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initYear() {
  const el = document.getElementById('year')
  if (el) el.textContent = String(new Date().getFullYear())
}

function initMobileNav() {
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle')
  const panel = document.getElementById('mobile-nav')
  if (!toggle || !panel) return

  const close = () => {
    panel.hidden = true
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true')
    panel.hidden = open
  })

  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', close))
}

function initReveal() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
}

function initRail() {
  const dots = document.querySelectorAll<HTMLElement>('.rail-dot')
  const sections = document.querySelectorAll<HTMLElement>('[data-section]')
  if (!dots.length || !sections.length) return

  const map = new Map<string, HTMLElement>()
  sections.forEach((section) => {
    const key = section.dataset.section
    if (key) map.set(key, section)
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = (entry.target as HTMLElement).dataset.section
        if (!id) return
        dots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.section === id))
      })
    },
    { threshold: 0.45 },
  )

  sections.forEach((section) => observer.observe(section))
}

function initCounters() {
  const stats = document.querySelectorAll<HTMLElement>('.stat-value[data-count]')
  if (prefersReducedMotion) {
    stats.forEach((el) => {
      const target = Number(el.dataset.count)
      el.textContent = String(target)
    })
    return
  }

  const animate = (el: HTMLElement) => {
    const target = Number(el.dataset.count)
    const duration = 900
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = String(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.6 },
  )

  stats.forEach((el) => observer.observe(el))
}

function initProjectCards() {
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        card.classList.toggle('is-expanded')
      }
    })
    card.addEventListener('click', () => card.classList.toggle('is-expanded'))
  })
}

initYear()
initMobileNav()
initReveal()
initRail()
initCounters()
initProjectCards()
