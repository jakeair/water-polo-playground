import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const VideoDemo = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-white text-center mb-8">See It In Action</h2>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {[1, 2, 3].map((index) => (
            <CarouselItem key={index}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                <video 
                  className="w-full aspect-video object-cover rounded-lg"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src={`/demo-video-${index}.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white border-white/20 hover:bg-white/10" />
        <CarouselNext className="text-white border-white/20 hover:bg-white/10" />
      </Carousel>
    </div>
  );
};

export default VideoDemo;