/**
 * @flow
 * Created by Rabbit on 2018/4/23.
 */

import * as React from 'react';
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  VirtualizedList
} from 'react-native'

const { width, height } = Dimensions.get('window')

const PaginationStatus = {
  FIRST_LOAD: 0,
  WAITING: 1,
  ALL_LOADED: 2
}
// type paginationStatus = 'FIRST_LOAD' | 'WAITING' | 'ALL_LOADED';

type IndicatorSize = number | 'small' | 'large';

export type Props = {
  initialNumToRender?: number,
  horizontal?: boolean,
  keyExtractor?: (item: any, index: number) => string,

  renderItem: ({ item: any, index: number }) => ?React.Element<any>,
  ListHeaderComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,
  ListFooterComponent?: ?React.ComponentType<any>,
  ListEmptyComponent?: ?React.ComponentType<any>,

  firstLoader?: boolean,
  scrollEnabled?: boolean,
  onFetch: (page: number, postRefresh: any, endFetch: any) => void,

  // Custom View
  PaginationFetchingView?: any,
  PaginationAllLoadedView?: any,
  PaginationWaitingView?: any,

  SeparatorComponent?: ?React.ComponentType<any>,

  // Refreshable
  refreshable: boolean,

  // RefreshControl
  refreshableTitle: string,
  refreshableColors: Array<string>,
  refreshableProgressBackgroundColor: ?string,
  refreshableSize: ?number,
  refreshableTintColor: ?string,

  // Pagination
  pagination: ?boolean,
  autoPagination: ?boolean,
  allLoadedText: ?string,

  // Spinner
  spinnerColor: ?string,
  fetchingSpinnerSize: ?number,
  waitingSpinnerSize: IndicatorSize,
  waitingSpinnerText: ?string,

  // Pagination Button
  paginationBtnText: ?string,

  // GridView
  numColumns: number
};


type State = {
  dataSource: Array<any>,
  isRefreshing: boolean,
  paginationStatus: number,
}

export default class index extends React.Component<Props, State> {
  static defaultProps = {
    initialNumToRender: 10,
    horizontal: false,
    keyExtractor: null,

    renderItem: null,

    firstLoader: true,
    scrollEnabled: true,
    onFetch: null,

    // Custom View
    PaginationFetchingView: null,
    PaginationAllLoadedView: null,
    PaginationWaitingView: null,

    // Refreshable
    refreshable: true,

    // RefreshControl
    refreshableTitle: '',
    refreshableColors: ['dimgray', 'tomato', 'limegreen'],
    refreshableProgressBackgroundColor: 'white',
    refreshableSize: 'small',
    refreshableTintColor: 'lightgray',

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

  /*
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

    // RefreshControl
    refreshableTitle: PropTypes.string,
    refreshableColors: PropTypes.array,
    refreshableProgressBackgroundColor: PropTypes.string,
    refreshableSize: PropTypes.string,
    refreshableTintColor: PropTypes.string,
    customRefreshControl: PropTypes.func,

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

  mounted: boolean
  rows: Array<any>
  page: number
  _flatList: ?React.ElementRef<any> = null;


  constructor(props: Props) {
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

  setPage = (page: number) => this.page = page

  getPage = () => this.page

  setRows = (rows: Array<any>) => {
    this.rows = rows
  }

  getRows = () => this.rows

  refresh = () => {
    this.onRefresh()
  }

  // scrollToOffset = (option) => {
  //   this._flatList.scrollToOffset(option)
  // }
  //
  // scrollToIndex = (option) => {
  //   this._flatList.scrollToIndex(option)
  // }
  //
  // scrollToItem = (option) => {
  //   this._flatList.scrollToItem(option)
  // }
  //
  // scrollToEnd = (option) => {
  //   this._flatList.scrollToEnd(option)
  // }

  postRefresh = (rows: Array<any> = [], pageLimit: number) => {
    if (this.mounted) {
      let paginationStatus = PaginationStatus.WAITING
      if (rows.length < pageLimit) {
        paginationStatus = PaginationStatus.ALL_LOADED
      }
      this.updateRows(rows, paginationStatus)
    }
  }

  postPaginate = (rows: Array<any> = []) => {
    this.setPage(this.getPage() + 1)
    let mergedRows = []
    let paginationStatus
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.ALL_LOADED
    } else {
      mergedRows = this.getRows().concat(rows)
      paginationStatus = PaginationStatus.WAITING
    }

    this.updateRows(mergedRows, paginationStatus)
  }

  updateRows = (rows: Array<any>, paginationStatus: number) => {
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

  updateDataSource(rows: Array<any> = []) {
    this.setRows(rows)
    this.setState({
      dataSource: rows
    })
  }

  keyExtractor = (item: any, index: number) => {
    if (this.props.keyExtractor) {
      return this.props.keyExtractor(item, index)
    }
    return `index-${index}`
  }

  PaginationFetchingView = () => {
    if (this.props.PaginationFetchingView) {
      return this.props.PaginationFetchingView()
    }

    return (
      <View style={styles.fetchingView}>
        <Text style={styles.paginationViewText}>{this.props.waitingSpinnerText}</Text>
      </View>
    )
  }

  PaginationAllLoadedView = () => {
    if (this.props.pagination) {
      if (this.props.PaginationAllLoadedView) {
        return this.props.PaginationAllLoadedView()
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

  PaginationWaitingView = (paginateCallback: any) => {
    if (this.props.pagination) {
      if (this.props.autoPagination) {
        if (this.props.PaginationWaitingView) {
          // return <paginationWaitingView />
          return this.props.PaginationWaitingView(paginateCallback)
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
        )
      }
    }

    return null
  }

  renderFooter = () => {

    if (this.state.paginationStatus === PaginationStatus.FIRST_LOAD) {
      return this.PaginationFetchingView()
    } else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === false) {
      return this.PaginationWaitingView(this.onPaginate)
    } else if (this.state.paginationStatus === PaginationStatus.WAITING && this.props.autoPagination === true) {
      return this.PaginationWaitingView()
    } else if (this.getRows().length !== 0 && this.state.paginationStatus === PaginationStatus.ALL_LOADED) {
      return this.PaginationAllLoadedView()
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
    const { numColumns, ListEmptyComponent } = this.props

    let emptyView
    if (this.state.paginationStatus !== PaginationStatus.FIRST_LOAD && ListEmptyComponent){
      emptyView = <ListEmptyComponent />
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