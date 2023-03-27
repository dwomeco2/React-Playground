import { useEffect, useState } from 'react';

type ImageProps = {
    id: number,
    name: string,
}

function initializeImages() {
    let images_tmp:ImageProps[] = [];
    for (let i = 0; i < 10; i++) {
        images_tmp.push({
            id: i,
            name: `Image ${i}`,
        })
    }
    return images_tmp;
}

function preventNegMod(total: number) {
    return (index: number)  => (index + total) % total;
}

function createScrollStopListener(element: HTMLElement, callback: () => void, timeout: number = 200) {
    let handle: number | undefined = undefined;
    let onScroll = function() {
        if (handle) {
            clearTimeout(handle);
        }
        handle = setTimeout(callback, timeout); // default 200 ms
    };
    element.addEventListener('scroll', onScroll);
    return () => {
        element.removeEventListener('scroll', onScroll);
    };
}

type BoundsType = {
    containerBounds: DOMRect;
    itemsBounds: {
        item: HTMLDivElement;
        bounds: DOMRect;
        offsetX: number;
    }[];
}

// saving for preventing trigger reflow
function storeBounds (container: HTMLElement, items: HTMLDivElement[]): BoundsType {
    let containerBounds = container.getBoundingClientRect() // triggers reflow
    let itemsBounds = items.map((item) => {
        let bounds = item.getBoundingClientRect(); // triggers reflow
        return {
            item, 
            bounds,
            offsetX: bounds.left - containerBounds.left
        } 
    });

    return {
        containerBounds,
        itemsBounds,
    };
}

function generateCircularImages(activeImageIndex: number, totalImages: number, images: ImageProps[]): {imageId: number, type: string}[] {
    let circularMod = preventNegMod(totalImages);

    let circularImages = Array(totalImages).fill({});
    circularImages[activeImageIndex] = { imageId: images[activeImageIndex].id, type: 'primary' };
    circularImages[circularMod(activeImageIndex + 1)] = { imageId: images[circularMod(activeImageIndex + 1)].id, type: 'secondary' };
    circularImages[circularMod(activeImageIndex - 1)] = { imageId: images[circularMod(activeImageIndex - 1)].id, type: 'secondary' };
    for(let i = 2; i < totalImages - 1; i++) {
        circularImages[circularMod(activeImageIndex + i)] = { imageId: images[circularMod(activeImageIndex + i)].id, type: 'normal' };
    }

    return circularImages;
}

export default function ImageSlider() {
    const [activeTab, setActiveTab] = useState(0);
    const [activeImageId, setActiveImageId] = useState(0);
    const [images, setImages] = useState<ImageProps[]>(initializeImages())

    const [bounds, setBounds] = useState<BoundsType>({} as BoundsType)

    let totalImages = images.length;

    if (totalImages < 5) {
        return (
            <div>Not enought Images</div>
        )
    }
    
    useEffect(() => {
        let container = document.querySelector('.image_slide')! as HTMLElement;
        let childs = container.childNodes;
        let circularImages = generateCircularImages(activeImageId, totalImages, images);
        // console.log(circularImages);
        circularImages.forEach((image, index) => {
            let el = childs[index] as HTMLElement;
            el.classList.remove('normal');
            el.classList.remove('secondary');
            el.classList.remove('primary');
            el.classList.add(image.type);
            el.innerHTML = image.imageId + "";
            el.setAttribute('data-imageId', image.imageId.toString());
            // console.log(el);
        })
    }, [activeImageId, images])

    // saving for preventing trigger reflow
    useEffect(() => {
        let container = document.querySelector('.image_slide')! as HTMLElement;
        const items = Array.from(document.querySelectorAll('.image_slide > div')) as HTMLDivElement[]

        setBounds(storeBounds(container, items));

        const resizecallback = () => {
            setBounds(storeBounds(container, items));
        }

        window.addEventListener('resize', resizecallback)
        return () => {
            window.removeEventListener('resize', resizecallback)
        }
    }, [])

    useEffect(() => {
        let container = document.querySelector('.image_slide')! as HTMLElement;
        let removeOnScrollCallback = createScrollStopListener(container, () => {
            const detectCurrent = () => {
                let { containerBounds, itemsBounds } = bounds;

                const scrollX = container.scrollLeft
                const goal = containerBounds.width / 2

                // Find item closest to the goal
                let { item: currentItem } = itemsBounds.reduce((prev, curr) => {
                    const { offsetX: currOffsetX } = curr;
                    const { offsetX: prevOffsetX } = prev;
                    return (Math.abs(currOffsetX - scrollX - goal) < Math.abs(prevOffsetX - scrollX - goal) ? curr : prev);
                });

                // Do stuff with currentItem
                let found = images.find(image => image.id === +currentItem.getAttribute('data-imageId')!);
                if (found) {
                    setActiveImageId(found.id);
                }
            }
            detectCurrent();
        });
        return () => {
            removeOnScrollCallback();
        }
    }, [bounds])

    return (
        <div className="image_slide flex items-center gap-8">
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
            <div className="shrink-0 rounded-full bg-slate-600"></div>
        </div>
    )
}