import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from "native-base";
import { connect } from 'react-redux'

class IconTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, badgeCount, color, size, type } = this.props;
    return (
      <View style={styles.viewIcon}>
        <Icon name={name} style={{ color, fontSize: 24 }} type={type ? type : 'FontAwesome'} />
        {(name === 'shopping-cart') && this.props.carts.length > 0 ? (
          <View
            style={styles.viewTextIcon}
          >
            <Text style={styles.text}>
              {this.props.carts.length}
            </Text>
          </View>
        ): null}
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    carts : state.carts
  }
}
export default connect(mapStateToProps, null)(IconTab)
const styles = StyleSheet.create({
  viewIcon: {
    width: 24,
    height: 24,
    margin: 5
  },
  viewTextIcon: {
    position: 'absolute',
    left: -10,
    top: 7,
    backgroundColor: '#FF6969',
    borderRadius: 7,
    minWidth: 14,
    minHeight: 14,
    paddingHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold'
  }
})