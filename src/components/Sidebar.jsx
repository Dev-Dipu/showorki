import React from "react";
import {
    FaRegCompass,
    FaSearch,
    FaRegHeart,
    FaRegBookmark,
    FaUndo,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
            <div className="h-full p-6">
                <div className="px-4 w-20  h-full bg-[#191818] flex flex-col justify-between items-center py-5 border border-[#9F9F9F] z-[100] rounded-2xl">

            {/* Top */}
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex justify-center items-center text-white mb-5">
                    <CgSpinner size={24} className="animate-spin-slow" />
                </div>
            </div>

            {/* Middle */}
            <div className="flex flex-col gap-3">
                <div className="w-10 h-10 flex justify-center items-center text-[#312E2E] bg-[#F4F4F4] rounded-lg cursor-pointer transition">
                    <IoDocumentTextOutline size={20} />
                </div>

                <div className="icon-btn">
                    <FaSearch size={18} />
                </div>

                <div className="icon-btn">
                    <FaRegHeart size={18} />
                </div>

                <div className="icon-btn">
                    <FaRegBookmark size={18} />
                </div>

                <div className="icon-btn">
                    <FaUndo size={16} />
                </div>
            </div>

            {/* Bottom */}
            <div className="flex flex-col gap-2">
                <div className="icon-btn">
                    <FaChevronLeft size={14} />
                </div>
                <div className="icon-btn">
                    <FaChevronRight size={14} />
                </div>
            </div>
        </div>
            </div>
    );
};

export default Sidebar;
