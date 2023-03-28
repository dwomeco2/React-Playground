export type ImageProps = {
    id: number,
    src: string,
}

export type ImageSliderStateType = {
    total_images: number;
    visible_no_image: number;
    current_imageId: number;
    direction: string;
    images: ImageProps[];
    back_images: ImageProps[];
}

export const initializeImageSliderState = () => {
    let total_images = 10;
    let visible_no_image = 5;

    let cid = getRandomArbitrary(1, total_images + 1);
    let current_imageId = cid;
    let start_of_back_image = (cid + ((visible_no_image - 1) / 2) + 1) % total_images
    let back_image_size = total_images - visible_no_image;

    // initialize circular image array using two array
    let image_tmp = [], back_img_tmp = [];
    for(let i = start_of_back_image; i < start_of_back_image + total_images; i++) {
        let id = (i % total_images) == 0 ? total_images : (i % total_images);
        let url = new URL(`/src/assets/imageslider/${id}.jpg`, import.meta.url).href
        
        if (back_img_tmp.length != back_image_size) {
            back_img_tmp.unshift({ id: id, src: url });
        } else {
            image_tmp.push({ id: id, src: url });
        }
    }

    return {
        total_images,
        visible_no_image,
        current_imageId,
        direction: 'ltr',
        images: image_tmp,
        back_images: back_img_tmp,
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}