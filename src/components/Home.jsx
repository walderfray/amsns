import Hero from './Hero';
import Overview from './Overview';
import Founder from './Founder';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Advertisement from './Advertisement';
import VideoComponent from './VideoComponent';
export default function Home() {
    return (
        <div>
            <Hero />
            <Overview />
            <Founder />
            <Advertisement />
            <VideoComponent />
            <Testimonials />
            <Footer />

        </div>
    );
}