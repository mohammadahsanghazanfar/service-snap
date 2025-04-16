import { createSlice } from "@reduxjs/toolkit";


// Initial state
const initialState = {
  barsClick:false,
  theme:'light',
  cart:false,
  items:[],
  user:{},
  isAuthenticated:false,
  email:'',
  searchQuery: '',
  searchResults: [],
  comments:{},
  commentsArray:[],
  commentsData:{},
  comBox:{},
  comData:[],
  length:'',
  comObj:{},
  reply:{},
  currentPage: 1,   
  totalPages: 1,    
  itemsPerPage: 3, 
  booksTouched:false,
  booksDes:'',
  tickets:{},
  ticketArr:[],
  adminLogin:false,
  userEmail:'',
  message:[],
title:''
  

};

// Create the slice
const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setCart(state, action) {
         state.cart= !state.cart
    },
    setBarsClick(state,action){
        state.barsClick=action.payload
    },
    setTheme(state,action){
      state.theme=action.payload
    },
    setEmail(state,action){
      state.email=action.payload
    },
    setIsAuthenticated(state,action){
      state.isAuthenticated=action.payload
    },
    setLogout(state,action){
      state.isAuthenticated=action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setComments(state, action) {
     state.comments=action.payload
      
    },
    setCommentsArray(state, action) {
      state.commentsArray=action.payload
       
     },
    setTitle(state,action){
        state.title=action.payload
    }, 
    setItems(state,action){
      state.items.push(action.payload)
  }, 
    resetItems(state,action){
      state.items=[]
    },
    setCommentsData(state,action){
       state.commentsData=action.payload
    },

    setRemoveItem(state,action){
      state.items.splice(action.payload,1)
    },
    setCommentBox(state,action){
       state.comBox=action.payload
    },
      setComData(state,action){
        state.comData=action.payload
      },
      setLength(state,action){
        state.length=action.payload
      },
      setComObj(state,action){
          state.comObj=action.payload
      },
      setReply(state,action){
        state.reply=action.payload
    },
    setBooksTouched(state,action){
      state.booksTouched= !state.booksTouched
  },
  setBooksDes(state,action){
    state.booksDes=action.payload
},
setTickets(state,action){
    state.tickets=action.payload
},
   setTicketsArr(state,action){
    state.ticketArr=action.payload
   } ,
   setAdminLogin(state,action){
    state.adminLogin=action.payload
   },   
   setUserEmail(state,action){
      state.userEmail=action.payload
   },
   setMessage(state,action){
    state.message=action.payload
   } 
       
      
     
  }
});

export const userActions = slice.actions;


export default slice.reducer;
