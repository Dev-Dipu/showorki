import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";
import ShaderReveal from "./ShaderReveal";

const Panel = ({ data, isActive, onClick, isAnyActive }) => {
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    const textRef = useRef(null);
    const centerTextRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            // Active State
            gsap.to(panelRef.current, {
                flexGrow: 1,
                duration: 0.8,
                ease: "power3.inOut",
                minWidth: "60vw", // Large active panel
            });

            // Smoothly scroll container to center the active panel while it expands
            const container = panelRef.current.closest(".overflow-x-auto");
            if (container) {
                const containerWidth = container.offsetWidth;
                const targetPanelWidth = window.innerWidth * 0.6; // 60vw
                const rect = panelRef.current.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Calculate current position relative to the scrollable content
                const currentRelativeLeft =
                    rect.left - containerRect.left + container.scrollLeft;

                // Calculate target scroll position to center the panel
                const targetScrollLeft =
                    currentRelativeLeft -
                    containerWidth / 2 +
                    targetPanelWidth / 2;

                gsap.to(container, {
                    scrollLeft: targetScrollLeft,
                    duration: 0.8,
                    ease: "power3.inOut",
                });
            }

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
        } else if (isAnyActive) {
            // Inactive State (when another panel is active) - No shrinking
            gsap.to(panelRef.current, {
                flexGrow: 0,
                duration: 0.8,
                ease: "power3.inOut",
                minWidth: "7.5vw", // Maintain default width
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

            // Ensure center text is visible
            gsap.to(centerTextRef.current, {
                opacity: 1,
                duration: 0.3,
            });
        } else {
            // Default State (no panels active)
            gsap.to(panelRef.current, {
                flexGrow: 0,
                duration: 0.8,
                ease: "power3.inOut",
                minWidth: isAnyActive ? "60px" : "7.8vw",
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

            gsap.to(centerTextRef.current, {
                opacity: 1,
                duration: 0.3,
                delay: 0.2,
            });
        }
    }, [isActive, isAnyActive]);

    return (
        <div
            ref={panelRef}
            onClick={!isActive ? onClick : undefined}
            style={{ backgroundColor: data.color }}
            className={`panel relative flex flex-col h-full overflow-hidden cursor-pointer border-r border-black/10 w-fit`}
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
                <div className="flex flex-col items-center justify-center opacity-80 h-1/3 border-y">
                    <h1 className="font-eight text-2xl leading-[0.9]">WEB</h1>
                    <h1 className="font-eight text-2xl leading-[0.9]">
                        DESIGN
                    </h1>
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
                            src={"/ticket.png"}
                            alt="ticket"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Expanded Panel */}
            <div
                ref={contentRef}
                className="panel-expanded hidden opacity-0 absolute inset-0 flex flex-col bg-[#EBEBEB] text-black p-8 overflow-y-auto no-scrollbar"
            >
                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="absolute top-6 right-6 text-2xl cursor-pointer z-50 hover:rotate-90 transition-transform duration-300"
                >
                    <FaTimes />
                </button>

                {/* Top Section */}
                <div className="flex w-full gap-10 h-[45%] min-h-[300px]">
                    {/* Main Image */}
                    <div className="w-[40%] h-full shadow-lg">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover block"
                        />
                    </div>

                    {/* Header Info */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                            <h2 className="text-5xl font-eight italic leading-[0.9] text-[#1a1a1a]">
                                WEB <br />
                                DESIGN <br />
                                SINCE <br />
                                1992
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-dmsans tracking-widest uppercase text-[#555]">
                                {data.year} / ARCHIVE
                            </span>
                            <h1 className="text-4xl font-dmsans font-medium text-[#1a1a1a]">
                                {data.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-[#ccc] my-8 w-full" />

                {/* Middle Section */}
                <div className="flex w-full gap-10 mb-8">
                    {/* Description */}
                    <div className="w-1/2">
                        <p className="text-[15px] leading-[1.8] font-mono text-[#333] text-justify">
                            <span className="float-left text-5xl font-eight leading-[0.8] mr-3 mt-[-4px]">
                                I
                            </span>
                            {data.description} took this shot without thinking
                            much, but later it felt like the universe had paused
                            for me. A single second captured between who I was
                            and who I'm becoming. Maybe that's why I keep coming
                            back to this frame — it feels like a quiet turning
                            point.
                        </p>
                    </div>

                    {/* Flower Graphic / Shader Reveal */}
                    <div className="w-1/2 flex justify-center items-center relative h-[300px]">
                        <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
                            {/* Background texture or shape if needed */}
                        </div>
                        <div className="w-[300px] h-[300px]">
                            <ShaderReveal
                                image={data.image}
                                color={data.color}
                                isActive={isActive}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Gallery */}
                <div className="mt-auto">
                    <div className="grid grid-cols-5 gap-4 h-[180px]">
                        {[
                            "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=300",
                            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=300",
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
                            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300",
                            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300",
                        ].map((img, i) => (
                            <div
                                key={i}
                                className="h-full w-full overflow-hidden bg-gray-200"
                            >
                                <img
                                    src={img}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    alt="gallery"
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
