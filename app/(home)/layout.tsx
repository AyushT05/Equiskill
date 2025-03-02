import Footer from "@/components/layout/Footer"
import TopBar from "@/components/layout/TopBar"



const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <TopBar/>
    {children}
    <Footer/>
    </>
  )
}

export default HomeLayout
