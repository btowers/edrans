"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[640],{4640:(e,a,o)=>{o.r(a),o.d(a,{default:()=>q});var n=o(3673),i=o(8880);const l={class:"row justify-end q-py-md"},s={class:"q-mr-md"},t={class:"row justify-center q-pt-md"};function r(e,a,o,r,d,u){const c=(0,n.up)("q-input"),p=(0,n.up)("q-btn"),g=(0,n.up)("q-separator"),m=(0,n.up)("q-card-section"),b=(0,n.up)("q-card"),f=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(f,{class:"flex flex-center"},{default:(0,n.w5)((()=>[(0,n.Wm)(b,{class:"login"},{default:(0,n.w5)((()=>[(0,n.Wm)(m,null,{default:(0,n.w5)((()=>[(0,n.Wm)(c,{onKeyup:(0,i.D2)(u.loginUser,["enter"]),modelValue:d.user.email,"onUpdate:modelValue":a[0]||(a[0]=e=>d.user.email=e),label:"Usuario"},null,8,["onKeyup","modelValue"]),(0,n.Wm)(c,{onKeyup:(0,i.D2)(u.loginUser,["enter"]),modelValue:d.user.password,"onUpdate:modelValue":a[1]||(a[1]=e=>d.user.password=e),type:d.isPwd?"password":"text",label:"Contraseña"},null,8,["onKeyup","modelValue","type"]),(0,n._)("div",l,[(0,n._)("div",s,[(0,n.Wm)(p,{disable:d.loading||d.fbLoading,flat:"",onClick:a[2]||(a[2]=e=>this.$router.push("/register")),color:"primary",label:"Registrarse"},null,8,["disable"])]),(0,n._)("div",null,[(0,n.Wm)(p,{disable:d.loading||d.fbLoading,onClick:u.loginUser,color:"primary",label:"Login",loading:d.loading},null,8,["disable","onClick","loading"])])]),(0,n.Wm)(g),(0,n._)("div",t,[(0,n._)("div",null,[(0,n.Wm)(p,{disable:d.loading||d.fbLoading,onClick:u.facebookLogin,icon:"fab fa-facebook-f",color:"primary",label:"Facebook Login",loading:d.fbLoading},null,8,["disable","onClick","loading"])])])])),_:1})])),_:1})])),_:1})}o(5363);var d=o(3617);const u={name:"LoginPage",data(){return{fbLoading:!1,loading:!1,isPwd:!0,user:{email:"",password:""}}},methods:{...(0,d.OI)({setAdmin:"user/setAdmin"}),loginUser(){this.loading=!0,this.$axios({method:"POST",url:"/api/user/login",headers:{"Content-Type":"application/json",Accept:"application/json"},data:this.user}).then((e=>{this.loading=!1,e.data.token?(this.$q.cookies.set("token",e.data.token),this.$router.push("/")):this.$q.notify({position:"bottom-right",color:"negative",message:e.data.message})})).catch((e=>{this.loading=!1,this.$q.notify({position:"bottom-right",color:"negative",message:"Error al iniciar sesión"})}))},facebookLogin(){this.fbLoading=!0,window.location.replace("https://edranschallenge.herokuapp.com/api/user/facebook")}}};var c=o(4260),p=o(4379),g=o(151),m=o(5589),b=o(4842),f=o(8240),h=o(5869),k=o(7518),w=o.n(k);const y=(0,c.Z)(u,[["render",r]]),q=y;w()(u,"components",{QPage:p.Z,QCard:g.Z,QCardSection:m.Z,QInput:b.Z,QBtn:f.Z,QSeparator:h.Z})}}]);