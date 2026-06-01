
import ProjectCard from "../components/ProjectCard";
import './PagesCss/Projects.css'
import placeholder from '../Images/Placeholder_view_vector.svg.png'
function Projects(){
    return(<>
    <h1>Hello World</h1>

    <div className="projectsGrid">

    <ProjectCard name='hello1' image={placeholder} ></ProjectCard>


    </div>
    </>);

}
export default Projects