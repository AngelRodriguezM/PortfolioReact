import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

// Scrolls to the top on navigation, including re-clicking the link for the current page.
// Hash links (e.g. /#about) are handled by the page that owns the section.
function ScrollToTop() {
    const { pathname, hash, key } = useLocation()
    const previousPath = useRef(pathname)

    useEffect(() => {
        const samePage = previousPath.current === pathname
        previousPath.current = pathname
        if (hash) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: samePage && !reduceMotion ? 'smooth' : 'auto' })
    }, [pathname, hash, key])

    return null
}

export default ScrollToTop
