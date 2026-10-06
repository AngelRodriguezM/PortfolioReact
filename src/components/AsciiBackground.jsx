import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const GLYPHS = ['—', '/', '|', '\\', '—', '/', '|', '\\']
//AI code
// Decorative animated ASCII field. Fills its nearest positioned ancestor.
function AsciiBackground({ minOpacity = 0.08, maxOpacity = 0.25 }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (!context) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        let width = 0
        let height = 0
        let time = 0
        let previousFrame = null
        let animationId = null
        let visible = true

        function draw() {
            if (!width || !height) return

            context.clearRect(0, 0, width, height)
            context.font = '12px monospace'
            context.textAlign = 'center'
            context.textBaseline = 'middle'

            for (let y = 8; y < height; y += 13) {
                for (let x = 7; x < width; x += 10) {
                    const nx = x / width
                    const ny = y / height

                    // Slowly move the centre of the swirling pattern
                    const dx = nx - (0.56 + 0.14 * Math.sin(time * 0.3))
                    const dy = ny - (0.48 + 0.12 * Math.cos(time * 0.4))

                    // Combine a circular field with a travelling wave
                    const angle = Math.atan2(dy, dx) + Math.sin(nx * 8 + ny * 5 - time) * 0.8 + time * 0.15

                    // Map the angle to one of eight character directions
                    const index = ((Math.round(angle / (Math.PI / 4)) % 8) + 8) % 8

                    const wave = Math.sin(nx * 10 + Math.cos(ny * 7 + time * 0.4) - time * 0.65)

                    const opacity = minOpacity + ((maxOpacity - minOpacity) * (wave + 1)) / 2
                    const character = wave > 0.88 ? '+' : GLYPHS[index]

                    context.fillStyle = `rgba(255, 255, 255, ${opacity})`
                    context.fillText(character, x, y)
                }
            }
        }

        function resize() {
            const bounds = canvas.getBoundingClientRect()
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

            width = bounds.width
            height = bounds.height

            canvas.width = Math.round(width * pixelRatio)
            canvas.height = Math.round(height * pixelRatio)

            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            draw()
        }

        function animate(now) {
            const delta = previousFrame === null ? 0 : Math.min((now - previousFrame) / 1000, 0.05)
            previousFrame = now
            time += delta
            draw()
            animationId = window.requestAnimationFrame(animate)
        }

        // Animate only while on screen and when motion is allowed
        function sync() {
            const shouldRun = visible && !reducedMotion.matches
            if (shouldRun && animationId === null) {
                previousFrame = null
                animationId = window.requestAnimationFrame(animate)
            } else if (!shouldRun && animationId !== null) {
                window.cancelAnimationFrame(animationId)
                animationId = null
            }
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            sync()
        })
        intersectionObserver.observe(canvas)

        reducedMotion.addEventListener('change', sync)

        resize()
        sync()

        return () => {
            if (animationId !== null) window.cancelAnimationFrame(animationId)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            reducedMotion.removeEventListener('change', sync)
        }
    }, [minOpacity, maxOpacity])

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 block w-full h-full pointer-events-none" />
}

AsciiBackground.propTypes = {
    minOpacity: PropTypes.number,
    maxOpacity: PropTypes.number,
}

export default AsciiBackground
