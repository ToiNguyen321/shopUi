import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, BackHandler } from 'react-native';
import Header from '../Header';
import BestSale from './BestSale';
import BoxProduct from './BoxProduct';
import { ScrollView } from 'react-native-gesture-handler';
import { dataProducts } from '../../common/dataProduct';
import { fetchPost } from '../../common/Api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataListCategories: [
        {title: "Popular Deals"},
        {title: "Popular Clear"},
      ],
      dataProducts: dataProducts,
      scrollY: new Animated.Value(0)
    }
    this._onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.scrollY
            }
          }
        }
      ],
    )
    
  }
  componentDidMount(){
    let url = 'Api'
    let data = {cmd: 3};
    fetchPost(url, data, (dataProducts) => {
      this.setState({
        dataProducts
      })
    })
  }
  _hardwareBackPress = ()=>{
    return true;
  }
  render() {
    console.log(this.state.dataProducts)
    const translateY = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -200],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.container}>
        <Header title={'Welcome'} back={false} navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <Animated.View style={[ styles.bestSale, {transform: [ {translateY} ]}]}>
            <BestSale />
          </Animated.View>
          {
            this.state.dataListCategories.map((item,index) =>
              <Animated.View key={`${index}`} style={[styles.boxProduct]}>
                <BoxProduct navigate={this.props.navigation.navigate} title={item.title} data={this.state.data} onScroll={this._onScroll} />
              </Animated.View>
            )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bestSale: {
    height: 180,
  },
  boxProduct: {
    flex: 1,
  }
})