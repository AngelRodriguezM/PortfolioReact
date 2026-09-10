import ProjectCard from "../components/ProjectCard"
import projectsData from "../data/projectsData"

const gridPlacement = [
    '',
    'md:col-start-2 md:row-start-2',
    'md:col-start-1 md:row-start-3',
    'md:col-start-2 md:row-start-4',
    'md:col-start-1 md:row-start-5',
]

function Projects() {
    return (
        <section id="projects">
            <h1 className="font-heading tracking-[2.5px] text-center pt-[5%]">Projects &amp; Skills</h1>

            <div className="projectsGrid grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-[2vh] px-[5%] md:px-[10%] pt-[5%] pb-[10%]">
                {projectsData.map((project, index) => (
                    <div
                        key={project.id}
                        className={`animate-pop-in ${gridPlacement[index]}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <ProjectCard title={project.title} image={project.image} icon={project.icon} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
