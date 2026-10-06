import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const ProjectCard = forwardRef(function ProjectCard({ title, image, icon: Icon, onOpen }, ref) {
    return (
        <button
            type="button"
            ref={ref}
            onClick={(e) => onOpen(e.currentTarget.getBoundingClientRect())}
            aria-haspopup="dialog"
            className={`group relative isolate flex items-center justify-center rounded-[15px] w-[150px] h-[150px] md:w-[200px] md:h-[200px]
            bg-glass backdrop-blur-[150px] border-t-[3px] border-b-[3px] border-glass-edge cursor-pointer text-ink
            shadow-card transition-all duration-300 ease-[cubic-bezier(0.42,0,0.15,1.32)]
            hover:scale-[1.15] hover:shadow-card-hover
            md:hover:scale-100 md:hover:w-[350px] md:hover:h-[275px] md:hover:shadow-card-hover md:hover:border-accent
            focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4
            motion-reduce:transition-none

            before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:rounded-t-[15px]
            before:bg-linear-to-b before:from-gloss before:to-transparent before:pointer-events-none before:z-[1]

            after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
            after:w-1/4 after:h-1/4 after:rounded-[15px] after:bg-accent after:-z-10 after:blur-[1.5rem] after:opacity-10
            after:transition-all after:duration-500 after:animate-pulse-glow motion-reduce:after:animate-none
            hover:after:opacity-20 hover:after:w-[90%] hover:after:h-[90%] hover:after:rounded-[25px]`}
        >
            <span className="relative z-[2] flex flex-col items-center justify-center text-center p-[4%]">
                <Icon
                    aria-hidden="true"
                    className="text-[3rem] md:text-[4rem] text-ink-subtle mb-2.5 transition-all duration-500
                    group-hover:opacity-0 group-hover:text-[0rem] group-hover:mb-0"
                />
                <img
                    src={image}
                    alt=""
                    className="rounded-[15px] opacity-0 w-0 h-auto mb-2.5 transition-all duration-500
                    group-hover:opacity-100 group-hover:w-[55%] group-hover:relative"
                />
                <span
                    className="mt-2.5 font-heading text-[0.8rem] md:text-[1.25rem] font-bold text-ink-subtle tracking-[2px]
                    transition-all duration-500 group-hover:text-ink"
                >
                    {title}
                </span>
            </span>
        </button>
    )
})

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ProjectCard
