/**
 * by 下一刻
 */
import React, { Component } from 'react';
import { Dimensions, View, Animated, ScrollView, StyleSheet, InteractionManager, Platform } from 'react-native';
import PropTypes from 'prop-types';

import SceneComponent from './SceneComponent';
import DefaultTabBar from './DefaultTabBar';
import ScrollableTabBar from './ScrollableTabBar';

export default class ScrollableTabView extends Component<any> {
  static DefaultTabBar = DefaultTabBar;
  static ScrollableTabBar = ScrollableTabBar;
  static propTypes = {
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'overlayTop', 'overlayBottom']),
    initialPage: PropTypes.number,
    page: PropTypes.number,
    onChangeTab: PropTypes.func,
    onScroll: PropTypes.func,
    renderTabBar: PropTypes.any,
    // style: View.propTypes.style,
    contentProps: PropTypes.object,
    scrollWithoutAnimation: PropTypes.bool,
    locked: PropTypes.bool,
    prerenderingSiblingsNumber: PropTypes.number,
    collapsableBar: PropTypes.node
  };
  static defaultProps = {
    tabBarPosition: 'top',
    initialPage: 0,
    page: -1,
    onChangeTab: () => {},
    onScroll: () => {},
    contentProps: {},
    scrollWithoutAnimation: false,
    locked: false,
    prerenderingSiblingsNumber: 0
  };

  constructor(props) {
    super(props);
    const width = Dimensions.get('window').width;

    this.state = {
      currentPage: this.props.initialPage,
      scrollX: new Animated.Value(this.props.initialPage * width),
      scrollValue: new Animated.Value(this.props.initialPage),
      containerWidth: width,
      sceneKeys: this.newSceneKeys({ currentPage: this.props.initialPage })
    };
  }

  componentDidMount() {
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        if (Platform.OS === 'android') {
          this.goToPage(this.props.initialPage, false);
        }
      });
    }, 0);

    this.state.scrollX.addListener(({ value }) => {
      const scrollValue = value / this.state.containerWidth;
      this.state.scrollValue.setValue(scrollValue);
      this.props.onScroll(scrollValue);
    });
  }

  componentWillReceiveProps(props) {
    if (props.children !== this.props.children) {
      this.updateSceneKeys({
        page: this.state.currentPage,
        children: props.children
      });
    }

    if (props.page >= 0 && props.page !== this.state.currentPage) {
      this.goToPage(props.page);
    }
  }

  goToPage = (pageNumber, animated = !this.props.scrollWithoutAnimation) => {
    const offset = pageNumber * this.state.containerWidth;
    if (this.scrollView && this.scrollView._component && this.scrollView._component.scrollTo) {
      this.scrollView._component.scrollTo({ x: offset, y: 0, animated });
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber)
    });
  };

  renderTabBar = props => {
    if (this.props.renderTabBar === false) {
      return null;
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(props), props);
    } else {
      return <DefaultTabBar {...props} />;
    }
  };

  updateSceneKeys = ({ page, children = this.props.children, callback = () => {} }) => {
    const newKeys = this.newSceneKeys({
      previousKeys: this.state.sceneKeys,
      currentPage: page,
      children
    });
    this.setState({ currentPage: page, sceneKeys: newKeys }, callback);
  };

  newSceneKeys = ({ previousKeys = [], currentPage = 0, children = this.props.children }) => {
    const newKeys = [];
    this._children(children).forEach((child, idx) => {
      const key = this._makeSceneKey(child, idx);
      if (this._keyExists(previousKeys, key) || this._shouldRenderSceneKey(idx, currentPage)) {
        newKeys.push(key);
      }
    });
    return newKeys;
  };

  _shouldRenderSceneKey = (idx, currentPageKey) => {
    const numOfSibling = this.props.prerenderingSiblingsNumber;
    return idx < currentPageKey + numOfSibling + 1 && idx > currentPageKey - numOfSibling - 1;
  };

  _keyExists = (sceneKeys, key) => {
    return sceneKeys.find(sceneKey => key === sceneKey);
  };

  _makeSceneKey = (child, idx) => {
    return child.props.tabLabel + '_' + idx;
  };

  renderScrollableContent = () => {
    const scenes = this._composeScenes();
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        automaticallyAdjustContentInsets={false}
        contentOffset={{
          x: this.props.initialPage * this.state.containerWidth
        }}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: this.state.scrollX } }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
        onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
        onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!this.props.locked}
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
        {...this.props.contentProps}
      >
        {scenes}
      </Animated.ScrollView>
    );
  };

  _composeScenes = () => {
    return this._children().map((child, idx) => {
      const key = this._makeSceneKey(child, idx);
      let element;

      if (!!this.props.collapsableBar) {
        element = this.state.currentPage === idx ? child : null;
      } else {
        element = this._keyExists(this.state.sceneKeys, key) ? child : <View tabLabel={child.props.tabLabel} />;
      }

      return (
        <SceneComponent
          key={child.key}
          shouldUpdated={!!this.props.collapsableBar || this._shouldRenderSceneKey(idx, this.state.currentPage)}
          style={{ width: this.state.containerWidth }}
        >
          {element}
        </SceneComponent>
      );
    });
  };

  _onMomentumScrollBeginAndEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / this.state.containerWidth);
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page);
    }
  };

  _updateSelectedPage = nextPage => {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage)
    });
  };

  _onChangeTab = (prevPage, currentPage) => {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage
    });

    if (this.contentScrollDistance >= this.collapsableBarHeight) {
      this.contentView.scrollTo({
        x: 0,
        y: this.collapsableBarHeight,
        animated: false
      });
    }
  };

  _handleLayout = e => {
    const { width } = e.nativeEvent.layout;

    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      this.setState({ containerWidth: width });
      this.requestAnimationFrame(() => {
        this.goToPage(this.state.currentPage);
      });
    }
  };

  _children = (children = this.props.children) => {
    return React.Children.map(children, child => child);
  };

  renderCollapsableBar = () => {
    if (!this.props.collapsableBar) {
      return null;
    }
    return React.cloneElement(this.props.collapsableBar, {
      onLayout: event => {
        this.collapsableBarHeight = event.nativeEvent.layout.height;
      }
    });
  };

  render() {
    const overlayTabs =
      this.props.tabBarPosition === 'overlayTop' || this.props.tabBarPosition === 'overlayBottom';
    const tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map(child => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollX: this.state.scrollX,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth
    };

    if (this.props.tabBarBackgroundColor) {
      tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
    }
    if (this.props.tabBarActiveTextColor) {
      tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
    }
    if (this.props.tabBarInactiveTextColor) {
      tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
    }
    if (this.props.tabBarTextStyle) {
      tabBarProps.textStyle = this.props.tabBarTextStyle;
    }
    if (this.props.tabBarUnderlineStyle) {
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0
      };
    }
    const ContainerView = this.props.collapsableBar ? ScrollView : View;

    return (
      <ContainerView
        style={[styles.container, this.props.style]}
        onLayout={this._handleLayout}
        ref={contentView => {
          this.contentView = contentView;
        }}
        onMomentumScrollEnd={event => {
          this.contentScrollDistance = event.nativeEvent.contentOffset.y;
        }}
        stickyHeaderIndices={this.props.collapsableBar ? [1] : []}
        refreshControl={this.props.refreshControl}
      >
        {this.renderCollapsableBar()}
        {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
        {this.renderScrollableContent()}
        {(this.props.tabBarPosition === 'bottom' || overlayTabs) && this.renderTabBar(tabBarProps)}
      </ContainerView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollableContentAndroid: {
    flex: 1
  }
});
