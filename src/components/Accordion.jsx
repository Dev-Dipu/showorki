import React, { useState, useEffect, useRef } from "react";
import Panel from "./Panel";
import { panels } from "../data/panels";
import gsap from "gsap";

const Accordion = () => {
    const [activePanelId, setActivePanelId] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".panel", {
                y: 1000,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handlePanelClick = (id) => {
        setActivePanelId((prev) => (prev === id ? null : id));
    };

    return (
        <div ref={containerRef} className="flex h-screen w-fit bg-[#191818]">
            {panels.map((panel) => (
                <Panel
                    key={panel.id}
                    data={panel}
                    isActive={activePanelId === panel.id}
                    isAnyActive={activePanelId !== null}
                    onClick={() => handlePanelClick(panel.id)}
                />
            ))}
        </div>
    );
};

export default Accordion;
