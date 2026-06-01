import PropTypes from 'prop-types'
import './css/ProjectCard.css'

function ProjectCard({name, image}) {
    return (
        <>
        <div className="projectCard">
            <div className="projectImage">
                <img src={image} alt="" />
            </div>
            <div className="projectTitle">
                <h2>{name}</h2>
            </div>


        </div>
        </>

    )

    
}

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ProjectCard