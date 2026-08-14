import './style.css'
import { profile, videos, type PortfolioVideo } from './data'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) throw new Error('Не найден корневой элемент приложения')

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="В начало страницы">
      <span class="brand__dot" aria-hidden="true"></span>
      <span>${profile.mark}</span>
    </a>
    <nav class="header-links" aria-label="Контакты">
      <a href="${profile.telegram}" target="_blank" rel="noreferrer">Telegram</a>
      <a href="tel:${profile.phone}">Телефон</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <p class="eyebrow reveal">${profile.eyebrow}</p>
      <h1 id="hero-title" class="reveal">${profile.heading}</h1>
      <div class="hero__footer reveal">
        <p>${profile.description}</p>
        <a class="round-link" href="${profile.telegram}" target="_blank" rel="noreferrer" aria-label="Написать в Telegram">
          <span>Обсудить проект</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </section>

    <section class="work" aria-labelledby="work-title">
      <div class="section-heading reveal">
        <h2 id="work-title">Избранные работы</h2>
        <span>${String(videos.length).padStart(2, '0')}</span>
      </div>
      <div class="gallery" aria-label="Галерея видеоработ"></div>
    </section>
  </main>

  <footer class="contact reveal">
    <p class="eyebrow">Есть идея?</p>
    <h2>Ваш продукт — в кадр.<br>Покупателя — в директ.</h2>
    <div class="contact__bottom">
      <a href="tel:${profile.phone}">${profile.phoneLabel}</a>
      <a href="${profile.telegram}" target="_blank" rel="noreferrer">Telegram ${profile.telegramName} ↗</a>
      <span>© ${new Date().getFullYear()} ${profile.name}</span>
    </div>
  </footer>

  <dialog class="viewer" aria-labelledby="viewer-title">
    <div class="viewer__bar">
      <p id="viewer-title">Просмотр видео</p>
      <button class="viewer__close" type="button" aria-label="Закрыть видео">
        <span></span><span></span>
      </button>
    </div>
    <div class="viewer__stage">
      <video controls playsinline preload="metadata"></video>
    </div>
  </dialog>
`

const gallery = app.querySelector<HTMLDivElement>('.gallery')!
const dialog = app.querySelector<HTMLDialogElement>('.viewer')!
const modalVideo = dialog.querySelector<HTMLVideoElement>('video')!
const modalTitle = dialog.querySelector<HTMLParagraphElement>('#viewer-title')!
const closeButton = dialog.querySelector<HTMLButtonElement>('.viewer__close')!
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')

let activePreview: HTMLVideoElement | null = null
let opener: HTMLButtonElement | null = null

function createCard(item: PortfolioVideo, index: number): HTMLElement {
  const article = document.createElement('article')
  article.className = 'video-card reveal'
  article.style.setProperty('--delay', `${Math.min(index, 7) * 55}ms`)

  const button = document.createElement('button')
  button.className = 'video-card__button'
  button.type = 'button'
  button.dataset.videoId = item.id
  button.style.aspectRatio = item.aspectRatio
  button.setAttribute('aria-label', `Смотреть видео: ${item.title}`)

  const video = document.createElement('video')
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.preload = 'metadata'
  video.poster = item.poster
  video.src = item.src
  video.tabIndex = -1

  const play = document.createElement('span')
  play.className = 'video-card__play'
  play.setAttribute('aria-hidden', 'true')
  play.innerHTML = '<svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5V7Z"/></svg>'

  button.append(video, play)
  article.append(button)

  const stopPreview = () => {
    video.pause()
    video.currentTime = 0
    button.classList.remove('is-playing')
    if (activePreview === video) activePreview = null
  }

  button.addEventListener('pointerenter', () => {
    if (!canHover.matches || reduceMotion.matches || dialog.open) return
    if (activePreview && activePreview !== video) {
      activePreview.pause()
      activePreview.currentTime = 0
      activePreview.closest('button')?.classList.remove('is-playing')
    }
    activePreview = video
    void video.play().then(() => button.classList.add('is-playing')).catch(() => undefined)
  })
  button.addEventListener('pointerleave', stopPreview)
  button.addEventListener('click', () => openViewer(item, button, video.currentTime))

  previewObserver.observe(article)
  return article
}

function openViewer(item: PortfolioVideo, button: HTMLButtonElement, currentTime = 0): void {
  activePreview?.pause()
  button.classList.remove('is-playing')
  opener = button
  modalTitle.textContent = item.title
  modalVideo.src = item.src
  modalVideo.poster = item.poster
  modalVideo.currentTime = Number.isFinite(currentTime) ? currentTime : 0
  dialog.showModal()
  document.body.classList.add('modal-open')
  closeButton.focus()
  void modalVideo.play().catch(() => undefined)
}

function closeViewer(): void {
  modalVideo.pause()
  dialog.close()
}

const previewObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) continue
      const video = entry.target.querySelector<HTMLVideoElement>('video')
      if (!video || video.paused) continue
      video.pause()
      video.currentTime = 0
      video.closest('button')?.classList.remove('is-playing')
      if (activePreview === video) activePreview = null
    }
  },
  { threshold: 0.05 },
)

videos.forEach((item, index) => gallery.append(createCard(item, index)))

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
)

document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => revealObserver.observe(element))

closeButton.addEventListener('click', closeViewer)
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeViewer()
})
dialog.addEventListener('cancel', (event) => {
  event.preventDefault()
  closeViewer()
})
dialog.addEventListener('close', () => {
  modalVideo.removeAttribute('src')
  modalVideo.load()
  document.body.classList.remove('modal-open')
  opener?.focus()
  opener = null
})

reduceMotion.addEventListener('change', () => {
  if (!reduceMotion.matches || !activePreview) return
  activePreview.pause()
  activePreview.currentTime = 0
  activePreview.closest('button')?.classList.remove('is-playing')
  activePreview = null
})
