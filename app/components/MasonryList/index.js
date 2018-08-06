/**
 * @flow
 * Created by Rabbit on 2018/5/1.
 */
import * as React from 'react';
import {
	VirtualizedList,
	View,
	ScrollView,
	StyleSheet,
	findNodeHandle,
	RefreshControl,
} from 'react-native';

type Column = {
  index: number,
  totalHeight: number,
  data: Array<any>,
  heights: Array<number>,
};

const _stateFromProps = ({ numColumns, data, getHeightForItem }) => {
	const columns: Array<Column> = Array.from({
		length: numColumns,
	}).map((col, i) => ({
		index: i,
		totalHeight: 0,
		data: [],
		heights: [],
	}));

	data.forEach((item, index) => {
		const height = getHeightForItem({ item, index });
		const column = columns.reduce(
			(prev, cur) => (cur.totalHeight < prev.totalHeight ? cur : prev),
			columns[0],
		);
		column.data.push(item);
		column.heights.push(height);
		column.totalHeight += height;
	});

	return { columns };
};

export type Props = {
  data: Array<any>,
  numColumns: number,
  renderItem: ({ item: any, index: number, column: number }) => ?React.Element<any, >,
  getHeightForItem: ({ item: any, index: number }) => number,
  ListHeaderComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,
  ListFooterComponent?: ?React.ComponentType<any>,
  /**
   * Used to extract a unique key for a given item at the specified index. Key is used for caching
   * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
   * falls back to using the index, like React does.
   */
  keyExtractor?: (item: any, index: number) => string,
  // onEndReached will get called once per column, not ideal but should not cause
  // issues with isLoading checks.
  onEndReached?: ?(info: { distanceFromEnd: number }) => void,
  contentContainerStyle?: any,
  onScroll?: (event: Object) => void,
  onScrollBeginDrag?: (event: Object) => void,
  onScrollEndDrag?: (event: Object) => void,
  onMomentumScrollEnd?: (event: Object) => void,
  onEndReachedThreshold?: ?number,
  scrollEventThrottle: number,
  renderScrollComponent: (props: Object) => React.Element<any>,
  /**
   * Set this true while waiting for new data from a refresh.
   */
  refreshing?: ?boolean,
  /**
   * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
   * sure to also set the `refreshing` prop correctly.
   */
  onRefresh?: ?Function,
};
type State = {
  columns: Array<Column>,
};

// This will get cloned and added a bunch of props that are supposed to be on
// ScrollView so we wan't to make sure we don't pass them over (especially
// onLayout since it exists on both).
class FakeScrollView extends React.Component<{ style?: any, children?: any }> {
	render() {
		return (
			<View style={this.props.style}>
				{this.props.children}
			</View>
		);
	}
}

export default class MasonryList extends React.Component<Props, State> {
  static defaultProps = {
  	scrollEventThrottle: 50,
  	numColumns: 1,
  	renderScrollComponent: (props: Props) => {
  		if (props.onRefresh && props.refreshing != null) {
  			return (
  				<ScrollView
  					{...props}
  					refreshControl={
  						<RefreshControl
  							refreshing={props.refreshing}
  							onRefresh={props.onRefresh}
  						/>
  					}
  				/>
  			);
  		}
  		return <ScrollView {...props} />;
  	},
  };

  state = _stateFromProps(this.props);
  _listRefs: Array<?VirtualizedList> = [];
  _scrollRef: ?ScrollView;
  _endsReached = 0;

  UNSAFE_componentWillReceiveProps(newProps: Props) {
  	this.setState(_stateFromProps(newProps));
  }

  getScrollResponder() {
  	if (this._scrollRef && this._scrollRef.getScrollResponder) {
  		return this._scrollRef.getScrollResponder();
  	}
  	return null;
  }

  getScrollableNode() {
  	if (this._scrollRef && this._scrollRef.getScrollableNode) {
  		return this._scrollRef.getScrollableNode();
  	}
  	return findNodeHandle(this._scrollRef);
  }

  scrollToOffset({ offset, animated }: any) {
  	if (this._scrollRef) {
  		this._scrollRef.scrollTo({ y: offset, animated });
  	}
  }

