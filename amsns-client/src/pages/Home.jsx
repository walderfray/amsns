import Hero from '../components/Hero';
import Overview from '../components/Overview';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import VideoComponent from '../components/VideoComponent';
import Gallery from '../components/Gallery';
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