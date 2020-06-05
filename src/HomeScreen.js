import * as React from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux'
import {itemAddedToCart, itemRemovedFromCart, checkOut, shopAgain} from './redux/actions'; 
import { bindActionCreators } from 'redux' 
class HomeScreen extends React.Component {
 
   FlatListItemSeparator = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
  addItem(item) { 
    this.props.itemAddedToCart(item.id) 
  }
  removeItem(item) { 
    this.props.itemRemovedFromCart(item.id)
  }

  checkOut(){
    this.props.checkOut();
  }
  render(){
  return (
    <View style={styles.container}>

      {this.props.checkedOut?
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image
        style={styles.stretch}
        source={require('../assets/img/success.png')}
      />
          <Text style={styles.successText}>Order Received Successfully</Text>
          <TouchableOpacity style={styles.backToShopButton} onPress={() => this.props.shopAgain()}>
              <Text style={styles.cartTextBtn}>Shop Again</Text>
          </TouchableOpacity>

      </View> : 
      <View style={{flex:1}}>
         <View style={{flex:2}}>
        <View style={styles.subContainer}>
           <View style={{flex:1 }}>
             <Text style={styles.heading}>WELCOME TO My SHOP</Text>
           </View>
               
            <View style={{flex:1,flexDirection:'row'}}>
             <View style={{flex:1}}><Text style={styles.subHeading}>Cart: {this.props.itemsInCart.length} Items</Text></View>
       <View style={{flex:1.4}}><Text style={styles.subHeading}>Price &#8377;: {this.props.totalPrice}</Text></View>
             </View>
       </View> 
     </View>
      {

        this.props.itemsInCart.length >10 && <View style={{flex:1}}><Text style={styles.errorText}>* You can choose only 10 items per order. Please Remove Items To Continue</Text></View>

      }
      
      <View style={{flex:8}}>
    <FlatList
      data={this.props.products}
      //data defined in constructor
      ItemSeparatorComponent={this.FlatListItemSeparator}
      //Item Separator View
      renderItem={({ item }) => (
        // Single Comes here which will be repeatative for the FlatListItems
        <View style={styles.productCard}>
          <View style={{flex:1,flexDirection:"row"}}>
            <View style={{flex:3}}>
            <Text style={styles.productTitle}>{item.title}</Text>
            </View><View style={{flex:1,alignItems:"flex-end"}}>
            <Text style={styles.priceText}>&#8377;{item.price}</Text>
          </View> 
          </View>
          <View style={{flex:1,marginTop:5}}>
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>
          <View style={{flex:1,marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <View style={{flex:2}}>
              <Text style={styles.productDescription}>Category: {item.type}</Text>
              {item.quantity<1 ?<Text style={styles.quantityTextError}>Out Of Stock</Text> :<Text style={styles.quantityText}>Avaliable Quantity: {item.quantity}</Text>}
              </View>
              {!this.props.itemsInCart.find(product=> product.id === item.id) ? 
                <View style={{flex:1, flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>this.addItem(item)} style={styles.addToCartButton}>
                  <Text style={styles.cartTextBtn}>Add To Cart</Text>
                </TouchableOpacity> 
             </View>
                :
                <View style={{flex:1, flexDirection:"row"}}>
                <TouchableOpacity   onPress={()=>this.removeItem(item)} style={styles.cartButton}>
                  <Text style={styles.cartTextBtn}>-</Text>
                </TouchableOpacity>
                <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
              <Text style={styles.cartText}>{this.props.itemsInCart.find(product=> product.id === item.id).quantity}</Text>
                </View>
                <TouchableOpacity  onPress={()=>this.addItem(item)} style={styles.cartButton}>
                <Text style={styles.cartTextBtn}>+</Text>
                </TouchableOpacity>
             </View>
              }
             
           
          </View> 
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
       <TouchableOpacity disabled={this.props.itemsInCart.length >= 10 || this.props.itemsInCart.length==0 }  style={this.props.itemsInCart.length >= 10 || this.props.itemsInCart.length==0? styles.checkOutButtonDisabled : styles.checkOutButton} onPress={() => this.checkOut()}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
               <Text style={styles.checkOutButtonText}>CHECK OUT</Text>
           </View>
        </TouchableOpacity> 
       </View>
       }

  </View>
  );}
}

const styles  = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent:"center",
  },
  subContainer: {
    paddingTop:50,
    flex:1,  
     backgroundColor: '#1D1442',
     justifyContent:'center',
     alignItems:'center'
 
   }, 
    heading:{
     fontSize:30,
     fontWeight:'700',
     color:'#ffffff', 
     paddingTop:5
  }, 
  subHeading:{
    fontSize:20,
    fontWeight:'400',
    color:'#ffffff', 
    padding:15
 },
 errorText:{
  fontSize:15,
  fontWeight:'400',
  color:'#fff',
  backgroundColor:'#BD1F1A', 
  padding:15,
  textAlign:'center',
 },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
   checkOutButton:
  {
   flex:1, 
   justifyContent:'center',
   alignItems:'center',
   backgroundColor: "#D92323", 
 },
 checkOutButtonDisabled:{
  flex:1, 
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: "#D58987", 
 },
 checkOutButtonText:{
    fontSize:25,
    fontWeight:'200',
    color:'#ffffff',
    fontFamily:'Kailasa-Bold'
 },
 productCard:{
   backgroundColor:'#FBF8FC',
   margin:5,
   borderRadius:10,
   padding:15
 },
 productTitle:{
   color:'#1D1442',
   fontSize:18,
   fontWeight:'600', 
 },
 productDescription:{
  color:'#1D1442',
  fontSize:13,
  fontWeight:'200',
  marginBottom:5
},
priceText:{
  color:'#1D1442',
  fontSize:15,
  fontWeight:'500',
},
quantityText:{
  color:'#16A085',
  fontSize:13,
  fontWeight:'500',
},
quantityTextError:{
  color:'#D92323',
  fontSize:13,
  fontWeight:'500',
}, 
addToCartButton:{
  flex:1, 
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: "#205276", 
  height:35,
  borderRadius:5
},
cartButton:{
  flex:1, 
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: "#0BBEA8", 
  height:40,
  width:40, 
  borderRadius:20
},cartTextBtn:{ 
    fontSize:20,
    fontWeight:'700',
    color:'#ffffff',
},
cartText:{ 
    fontSize:20,
    fontWeight:'400',
},
 stretch: {
  width: 150,
  height: 150,
  resizeMode: 'stretch',
},   
successText:{
  fontSize:25,
  fontWeight:'700',
  color:'#0BBEA8', 
  margin:10
}, 
backToShopButton:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: "#0BBEA8", 
  height:60, 
  width:200,  
  borderRadius:10
},

})
const mapStateToProps = (state) => ({
     products: state.products,
     itemsInCart: state.itemsInCart,
     totalPrice: state.totalPrice,
     checkedOut: state.checkedOut,
     
}) 
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    itemAddedToCart,
    itemRemovedFromCart,
    checkOut,
    shopAgain,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)