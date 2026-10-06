import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const ATLAS_GLYPHS = ['—', '/', '|', '\\', '+']
// Eight directions (—, /, |, \ twice round the circle) plus '+' at index 8 -> atlas column
const ATLAS_INDEX = [0, 1, 2, 3, 0, 1, 2, 3, 4]
const PLUS = 8
const LEVELS = 16 // opacity steps baked into the atlas
const CELL_W = 12
const CELL_H = 14
const COLOR = '#db0303'
const FRAME_MS = 1000 / 30
//AI code
// Decorative animated ASCII field. Fills its nearest positioned ancestor.
function AsciiBackground({ minOpacity = 0.25, maxOpacity = 0.5 }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (!context) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        let width = 0
        let height = 0
        let pixelRatio = 1
        let time = 0
        let previousFrame = null
        let lastDraw = 0
        let animationId = null
        let visible = true

        // Grid positions, recomputed only on resize
        let xs = []
        let ys = []
        let nxs = new Float32Array(0)
        let nys = new Float32Array(0)

        // Every glyph at every opacity level, rasterised once and copied with drawImage
        const atlas = document.createElement('canvas')
        const atlasContext = atlas.getContext('2d')

        function buildAtlas() {
            atlas.width = ATLAS_GLYPHS.length * CELL_W * pixelRatio
            atlas.height = LEVELS * CELL_H * pixelRatio
            atlasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            atlasContext.font = '12px monospace'
            atlasContext.textAlign = 'center'
            atlasContext.textBaseline = 'middle'
            atlasContext.fillStyle = COLOR

            for (let level = 0; level < LEVELS; level++) {
                atlasContext.globalAlpha = minOpacity + ((maxOpacity - minOpacity) * level) / (LEVELS - 1)
                ATLAS_GLYPHS.forEach((glyph, column) => {
                    atlasContext.fillText(glyph, column * CELL_W + CELL_W / 2, level * CELL_H + CELL_H / 2)
                })
            }
        }

        function draw() {
            if (!width || !height) return

            context.clearRect(0, 0, width, height)

            // Slowly move the centre of the swirling pattern
            const centreX = 0.56 + 0.14 * Math.sin(time * 0.3)
            const centreY = 0.48 + 0.12 * Math.cos(time * 0.4)
            const spin = time * 0.15
            const sourceW = CELL_W * pixelRatio
            const sourceH = CELL_H * pixelRatio

            for (let row = 0; row < ys.length; row++) {
                const ny = nys[row]
                const dy = ny - centreY
                const rowWave = Math.cos(ny * 7 + time * 0.4) - time * 0.65
                const rowSwirl = ny * 5 - time
                const destY = ys[row] - CELL_H / 2

                for (let column = 0; column < xs.length; column++) {
                    const nx = nxs[column]

                    // Combine a circular field with a travelling wave
                    const angle = Math.atan2(dy, nx - centreX) + Math.sin(nx * 8 + rowSwirl) * 0.8 + spin

                    // Map the angle to one of eight character directions
                    const index = ((Math.round(angle / (Math.PI / 4)) % 8) + 8) % 8

                    const wave = Math.sin(nx * 10 + rowWave)
                    const level = Math.round(((wave + 1) / 2) * (LEVELS - 1))
                    const glyph = ATLAS_INDEX[wave > 0.88 ? PLUS : index]

                    context.drawImage(
                        atlas,
                        glyph * sourceW, level * sourceH, sourceW, sourceH,
                        xs[column] - CELL_W / 2, destY, CELL_W, CELL_H,
                    )
                }
            }
        }

        function resize() {
            const bounds = canvas.getBoundingClientRect()
            const nextRatio = Math.min(window.devicePixelRatio || 1, 2)

            width = bounds.width
            height = bounds.height

            canvas.width = Math.round(width * nextRatio)
            canvas.height = Math.round(height * nextRatio)
            context.setTransform(nextRatio, 0, 0, nextRatio, 0, 0)

            if (nextRatio !== pixelRatio || atlas.width === 0) {
                pixelRatio = nextRatio
                buildAtlas()
            }

            xs = []
            ys = []
            for (let x = 7; x < width; x += 10) xs.push(x)
            for (let y = 8; y < height; y += 13) ys.push(y)
            nxs = Float32Array.from(xs, (x) => x / width)
            nys = Float32Array.from(ys, (y) => y / height)

            draw()
        }

        function animate(now) {
            animationId = window.requestAnimationFrame(animate)

            const delta = previousFrame === null ? 0 : Math.min((now - previousFrame) / 1000, 0.05)
            previousFrame = now
            time += delta

            // The pattern drifts slowly, so 30fps looks the same and halves the work
            if (now - lastDraw < FRAME_MS) return
            lastDraw = now
            draw()
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

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 block w-full h-full pointer-events-none " />
}

AsciiBackground.propTypes = {
    minOpacity: PropTypes.number,
    maxOpacity: PropTypes.number,
}

export default AsciiBackground
