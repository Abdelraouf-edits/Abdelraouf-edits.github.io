import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The work is beautiful and I liked it, mashallah thank you.",
    author: "Hosam Hany",
    role: "Client",
    instagram: "hosamhanyyy",
    instagramUrl: "https://www.instagram.com/hosamhanyyy/",
  },
  {
    quote: "Your work is beautiful! Thanks a lot ❤️",
    author: "Badr Diab",
    role: "Client",
    instagram: "badr.diab",
    instagramUrl: "https://www.instagram.com/badr.diab/",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 px-6 bg-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center animate-fade-in">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            What Clients Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover-lift animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="relative">
                <Quote className="w-12 h-12 text-primary/30 mb-6 group-hover:text-primary/50 group-hover:scale-110 transition-all duration-500" />
                
                <p className="text-lg text-foreground/90 leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>
                
                <a 
                  href={testimonial.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={index === 0 ? "/hosam-profile.jpg" : "public/badr-profile.jpg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full group-hover:scale-110 group-hover:shadow-glow transition-all duration-500 border-2 border-primary/30 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{testimonial.instagram}
                    </p>
                  </div>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
