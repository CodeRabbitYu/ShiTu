/**
 * @flow
 * Created by Rabbit on 2018/4/23.
 */

import * as React from 'react';
import PropTypes from 'prop-types';

import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	View,
	VirtualizedList,
	ScrollView
} from 'react-native';
import type {Props as VirtualizedListProps} from 'react-native/Libraries/Lists/VirtualizedList';

const { width, height } = Dimensions.get('window');

const PaginationStatus = {
	FIRST_LOAD: 0,
	WAITING: 1,
	ALL_LOADED: 2
};
// type paginationStatus = 'FIRST_LOAD' | 'WAITING' | 'ALL_LOADED';

type IndicatorSize = number | 'small' | 'large';

export type SeparatorsObj = {
  highlight: () => void,
  unhighlight: () => void,
  updateProps: (select: 'leading' | 'trailing', newProps: Object) => void,
};

type RequiredProps<ItemT> = {
  renderItem: (info: {
    item: ItemT,
    index: number,
    separators: SeparatorsObj,
  }) => React.Element<any>,

  // onFetch: (page: number, postRefresh: any, endFetch: any) => void,
  onFetch: any,

  keyExtractor: (item: ItemT | Array<ItemT>, index: number) => string,
}

type OptionalProps<ItemT> = {

  initialNumToRender?: number,
  horizontal?: boolean,

  ListHeaderComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,
  ListFooterComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,

  firstLoader?: ?boolean,
  scrollEnabled?: ?boolean,

  // Custom View
  PaginationFetchingView?: any,
  PaginationAllLoadedView?: any,
  PaginationWaitingView?: any,

  SeparatorComponent?: ?React.ComponentType<any>,

  // Refreshable
  refreshable?: ?boolean,

  // RefreshControl
  refreshableTitle?: string,
  refreshableColors?: Array<string>,
  refreshableProgressBackgroundColor?: ?string,
  refreshableSize?: ?string,
  refreshableTintColor?: ?string,

  // Pagination
  pagination?: ?boolean,
  paginationType?: ?string | number,
  autoPagination?: ?boolean,
  allLoadedText?: ?string,

  // Spinner
  spinnerColor?: ?string,
  fetchingSpinnerSize?: ?number | string,
  waitingSpinnerSize?: IndicatorSize,
  waitingSpinnerText?: ?string,

  // Pagination Button
  paginationBtnText?: ?string,

  // GridView
  numColumns?: number
}

export type Props<ItemT> = RequiredProps<ItemT> & OptionalProps<ItemT> & VirtualizedListProps;

type State<ItemT> = {
  dataSource: Array<ItemT>,
  isRefreshing: boolean,
  paginationStatus: number,
}

const defaultProps = {

	initialNumToRender: 10,
	horizontal: false,

	firstLoader: true,
	onFetch: null,

	// Refreshable
	refreshable: true,

	// RefreshControl
	refreshableTitle: '',
	refreshableColors: ['dimgray', 'tomato', 'limegreen'],
	refreshableProgressBackgroundColor: 'white',
	refreshableSize: undefined,
	refreshableTintColor: 'lightgray',


	// Pagination
	pagination: true,
	paginationType: 'page',
	autoPagination: true,
	allLoadedText: 'End of List',

	// Spinner
	spinnerColor: undefined,
	fetchingSpinnerSize: 'large',
	waitingSpinnerSize: 'small',
	waitingSpinnerText: 'Loading...',

	// Pagination Button
	paginationBtnText: 'Load more...',

	// GridView
	numColumns: 1
};

export type DefaultProps = typeof defaultProps;

export default class index<ItemT> extends React.Component<Props<ItemT>, State<ItemT>> {

  static defaultProps: DefaultProps = defaultProps;

  mounted: boolean
  rows: Array<any>
  page: number
  value: ?number | ?string
  // _flatList: ?React.ElementRef<any> = null;

  _flatList: null | VirtualizedList | ScrollView

