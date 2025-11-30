import Accordion from "./components/Accordion";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className='h-screen w-full bg-[#191818] flex'>
      <Sidebar />
      <Accordion />
    </div>
  )
}

export default App