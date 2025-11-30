import Accordion from "./components/Accordion";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <div className="h-screen w-full flex bg-[#191818] overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-full overflow-x-auto overflow-y-hidden no-scrollbar">
                <Accordion />
            </div>
        </div>
    );
};

export default App;