  constructor(props: Props<ItemT>) {
  	super(props);
  	// this.setPage(1)

  	this.getPaginationTypeForPage() ? this.setValue(1) : this.setValue();

  	this.setRows([]);

  	this.state = {
  		dataSource: [],
  		isRefreshing: false,
  		paginationStatus: PaginationStatus.FIRST_LOAD
  	};
  }

  componentDidMount() {
  	this.mounted = true;
  	if (this.props.firstLoader) {
  		this.props.onFetch(this.getValue(), this.postRefresh, this.endFetch);
  	}
  }

  componentWillUnmount() {
  	this.mounted = false;
  }

  onRefresh = () => {
  	// console.log('onRefresh()')
  	if (this.mounted) {
  		this.setState({ isRefreshing: true });
  		// this.setPage(1)
  		this.getPaginationTypeForPage() ? this.setValue(1) : this.setValue();
  		this.props.onFetch(this.getValue(), this.postRefresh, this.endFetch);
  	}
  }

  onPaginate = () => {
  	if (this.state.paginationStatus !== PaginationStatus.ALL_LOADED && !this.state.isRefreshing) {
  		console.log('onPaginate()');
  		this.setState({ paginationStatus: PaginationStatus.WAITING });
  		const value = this.getPaginationTypeForPage() ? this.getValue() + 1 : this.getValue();
  		this.props.onFetch(value, this.postPaginate, this.endFetch);
  	}
  }

  onEndReached = () => {
  	// console.log('onEndReached()');
  	if (this.props.pagination && this.props.autoPagination && this.state.paginationStatus === PaginationStatus.WAITING) {
     	console.log('1111111111');
  		this.onPaginate();
  	}
  }

  setValue = (value: ?number | ?string ) => this.value = value


  getValue = (): ?string | ?number => this.value

  getPaginationTypeForPage = (): boolean => this.props.paginationType === 'page'

  setPage = (page: number) => this.page = page

  getPage = () => this.page

  setRows = (rows: Array<any>) => this.rows = rows

  getRows = () => this.rows

  refresh = () => {
  	this.onRefresh();
  }

  scrollToEnd(params?: ?{animated?: ?boolean}) {
  	if (this._flatList) {
  		this._flatList.scrollToEnd(params);
  	}
  }

  scrollToIndex(params: {
    animated?: ?boolean,
    index: number,
    viewOffset?: number,
    viewPosition?: number,
  }) {
  	if (this._flatList) {
  		this._flatList.scrollToIndex(params);
  	}
  }

  scrollToItem(params: {
    animated?: ?boolean,
    item: ItemT,
    viewPosition?: number,
  }) {
  	if (this._flatList) {
  		this._flatList.scrollToItem(params);
  	}
  }

  scrollToOffset(params: {animated?: ?boolean, offset: number}) {
  	if (this._flatList) {
  		this._flatList.scrollToOffset(params);
  	}
  }

  postRefresh = (rows: Array<any> = [], pageLimit: number) => {
  	if (this.mounted) {
  		let paginationStatus = PaginationStatus.WAITING;
  		if (rows.length < pageLimit) {
  			paginationStatus = PaginationStatus.ALL_LOADED;
  		}
  		this.updateRows(rows, paginationStatus);
  	}
  }

  postPaginate = (rows: Array<any> = []) => {
  	// this.setPage(this.getPage() + 1)
  	this.getPaginationTypeForPage() ? this.setValue(this.getValue() + 1) : this.setValue(this.getValue());
  	let mergedRows = [];
  	let paginationStatus;
  	if (rows.length === 0) {
  		paginationStatus = PaginationStatus.ALL_LOADED;
  	} else {
  		mergedRows = this.getRows().concat(rows);
  		paginationStatus = PaginationStatus.WAITING;
  	}

  	this.updateRows(mergedRows, paginationStatus);
  }

  updateRows = (rows: ?Array<any>, paginationStatus: number) => {
  	console.log('rows', rows, paginationStatus);
  	if (rows) {
  		this.setRows(rows);
  		this.setState({
  			dataSource: rows,
  			isRefreshing: false,
  			paginationStatus
  		});
  	} else {
  		this.setState({
  			dataSource: this.getRows().slice(),
  			isRefreshing: false,
  			paginationStatus
  		});
  	}
  }

