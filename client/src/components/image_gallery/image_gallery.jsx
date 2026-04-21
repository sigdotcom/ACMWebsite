import { useState, useEffect , useRef} from 'react';
import './image_gallery.css';
import { ArrowLeft, ArrowRight, SquarePause } from 'lucide-react';
import galleryData from './gallery.json'

//list of images to display picked from gallery.json file
const imageList = galleryData

/*
PURPOSE: Displays an image gallery with carousel controls
PARAMETERS:
    *className: CSS styling class to apply
    *autoSwap: whether the image will swap automatically or require input
    *autoSwapTime: the time for the image to swap
USAGE:
    <ImageGallery autoSwap = false, autoSwapTime = 2000 />
*/
function ImageGallery({className ="", autoSwap = false, autoSwapTime = 3000}){
    //stores the index of the image being viewed
    const [imageIndex, setImageIndex] = useState(0);
    //stores whether swapping is currently enabled or disabled
    const [swapEnabled, setSwapEnabled] = useState(false);
    const imageRef = useRef(null);

    //gets the previous index
    const getPrev = () => {
        setImageIndex(prev => {
            if (prev > 0 ){
                return prev - 1;
            }
            else{
                return imageList.length - 1;
            }
        });
    };
    //gets the next index
    const getNext = () => {
        setImageIndex(prev => {
            if (prev < imageList.length - 1){
                return prev + 1;
            }
            else{
                return 0;
            }
        });
    };

    //enables autoswap if the user has the gallery in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0){
                    setSwapEnabled(true);
                }
                else{
                    setSwapEnabled(false);
                }
            }, { root: null, threshold: 1.0}
        );

        if (imageRef.current){
            observer.observe(imageRef.current);
        }
        return () => observer.disconnect();
    }, []);

    //performs the swapping if autoSwap is enabled and the gallery is in view
    useEffect(() => {
        if (!autoSwap || !swapEnabled) {
            return;
        }
        
        const interval = setInterval(() => {
                getNext();
        }, autoSwapTime);

        return () => clearInterval(interval)
    }, [swapEnabled, autoSwap, autoSwapTime]);

    return(
        <div className='gallery'>
            <h1 className='gallery-title'>Image Gallery</h1>
            <img className='gallery-content' src={imageList[imageIndex].image} alt={imageList[imageIndex].altText} ref={imageRef}></img>
            <div className='carousel-controls'>
                <button className='arrow-button' onClick={getPrev}>
                <ArrowLeft size={32} strokeWidth={3} />
                </button>
                <button className='arrow-button' onClick={getNext}>
                <ArrowRight size={32} strokeWidth={3} />
                </button>
            </div>

        </div>
    )
}

export default ImageGallery;