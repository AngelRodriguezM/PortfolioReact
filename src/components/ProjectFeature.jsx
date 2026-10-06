import PropTypes from 'prop-types'

const glass = `bg-highlight backdrop-blur-[20px] border border-secundario shadow-[0_0_5px_var(--color-secundario)] rounded-[12px] md:rounded-[15px] `

function ProjectFeature({ project }) {
    const { title, image, imageAlt, description = [], links = [] } = project

    return (
        <article className="grid  grid-cols-1 md:grid-cols-[auto_1fr] gap-[5vh] items-center justify-items-center max-w-[1200px] mx-auto w-full">
            <div
                className={`${glass} p-[5%] md:p-8 transition-transform duration-300 ease-[cubic-bezier(0.44,0,0,1.44)]
                hover:[transform:perspective(600px)_rotateY(20deg)_scale(1.05)] motion-reduce:transition-none motion-reduce:hover:transform-none`}
            >
                <img
                    src={image}
                    alt={imageAlt ?? title}
                    loading="lazy"
                    className="rounded-[10px] w-full max-w-[250px] md:max-w-[250px] max-[768px]:max-w-[min(520px,100%)] h-auto"
                />
            </div>

            <div className={`${glass} p-8 max-[576px]:p-5 md:justify-self-stretch leading-[1.75] max-[576px]:text-[0.98rem]`}>
                <h3 className="font-heading  text-[1.5rem] max-[576px]:text-[1.25rem] mb-4">{title}</h3>
                {description.map((paragraph) => (
                    <p key={paragraph} className="mb-4 text-blanco/80">{paragraph}</p>
                ))}
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block underline text-blanco hover:text-secundario transition-colors duration-300"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </article>
    )
}

ProjectFeature.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        description: PropTypes.arrayOf(PropTypes.string),
        links: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                href: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
}

export default ProjectFeature
