import globe from '../Images/Globe.gif'

function Hero() {
    return (
        <section
            id="main"
            className="Pagesection grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-[5vh] md:gap-[2vh]
            bg-black  px-[5%] py-[10%] md:px-[2%]"
        >
            <div className="text-center md:text-left">
                <h1 className="font-heading leading-none text-[10vh] max-[425px]:text-[8vh] md:text-[15vh]">
                    Angel Rodriguez
                </h1>
                <h3
                    className="mt-[2%] mb-[2vh] text-[5vh] max-[425px]:text-[2.5vh] md:text-[4vh]
                    text-primario tracking-[5px]
                    [-webkit-text-stroke:0.25px_#ffffff] md:[-webkit-text-stroke:0.35px_#ffffff]"
                >
                    Junior Developer
                </h3>
                <h5 className="text-[2vh] max-[425px]:text-[1.5vh] text-secundario">
                    Software Engineering Student
                </h5>
            </div>

            <div className="relative [filter:saturate(300%)_hue-rotate(250deg)_contrast(7777%)]">
                <img src={globe} alt="Animated globe" className="w-[150px] md:w-auto" />
            </div>
        </section>
    )
}

export default Hero
