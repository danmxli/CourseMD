import { FiPlus, FiDownload, FiSave, FiCode } from "react-icons/fi";

export default function GooeyMenu() {
    return (
        <div className="absolute bottom-0 right-0 h-[300px]">
            <nav className="menu">
                <input type="checkbox" className="peer hidden" name="menu" id="menu" />
                <label
                    className="absolute bottom-12 right-12 z-10 flex h-14 w-14 scale-125 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-300 peer-checked:rotate-[135deg] peer-checked:scale-100"
                    htmlFor="menu"
                >
                    <FiPlus className="h-5 w-5" />
                </label>
                <button
                    className="absolute bottom-12 right-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-80px]"
                >
                    <FiDownload className="h-5 w-5" />
                </button>
                <button
                    className="absolute bottom-12 right-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-162px]"
             >
                    <FiSave className="h-5 w-5" />
                </button>
                <button
                    className="absolute bottom-12 right-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-244px]"
                >
                    <FiCode className="h-5 w-5" />
                </button>
            </nav>
            <svg
                className="absolute hidden"
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