  _onLayout = event => {
  	this._listRefs.forEach(
  		list => list && list._onLayout && list._onLayout(event),
  	);
  };

  _onContentSizeChange = (width, height) => {
  	this._listRefs.forEach(
  		list =>
  			list &&
        list._onContentSizeChange &&
        list._onContentSizeChange(width, height),
  	);
  };

  _onScroll = event => {
  	if (this.props.onScroll) {
  		this.props.onScroll(event);
  	}
  	this._listRefs.forEach(
  		list => list && list._onScroll && list._onScroll(event),
  	);
  };

  _onScrollBeginDrag = event => {
  	if (this.props.onScrollBeginDrag) {
  		this.props.onScrollBeginDrag(event);
  	}
  	this._listRefs.forEach(
  		list => list && list._onScrollBeginDrag && list._onScrollBeginDrag(event),
  	);
  };

  _onScrollEndDrag = event => {
  	if (this.props.onScrollEndDrag) {
  		this.props.onScrollEndDrag(event);
  	}
  	this._listRefs.forEach(
  		list => list && list._onScrollEndDrag && list._onScrollEndDrag(event),
  	);
  };

  _onMomentumScrollEnd = event => {
  	if (this.props.onMomentumScrollEnd) {
  		this.props.onMomentumScrollEnd(event);
  	}
  	this._listRefs.forEach(
  		list =>
  			list && list._onMomentumScrollEnd && list._onMomentumScrollEnd(event),
  	);
  };

  _getItemLayout = (columnIndex, rowIndex) => {
  	const column = this.state.columns[columnIndex];
  	let offset = 0;
  	for (let ii = 0; ii < rowIndex; ii += 1) {
  		offset += column.heights[ii];
  	}
  	return { length: column.heights[rowIndex], offset, index: rowIndex };
  };

  _renderScrollComponent = () => <FakeScrollView style={styles.column} />;

  _getItemCount = data => data.length;

  _getItem = (data, index) => data[index];

  _captureScrollRef = ref => (this._scrollRef = ref);

  render() {
  	const {
  		renderItem,
  		ListHeaderComponent,
  		ListEmptyComponent,
  		ListFooterComponent,
  		keyExtractor,
  		onEndReached,
  		...props
  	} = this.props;
  	let headerElement;
  	if (ListHeaderComponent) {
  		headerElement = <ListHeaderComponent />;
  	}
  	let emptyElement;
  	if (ListEmptyComponent) {
  		emptyElement = <ListEmptyComponent />;
  	}
  	let footerElement;
  	if (ListFooterComponent) {
  		footerElement = <ListFooterComponent />;
  	}

  	const content = (
  		<View style={styles.contentContainer}>
  			{this.state.columns.map(col =>
  				<VirtualizedList
  					{...props}
  					ref={ref => (this._listRefs[col.index] = ref)}
  					key={`$col_${col.index}`}
  					data={col.data}
  					getItemCount={this._getItemCount}
  					getItem={this._getItem}
  					getItemLayout={(data, index) =>
  						this._getItemLayout(col.index, index)}
  					renderItem={({ item, index }) =>
  						renderItem({ item, index, column: col.index })}
  					renderScrollComponent={this._renderScrollComponent}
  					keyExtractor={keyExtractor}
  					onEndReached={onEndReached}
  					onEndReachedThreshold={this.props.onEndReachedThreshold}
  					removeClippedSubviews={false}
  				/>,
  			)}
  		</View>
  	);

  	const scrollComponent = React.cloneElement(
  		this.props.renderScrollComponent(this.props),
  		{
  			ref: this._captureScrollRef,
  			removeClippedSubviews: false,
  			onContentSizeChange: this._onContentSizeChange,
  			onLayout: this._onLayout,
  			onScroll: this._onScroll,
  			onScrollBeginDrag: this._onScrollBeginDrag,
  			onScrollEndDrag: this._onScrollEndDrag,
  			onMomentumScrollEnd: this._onMomentumScrollEnd,
  		},
  		headerElement,
  		emptyElement && this.props.data.length === 0 ? emptyElement : content,
  		footerElement
  	);

  	return scrollComponent;
  }
}

const styles = StyleSheet.create({
	contentContainer: {
		flexDirection: 'row',
	},
	column: {
		flex: 1,
	},
});
