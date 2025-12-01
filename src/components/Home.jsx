import Hero from './Hero';
import Overview from './Overview';
import Testimonials from './Testimonials';
import Footer from './Footer';
import VideoComponent from './VideoComponent';
import Gallery from './Gallery';
export default function Home() {
    return (
        <div>
            <Hero />
            <Overview />
            <Gallery />
            <VideoComponent />
            <Testimonials />
            <Footer />

        </div>
    );
}