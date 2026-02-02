import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Work />
      <Process />
      <Contact />
      
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Abdelraouf. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