  endFetch = () => {
  	console.log('endRefresh()');
  	if (this.mounted) {
  		this.setState({ isRefreshing: false });
  	}
  }

  updateDataSource(rows: Array<ItemT> = []) {
  	this.setRows(rows);
  	this.setState({
  		dataSource: rows
  	});
  }

  PaginationFetchingView = () => {
  	if (this.props.PaginationFetchingView) {
  		return this.props.PaginationFetchingView();
  	}

  	return (
  		<View style={styles.fetchingView}>
  			<Text style={styles.paginationViewText}>{this.props.waitingSpinnerText}</Text>
  		</View>
  	);
  }

  PaginationAllLoadedView = () => {
  	if (this.props.pagination) {
  		if (this.props.PaginationAllLoadedView) {
  			return this.props.PaginationAllLoadedView();
  		}
  		return (
  			<View style={styles.paginationView}>
  				<Text style={styles.allLoadedText}>
  					{this.props.allLoadedText}
  				</Text>
  			</View>
  		);
  	}
  	return null;
  }

  PaginationWaitingView = (paginateCallback: any) => {
  	if (this.props.pagination) {
  		if (this.props.autoPagination) {
  			if (this.props.PaginationWaitingView) {
  				return this.props.PaginationWaitingView(paginateCallback);
  			}

  			return (
  				<View style={styles.paginationView}>
  					<ActivityIndicator color={this.props.spinnerColor} size={this.props.waitingSpinnerSize} />
  					<Text
  						style={[styles.paginationViewText, { marginLeft: 5 }]}
  					>
  						{this.props.waitingSpinnerText}
  					</Text>
  				</View>
  			);
  		}
  	}

  	return null;
  }

  renderFooter = () => {

  	if (this.state.paginationStatus === PaginationStatus.FIRST_LOAD) {
  		return this.PaginationFetchingView();
  	} else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === false) {
  		return this.PaginationWaitingView(this.onPaginate);
  	} else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === true) {
  		return this.PaginationWaitingView();
  	} else if (this.getRows().length !== 0 && this.state.paginationStatus === PaginationStatus.ALL_LOADED) {
  		return this.PaginationAllLoadedView();
  	}
  	return null;
  }

  renderRefreshControl = () => {
  	if (this.props.refreshable) {
  		return (
  			<RefreshControl
  				onRefresh={this.onRefresh}
  				refreshing={this.state.isRefreshing}
  				colors={this.props.refreshableColors}
  				progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
  				size={this.props.refreshableSize}
  				tintColor={this.props.refreshableTintColor}
  				title={this.props.refreshableTitle}
  			/>
  		);
  	}
  	return null;
  }

  render() {
  	const { numColumns, ListEmptyComponent } = this.props;

  	let emptyView;
  	if (this.state.paginationStatus !== PaginationStatus.FIRST_LOAD && ListEmptyComponent) {
  		emptyView = <ListEmptyComponent />;
  	}


  	return (
  		<FlatList
  			key={numColumns}
  			onEndReachedThreshold={0.1}
  			{...this.props}
  			ref={ref => this._flatList = ref}
  			data={this.state.dataSource}
  			ListFooterComponent={this.renderFooter}
  			ListEmptyComponent={emptyView}
  			onEndReached={this.onEndReached}
  			refreshControl={this.renderRefreshControl()}
  			numColumns={numColumns}
  		/>
  	);
  }
}

const styles = StyleSheet.create({
	fetchingView: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center'
	},
	paginationView: {
		flex: 0,
		width,
		height: 55,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	paginationViewText: {
		fontSize: 16
	},
	paginationViewSpinner: {
		marginRight: 5
	},
	paginationBtn: {
		backgroundColor: 'tomato',
		margin: 10,
		borderRadius: 20,
		flex: 1,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	paginationBtnText: {
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold'
	},
	separator: {
		height: 0.5,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: 'lightgray'
	},
	emptyView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	allLoadedText: {
		alignSelf: 'center',
		color: '#bfbfbf'
	},
	gridItem: {
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},
	gridView: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	}
});
