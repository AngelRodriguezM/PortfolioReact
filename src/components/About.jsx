import { Link } from 'react-router'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import AsciiBackground from './AsciiBackground'
import ContentBox from "./UI components/contentBox"
import pfp from '../Images/Elgato.jpg'

function About() {
    return (
        <section id="about" className="relative isolate overflow-hidden bg-primario flex items-center justify-center p-[5%]">
            <AsciiBackground />
            <ContentBox className="grid grid-cols-1 md:grid-cols-2 gap-[5vh] md:gap-[2vh] items-center !p-[5%]">
                <div className="flex flex-col gap-4 text-center md:text-left">
                <h2>
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-3 font-heading text-[3rem] md:text-[5rem] leading-none tracking-[2.5px] text-blanco hover:text-secundario transition-colors duration-500"
                    >
                        About Me
                        <FaArrowUpRightFromSquare className="text-base text-secundario" aria-hidden="true" />
                    </Link>
                </h2>
                <p className="text-blanco/70 leading-relaxed">
                    A software engineering student who turns ideas into clean, usable web apps and small AI tools with the belief that UI should not only be good looking but fun
                </p>
                </div>

                <Link
                    to="/about"
                    aria-label="Go to About page"
                    className="group flex items-center justify-center"
                >
                    <div className="relative w-[180px] h-[180px]">
                        <div
                            aria-hidden="true"
                            className="absolute -inset-2 rounded-full bg-[conic-gradient(#c31432,#659999,#c31432)] animate-spin-angle motion-reduce:animate-none
                            [background:conic-gradient(from_var(--angle)_at_50%_50%,#c31432,#659999,#c31432)]"
                        />
                        <img
                            src={pfp}
                            alt=""
                            className="relative w-[180px] h-[180px] rounded-full object-cover border-4 border-primario-oscuro
                            transition-transform duration-500 ease-[cubic-bezier(0.02,0.76,0.58,1)] group-hover:scale-110 motion-reduce:transition-none"
                        />
                    </div>
                </Link>
            </ContentBox>
        </section>
    )
}

export default About
