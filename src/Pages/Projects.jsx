import { useCallback, useRef, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import ProjectModal from "../components/ProjectModal"
import { DURATION, FADE, prefersReducedMotion } from "../components/modalTiming"
import projectsData from "../data/projectsData"

const gridPlacement = [
    '',
    'md:col-start-2 md:row-start-2',
    'md:col-start-1 md:row-start-3',
    'md:col-start-2 md:row-start-4',
    'md:col-start-1 md:row-start-5',
    'md:col-start-2 md:row-start-6',
]

function Projects() {
    const [selected, setSelected] = useState(null)
    const cardRefs = useRef({})

    const getCardRect = useCallback(
        () => (selected ? cardRefs.current[selected.project.id]?.getBoundingClientRect() : null),
        [selected]
    )

    const handleCloseStart = useCallback(
        () => setSelected((current) => (current ? { ...current, closing: true } : current)),
        []
    )

    const handleClosed = useCallback(() => {
        const id = selected?.project.id
        setSelected(null)
        // Return focus to the card once it is visible again
        requestAnimationFrame(() => cardRefs.current[id]?.focus())
    }, [selected])

    return (
        <section id="projects">
            <h1 className="font-heading tracking-[2.5px] text-center pt-[5%]">Projects &amp; Skills</h1>

            <div className="projectsGrid grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-[2vh] px-[5%] md:px-[10%] pt-[5%] pb-[10%]">
                {projectsData.map((project, index) => {
                    const covered = selected?.project.id === project.id
                    const fade = prefersReducedMotion() ? 0 : FADE
                    return (
                    <div
                        key={project.id}
                        className={`animate-pop-in ${gridPlacement[index]}`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            // Hidden under the modal; fades back in as the modal fades out on close
                            opacity: covered && !selected.closing ? 0 : 1,
                            transition: `opacity ${fade}ms ease ${covered && selected.closing && fade ? DURATION - FADE : 0}ms`,
                        }}
                    >
                        <ProjectCard
                            ref={(el) => { cardRefs.current[project.id] = el }}
                            title={project.title}
                            image={project.cardImage ?? project.image}
                            icon={project.icon}
                            onOpen={(rect) => setSelected({ project, rect })}
                        />
                    </div>
                    )
                })}
            </div>

            {selected && (
                <ProjectModal
                    project={selected.project}
                    originRect={selected.rect}
                    getCardRect={getCardRect}
                    onCloseStart={handleCloseStart}
                    onClosed={handleClosed}
                />
            )}
        </section>
    )
}

export default Projects
