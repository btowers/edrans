"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[505],{6505:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var s=a(3673);const o={class:"row justify-between q-py-sm"},l={class:"q-pt-md"},n=(0,s.Uk)("Register");function i(e,t,a,i,r,d){const u=(0,s.up)("q-input"),c=(0,s.up)("q-btn"),g=(0,s.up)("router-link"),p=(0,s.up)("q-card-section"),m=(0,s.up)("q-card"),h=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(h,{class:"flex flex-center"},{default:(0,s.w5)((()=>[(0,s.Wm)(m,{class:"login-card"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,{modelValue:r.user.email,"onUpdate:modelValue":t[0]||(t[0]=e=>r.user.email=e),label:"Usuario"},null,8,["modelValue"]),(0,s.Wm)(u,{modelValue:r.user.password,"onUpdate:modelValue":t[1]||(t[1]=e=>r.user.password=e),type:r.isPwd?"password":"text",label:"Contraseña"},null,8,["modelValue","type"]),(0,s._)("div",o,[(0,s._)("div",null,[(0,s.Wm)(c,{onClick:d.loginUser,color:"primary",label:"Login",loading:r.loading},null,8,["onClick","loading"])]),(0,s._)("div",l,[(0,s.Wm)(g,{to:"/register"},{default:(0,s.w5)((()=>[n])),_:1})])])])),_:1})])),_:1})])),_:1})}const r={name:"LoginPage",data(){return{loading:!1,isPwd:!0,user:{email:"",password:""}}},methods:{loginUser(){this.loading=!0,this.$axios.post("/api/user/login",this.user).then((e=>{this.loading=!1,e.data.token?(localStorage.setItem("token",e.data.token),this.$router.push("/")):this.$q.notify({position:"bottom-right",color:"negative",message:e.data.message})})).catch((e=>{console.log(e),this.loading=!1,this.$q.notify({position:"bottom-right",color:"negative",message:e.message})}))}}};var d=a(4260),u=a(4379),c=a(151),g=a(5589),p=a(4842),m=a(8240),h=a(7518),w=a.n(h);const f=(0,d.Z)(r,[["render",i]]),k=f;w()(r,"components",{QPage:u.Z,QCard:c.Z,QCardSection:g.Z,QInput:p.Z,QBtn:m.Z})}}]);