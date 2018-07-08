/**
 * Created by Rabbit on 2018/4/17.
 */
import { Image, Dimensions } from 'react-native';
import Task from 'data.task';

const { width, height } = Dimensions.get('window');
// resolveImage :: String -> Task(Error, Image)
export const imageSize = (data, columns) => {
	return new Task((reject, resolve) => Image.getSize(data, (width, height) => resolve({
		...data,
		imageSize: { width, height },
		resizeSize: resizeImage(width, height, columns)
	}), (err) => reject(err)));
};

function resizeImage(ImageWidth, ImageHeight, columns) {

	// The gutter is 1% of the available view width
	const gutterBase = width / 100;
	const gutterSize = gutterBase * 2;

	// Column gutters are shared between right and left image
	const columnWidth = (width / columns) - (gutterSize / 2);
	const divider = ImageWidth / columnWidth;

	const newWidth = ImageWidth / divider;
	const newHeight = ImageHeight / divider;


	return { width: newWidth, height: newHeight, gutter: gutterSize };

}