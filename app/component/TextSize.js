/**
 * Created by Rabbit on 2017/4/20.
 */
const TextSize = (size) => {
    if (PixelRatio === 2) {
        // iphone 5s and older Androids
        if (SCREEN_WIDTH < 360) {
            return size * 0.95;
        }
        // iphone 5
        if (SCREEN_HEIGHT < 667) {
            return size;
            // iphone 6-6s
        } else if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
            return size * 1.15;
        }
        // older phablets
        return size * 1.25;
    }
    if (PixelRatio === 3) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (SCREEN_WIDTH <= 360) {
            return size;
        }
        // Catch other weird android width sizings
        if (SCREEN_HEIGHT < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
            return size * 1.2;
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.27;
    }
    if (PixelRatio === 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (SCREEN_WIDTH <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (SCREEN_HEIGHT < 667) {
            return size * 1.20;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if(SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.40;
    }
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
};

module.exports = TextSize; // eslint-disable-line no-undef