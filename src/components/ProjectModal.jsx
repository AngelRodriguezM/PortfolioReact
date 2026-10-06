import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { FaXmark } from 'react-icons/fa6'
import { DURATION, FADE, prefersReducedMotion } from './modalTiming'

const EASE = 'cubic-bezier(1, 0.04, 0, 1.29)'
// Same curve without the overshoot, used when closing
const EASE_CLOSE = 'cubic-bezier(1, 0.04, 0, 1)'

const toBox = (r) => ({ top: r.top, left: r.left, width: r.width, height: r.height })

function targetBox() {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const small = vw <= 768
    const width = Math.min(900, vw * (small ? 0.94 : 0.92))
    const height = Math.min(720, vh * (small ? 0.85 : 0.8))
    return { top: (vh - height) / 2, left: (vw - width) / 2, width, height }
}

function ProjectModal({ project, originRect, getCardRect, onCloseStart, onClosed }) {
    const { title, image, imageAlt, description = [], links = [] } = project
    const [phase, setPhase] = useState('opening')
    const [box, setBox] = useState(() => toBox(originRect))
    const dialogRef = useRef(null)
    const closeRef = useRef(null)
    const finished = useRef(false)

    const duration = prefersReducedMotion() ? 0 : DURATION

    // Start at the card's rect, then expand to the centered target on the next frames
    useLayoutEffect(() => {
        let raf2
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                setBox(targetBox())
                setPhase('open')
            })
        })
        return () => {
            cancelAnimationFrame(raf1)
            cancelAnimationFrame(raf2)
        }
    }, [])

    const finish = useCallback(() => {
        if (finished.current) return
        finished.current = true
        onClosed()
    }, [onClosed])

    const close = useCallback(() => {
        if (phase === 'closing') return
        setBox(toBox(getCardRect() ?? originRect))
        setPhase('closing')
        onCloseStart()
    }, [phase, getCardRect, originRect, onCloseStart])

    // Fallback in case transitionend never fires
    useEffect(() => {
        if (phase !== 'closing') return
        const id = setTimeout(finish, duration + 100)
        return () => clearTimeout(id)
    }, [phase, duration, finish])

    // Keep the open window centered on resize
    useEffect(() => {
        if (phase !== 'open') return
        const onResize = () => setBox(targetBox())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [phase])

    // Lock page scroll while open
    useEffect(() => {
        const { overflow, paddingRight } = document.body.style
        // Replace the scrollbar's width with padding so the page doesn't shift sideways
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        if (scrollbarWidth > 0) {
            const current = parseFloat(getComputedStyle(document.body).paddingRight) || 0
            document.body.style.paddingRight = `${current + scrollbarWidth}px`
        }
        return () => {
            document.body.style.overflow = overflow
            document.body.style.paddingRight = paddingRight
        }
    }, [])

    useEffect(() => {
        closeRef.current?.focus()
    }, [])

    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault()
            close()
            return
        }
        if (e.key !== 'Tab') return
        const focusable = dialogRef.current.querySelectorAll('a[href], button:not([disabled])')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
        }
    }

    const isOpen = phase === 'open'
    const isClosing = phase === 'closing'

    return createPortal(
        <div className="fixed inset-0 z-50" onKeyDown={onKeyDown}>
            <div
                aria-hidden="true"
                onClick={close}
                className="absolute inset-0 bg-black/60"
                style={{
                    opacity: isOpen ? 1 : 0,
                    transition: `opacity ${duration}ms ease`,
                }}
            />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                onTransitionEnd={(e) => {
                    if (isClosing && e.target === e.currentTarget && e.propertyName === 'width') finish()
                }}
                className="absolute rounded-[15px] backdrop-blur-[20px] border-solid border-secundario
                shadow-[0_0_15px_var(--color-secundario)] overflow-hidden"
                style={{
                    ...box,
                    // Starts (and ends) looking like the card, then settles into the dark window
                    backgroundColor: isOpen ? 'var(--highlight)' : 'var(--highlight)',
                    borderWidth: isOpen ? '1px' : '3px 0',
                    // Fade out over the last moments of the shrink while the card fades in beneath
                    opacity: isClosing ? 0 : 1,
                    transition: [
                        ...['top', 'left', 'width', 'height', 'background-color', 'border-width'].map(
                            (prop) => `${prop} ${duration}ms ${isClosing ? EASE_CLOSE : EASE}`
                        ),
                        `opacity ${duration ? FADE : 0}ms ease ${isClosing ? Math.max(duration - FADE, 0) : 0}ms`,
                    ].join(', '),
                }}
            >
                <div
                    className={`h-full p-6 md:p-10 ${isOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}
                    style={{
                        opacity: isOpen ? 1 : 0,
                        transition: `opacity ${isOpen ? 300 : 150}ms ease ${isOpen ? duration * 0.4 : 0}ms`,
                    }}
                >
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        aria-label="Close project details"
                        className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full text-blanco bg-highlight
                        hover:text-secundario transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-secundario"
                    >
                        <FaXmark aria-hidden="true" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start leading-[1.75]">
                        <img
                            src={image}
                            alt={imageAlt ?? title}
                            className="rounded-[10px] w-full max-w-[min(520px,100%)] md:max-w-[300px] h-auto justify-self-center"
                        />
                        <div>
                            <h2 id="project-modal-title" className="font-heading text-[1.5rem] md:text-[2rem] mb-4 pr-10">
                                {title}
                            </h2>
                            {description.map((paragraph) => (
                                <p key={paragraph} className="mb-4 text-blanco/80">{paragraph}</p>
                            ))}
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block underline text-blanco hover:text-secundario transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

ProjectModal.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        description: PropTypes.arrayOf(PropTypes.string),
        links: PropTypes.arrayOf(
            PropTypes.shape({ label: PropTypes.string.isRequired, href: PropTypes.string.isRequired })
        ),
    }).isRequired,
    originRect: PropTypes.object.isRequired,
    getCardRect: PropTypes.func.isRequired,
    onCloseStart: PropTypes.func.isRequired,
    onClosed: PropTypes.func.isRequired,
}

export default ProjectModal
