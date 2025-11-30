import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";

const Panel = ({ data, isActive, onClick, isAnyActive }) => {
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            gsap.to(panelRef.current, {
                flexGrow: 1,
                duration: 0.8,
                ease: "power3.inOut",
                minWidth: "60vw",
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.4,
                display: "flex",
            });

            gsap.to(textRef.current, {
                opacity: 0,
                duration: 0.3,
            });
        } else {
            gsap.to(panelRef.current, {
                flexGrow: 0,
                duration: 0.8,
                ease: "power3.inOut",
                minWidth: isAnyActive ? "60px" : "8vw",
            });

            gsap.to(contentRef.current, {
                opacity: 0,
                duration: 0.3,
                display: "none",
            });

            gsap.to(textRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.4,
            });
        }
    }, [isActive, isAnyActive]);

    return (
        <div
            ref={panelRef}
            onClick={!isActive ? onClick : undefined}
            style={{ backgroundColor: data.color }}
            className={`panel relative flex flex-col h-full overflow-hidden cursor-pointer border-r border-black/10 min-w-[8vw]`}
        >
            {/* Collapsed Panel */}
            <div
                ref={textRef}
                className="panel-collapsed absolute inset-0 flex flex-col justify-between items-center px-2 py-5"
            >
                {/* Header */}
                <div className="flex gap-2 h-1/3">
                    <span className="vertical-text leading-none text-[12px] tracking-[2px] font-dmsans font-semibold ">
                        {data.title}
                    </span>
                    <img
                        src={data.image}
                        alt="thumb"
                        className="w-16 h-16 object-cover"
                    />

                </div>

                {/* Center Large Text */}
                <div className="flex flex-col items-center justify-center opacity-80 h-fit py-10 border-y font-eight">
                    <h1 className="font-eight text-2xl leading-[0.9]">WEB</h1>
                    <h1 className="font-eight text-2xl leading-[0.9]">DESIGN</h1>
                    <h1 className="font-eight text-2xl leading-[0.9]">SINCE</h1>
                    <h1 className="font-eight text-2xl leading-[0.9]">1992</h1>
                </div>

                {/* Footer */}
                <div className="flex justify-center items-end gap-2 h-1/3">
                    <span className="vertical-text text-[12px] font-semibold">
                        {data.year} / ARCHIVE
                    </span>

                    <div className="h-18 w-fit rounded-sm flex flex-col items-center">
                        <img
                            src={'/ticket.png'}
                            alt="ticket"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Expanded Panel */}
            <div
                ref={contentRef}
                className="panel-expanded hidden opacity-0 absolute inset-0 flex bg-[#f5f5f5] text-black p-10 overflow-y-auto"
            >
                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="absolute top-5 right-5 text-2xl cursor-pointer"
                >
                    <FaTimes />
                </button>

                {/* Left Image */}
                <div className="flex-1 flex items-center justify-center pr-10">
                    <div className="w-full max-w-[400px] shadow-2xl">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-auto block"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-[1.5] flex flex-col justify-between">
                    {/* Header */}
                    <div>
                        <h2 className="text-5xl font-eight leading-[0.9] mb-5">
                            WEB <br />
                            DESIGN <br />
                            SINCE <br />
                            1992
                        </h2>

                        <div className="meta">
                            <span className="text-sm">{data.year} / ARCHIVE</span>
                            <h3 className="text-2xl font-light mt-2">
                                {data.subtitle} <span className="opacity-50">/ {data.english}</span> ({data.title})
                            </h3>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="my-10 flex gap-5">
                        <p className="flex-1 text-[16px] leading-[1.6] font-dmsans">
                            <span className="float-left text-4xl leading-[1] mr-2">
                                I
                            </span>
                            {data.description}
                            took this shot without thinking much...
                        </p>

                        <div className="flex-1 flex justify-center items-center">
                            <div className="flower-shape w-[100px] h-[100px] bg-[#333]"></div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="flex gap-3 mt-auto">
                        {[
                            "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=200",
                            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=200",
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
                            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200",
                        ].map((img, i) => (
                            <div key={i}>
                                <img
                                    src={img}
                                    className="w-[80px] h-[100px] object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panel;
