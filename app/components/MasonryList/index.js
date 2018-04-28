/**
 * Created by Rabbit on 2018/4/27.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  VirtualizedList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  findNodeHandle
} from 'react-native'

const { width, height } = Dimensions.get('window')

const PaginationStatus = {
  FIRST_LOAD: 0,
  WAITING: 1,
  ALL_LOADED: 2
}


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
  renderItem: ({ item: any, index: number, column: number }) => ?React.Element<
    any,
    >,
  getHeightForItem: ({ item: any, index: number }) => number,
  ListHeaderComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,
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

class FakeScrollView extends React.Component<{ style?: any, children?: any }> {
  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    );
  }
}


export default class index extends Component<Props, State> {
  /**
  static defaultProps = {
    initialNumToRender: 10,
    horizontal: false,
    keyExtractor: null,

    renderItem: null,

    firstLoader: true,
    scrollEnabled: true,
    onFetch: null,

    // Custom View
    paginationFetchingView: null,
    paginationAllLoadedView: null,
    paginationWaitingView: null,
    emptyView: null,

    // Refreshable
    refreshable: true,

    // Pagination
    pagination: true,
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
  }
  */
  /**
  static propTypes = {
    initialNumToRender: PropTypes.number,
    horizontal: PropTypes.bool,
    keyExtractor: PropTypes.func,

    renderItem: PropTypes.func,

    firstLoader: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    onFetch: PropTypes.func,

    // Custom ListView
    paginationFetchingView: PropTypes.func,
    paginationAllLoadedView: PropTypes.func,
    paginationWaitingView: PropTypes.func,
    emptyView: PropTypes.func,

    // Refreshable
    refreshable: PropTypes.bool,

    // Pagination
    pagination: PropTypes.bool,
    autoPagination: PropTypes.bool,
    allLoadedText: PropTypes.string,

    // Spinner
    spinnerColor: PropTypes.string,
    fetchingSpinnerSize: PropTypes.any,
    waitingSpinnerSize: PropTypes.any,
    waitingSpinnerText: PropTypes.string,

    // Pagination Button
    paginationBtnText: PropTypes.string,

    // GridView
    numColumns: PropTypes.number
  }
  */

  static defaultProps = {
    scrollEventThrottle: 0,
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

  componentWillReceiveProps(newProps: Props) {
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
    console.log(column);
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

  constructor(props) {
    super(props)
    this.setPage(1)
    this.setRows([])

    this.state = {
      dataSource: [],
      isRefreshing: false,
      paginationStatus: PaginationStatus.FIRST_LOAD
    }
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.firstLoader) {
      this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onRefresh = () => {
    console.log('onRefresh()')
    if (this.mounted) {
      this.setState({ isRefreshing: true })
      this.setPage(1)
      this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch)
    }
  }

  onPaginate = () => {
    if (this.state.paginationStatus !== PaginationStatus.ALL_LOADED && !this.state.isRefreshing) {
      console.log('onPaginate()')
      this.setState({ paginationStatus: PaginationStatus.WAITING })
      this.props.onFetch(this.getPage() + 1, this.postPaginate, this.endFetch)
    }
  }

  onEndReached = () => {
    // console.log('onEndReached()');
    if (this.props.pagination && this.props.autoPagination && this.state.paginationStatus === PaginationStatus.WAITING) {
      this.onPaginate()
    }
  }

  setPage = page => this.page = page

  getPage = () => this.page

  setRows = rows => this.rows = rows

  getRows = () => this.rows

  sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

  refresh = () => {
    this.onRefresh()
  }

  scrollToOffset = (option) => {
    this._flatList.scrollToOffset(option)
  }

  scrollToIndex = (option) => {
    this._flatList.scrollToIndex(option)
  }

  scrollToItem = (option) => {
    this._flatList.scrollToItem(option)
  }

  scrollToEnd = (option) => {
    this._flatList.scrollToEnd(option)
  }

  postRefresh = (rows = [], pageLimit) => {
    if (this.mounted) {
      let paginationStatus = PaginationStatus.WAITING
      if (rows.length < pageLimit) {
        paginationStatus = PaginationStatus.ALL_LOADED
      }
      this.updateRows(rows, paginationStatus)
    }
  }

  postPaginate = (rows = [], pageLimit) => {
    this.setPage(this.getPage() + 1)
    let mergedRows
    let paginationStatus
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.ALL_LOADED
    } else {
      mergedRows = this.getRows().concat(rows)
      paginationStatus = PaginationStatus.WAITING
    }

    this.updateRows(mergedRows, paginationStatus)
  }

  updateRows = (rows, paginationStatus) => {
    if (rows) {
      this.setRows(rows)
      this.setState({
        dataSource: rows,
        isRefreshing: false,
        paginationStatus
      })
    } else {
      this.setState({
        dataSource: this.getRows().slice(),
        isRefreshing: false,
        paginationStatus
      })
    }

  }

  endFetch = () => {
    console.log('endRefresh()');
    if (this.mounted) {
      this.setState({ isRefreshing: false })
    }
  }

  updateDataSource(rows = []) {
    this.setRows(rows)
    this.setState({
      dataSource: rows
    })
  }

  keyExtractor = (item, index) => {
    if (this.props.keyExtractor) {
      return this.props.keyExtractor(item, index)
    }
    return `index-${index}`
  }

  paginationFetchingView = () => {
    if (this.props.paginationFetchingView) {
      return this.props.paginationFetchingView()
    }

    return (
      <View style={styles.fetchingView}>
        <Text style={styles.paginationViewText}>{this.props.waitingSpinnerText}</Text>
      </View>
    )
  }

  paginationAllLoadedView = () => {
    if (this.props.pagination) {
      if (this.props.paginationAllLoadedView) {
        return this.props.paginationAllLoadedView()
      }

      return (
        <View style={styles.paginationView}>
          <Text style={styles.allLoadedText}>
            {this.props.allLoadedText}
          </Text>
        </View>
      )
    }

    return null
  }

  paginationWaitingView = (paginateCallback) => {
    if (this.props.pagination) {
      if (this.props.autoPagination) {
        if (this.props.paginationWaitingView) {
          return this.props.paginationWaitingView(paginateCallback)
        }

        return (
          <View style={styles.paginationView}>
            <ActivityIndicator color={this.props.spinnerColor} size={this.props.waitingSpinnerSize} />
            <Text
              style={[styles.paginationViewText, { marginLeft: 5 }]}
            >{this.props.waitingSpinnerText}
            </Text>
          </View>
        )
      }
    }

    return null
  }


  renderEmptyView = () => {
    if (this.state.paginationStatus !== PaginationStatus.FIRST_LOAD && this.props.emptyView) {
      return this.props.emptyView()
    }

    return null
  }

  renderFooter = () => {
    if (this.state.paginationStatus === PaginationStatus.FIRST_LOAD) {
      return this.paginationFetchingView()
    } else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === false) {
      return this.paginationWaitingView(this.onPaginate)
    } else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === true) {
      return this.paginationWaitingView()
    } else if (this.getRows().length !== 0 && this.state.paginationStatus === PaginationStatus.ALL_LOADED) {
      return this.paginationAllLoadedView()
    }

    return null
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
      )
    }
    return null
  }

  render() {
    const { numColumns } = this.props
    return (
      <FlatList
        key={numColumns}
        onEndReachedThreshold={0.1}
        {...this.props}
        ref={ref => this._flatList = ref}
        data={this.state.dataSource}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmptyView}
        onEndReached={this.onEndReached}
        refreshControl={this.renderRefreshControl()}
        numColumns={numColumns}
        keyExtractor={this.keyExtractor}
      />
    )
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