import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / SCREEN_WIDTH;
const heightBaseScale = SCREEN_HEIGHT / SCREEN_HEIGHT;

const normalize = (size: number, based = 'width') => {
    const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
const widthPixel = (size: number) => {
    return normalize(size, 'width');
};
//for height  pixel
const heightPixel = (size: number) => {
    return normalize(size, 'height');
};

export { heightPixel, widthPixel, normalize };
