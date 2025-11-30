import Accordion from "./components/Accordion";
import Sidebar from "./components/Sidebar";

const App = () => {
    return (
        <div className="h-screen w-full overflow-x-auto overflow-y-hidden flex bg-[#191818] ">
            <Sidebar />
            <Accordion />
        </div>
    );
};

export default App;
