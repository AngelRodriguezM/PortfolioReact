import { useEffect } from "react"
import { useLocation } from "react-router"
import Hero from "../components/Hero"
import About from "../components/About"
import ProjectsPreview from "../components/ProjectsPreview"

function Home() {
    const { hash, key } = useLocation()

    // Router hash links don't scroll on their own; scroll to the target section
    useEffect(() => {
        if (!hash) return
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        document.getElementById(hash.slice(1))?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
        })
    }, [hash, key])

    return (
        <>
            <Hero />
            <About />
            <ProjectsPreview />
        </>
    )
}

export default Home
