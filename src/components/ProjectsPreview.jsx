import { Link } from 'react-router'
import ProjectFeature from './ProjectFeature'
import projectsData from '../data/projectsData'

function ProjectsPreview() {
    return (
        <section id="projects" className="flex flex-col items-center gap-[5vh] px-[5%] py-[10%] md:py-[5%]">
            <div className="textContainer flex flex-col text-center">

            <h2 className="font-heading tracking-[2.5px] text-center">Projects &amp; Skills</h2>
            <p className='text-ink-muted'>Most Recent Project</p>
            </div>

            <ProjectFeature project={projectsData[0]} />

            <Link
                to="/Projects"
                className="px-4 py-2 text-[1.2rem] rounded-[30px] bg-glass backdrop-blur-[20px] border-t-2 border-b-2 border-glass-edge text-ink
                tracking-normal transition-[letter-spacing,box-shadow] duration-500 ease-[cubic-bezier(0.61,0.01,0,1.37)]
                shadow-card hover:tracking-[3px] hover:shadow-card-hover focus-visible:tracking-[3px]
                focus-visible:outline-2 focus-visible:outline-accent motion-reduce:transition-none"
            >
                More Projects
            </Link>
        </section>
    )
}

export default ProjectsPreview
