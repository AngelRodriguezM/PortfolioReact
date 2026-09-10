import PropTypes from 'prop-types'

function ProjectCard({ title, image, icon: Icon }) {
    return (
        <div
            className="group relative flex items-center justify-center rounded-[15px] w-[150px] h-[150px] md:w-[200px] md:h-[200px]
            bg-highlight backdrop-blur-[150px] border-t-[3px] border-b-[3px] border-highlight cursor-pointer
            shadow-[0_0_5px_var(--color-secundario)] transition-all duration-300 ease-[cubic-bezier(0.42,0,0.15,1.32)]
            hover:scale-[1.15] hover:shadow-[0_0_10px_var(--color-secundario)]
            md:hover:scale-100 md:hover:w-[350px] md:hover:h-[275px] md:hover:shadow-[0_0_15px_var(--color-secundario)] md:hover:border-secundario

            after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
            after:w-1/4 after:h-1/4 after:rounded-[15px] after:bg-secundario after:-z-10 after:blur-[1.5rem] after:opacity-10
            after:transition-all after:duration-500 after:animate-pulse-glow
            hover:after:opacity-20 hover:after:w-[90%] hover:after:h-[90%] hover:after:rounded-[25px]"
        >
            <div className="flex flex-col items-center justify-center text-center p-[4%]">
                <Icon
                    className="text-[3rem] md:text-[4rem] text-blanco/70 mb-2.5 transition-all duration-500
                    group-hover:opacity-0 group-hover:text-[0rem] group-hover:mb-0"
                />
                <img
                    src={image}
                    alt={title}
                    className="rounded-[15px] opacity-0 w-0 h-auto mb-2.5 transition-all duration-500
                    group-hover:opacity-100 group-hover:w-[55%] group-hover:relative"
                />
                <h2
                    className="mt-2.5 font-heading text-[0.8rem] md:text-[1.25rem] text-blanco tracking-[2px] opacity-50
                    transition-all duration-500 group-hover:opacity-100"
                >
                    {title}
                </h2>
            </div>
        </div>
    )
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default ProjectCard
