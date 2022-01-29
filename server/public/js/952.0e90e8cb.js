"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[952],{8952:(e,l,a)=>{a.r(l),a.d(l,{default:()=>P});var o=a(3673);const r={class:"row justify-end q-gutter-sm"},u=(0,o.Uk)("Login");function s(e,l,a,s,i,n){const d=(0,o.up)("q-input"),t=(0,o.up)("q-icon"),m=(0,o.up)("q-card-section"),c=(0,o.up)("q-separator"),p=(0,o.up)("router-link"),w=(0,o.up)("q-btn"),V=(0,o.up)("q-card"),f=(0,o.up)("q-form"),b=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(b,{class:"flex flex-center"},{default:(0,o.w5)((()=>[(0,o.Wm)(f,{class:"q-gutter-md"},{default:(0,o.w5)((()=>[(0,o.Wm)(V,{class:"register q-pa-md"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{horizontal:""},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{style:{width:"100%"}},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{modelValue:i.user.nombre,"onUpdate:modelValue":l[0]||(l[0]=e=>i.user.nombre=e),name:"nombre",label:"Nombre",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","rules"]),(0,o.Wm)(d,{modelValue:i.user.email,"onUpdate:modelValue":l[1]||(l[1]=e=>i.user.email=e),type:"email",name:"email",label:"Email",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","rules"]),(0,o.Wm)(d,{modelValue:i.user.password,"onUpdate:modelValue":l[3]||(l[3]=e=>i.user.password=e),type:i.isPwd?"password":"text",name:"password",label:"Contraseña",rules:[e=>!!e||"Field is required"]},{append:(0,o.w5)((()=>[(0,o.Wm)(t,{name:i.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:l[2]||(l[2]=e=>i.isPwd=!i.isPwd)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,o.Wm)(d,{modelValue:i.user.confirmPassword,"onUpdate:modelValue":l[5]||(l[5]=e=>i.user.confirmPassword=e),type:i.isPwd?"password":"text",name:"passwordRepeat",label:"Repita Contraseña",rules:[e=>!!e||"Field is required"]},{append:(0,o.w5)((()=>[(0,o.Wm)(t,{name:i.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:l[4]||(l[4]=e=>i.isPwd=!i.isPwd)},null,8,["name"])])),_:1},8,["modelValue","type","rules"])])),_:1}),(0,o.Wm)(c,{vertical:""}),(0,o.Wm)(m,{style:{width:"100%"}},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{mask:"(##) ####-####",modelValue:i.user.telefono,"onUpdate:modelValue":l[6]||(l[6]=e=>i.user.telefono=e),name:"telefono",label:"Teléfono",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","rules"]),(0,o.Wm)(d,{modelValue:i.user.direccion.calle,"onUpdate:modelValue":l[7]||(l[7]=e=>i.user.direccion.calle=e),name:"calle",label:"Calle",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","rules"]),(0,o.Wm)(d,{modelValue:i.user.direccion.altura,"onUpdate:modelValue":l[8]||(l[8]=e=>i.user.direccion.altura=e),name:"altura",label:"Altura",rules:[e=>!!e||"Field is required"]},null,8,["modelValue","rules"]),(0,o.Wm)(d,{modelValue:i.user.direccion.cp,"onUpdate:modelValue":l[9]||(l[9]=e=>i.user.direccion.cp=e),name:"cp",label:"CP"},null,8,["modelValue"]),(0,o.Wm)(d,{modelValue:i.user.direccion.piso,"onUpdate:modelValue":l[10]||(l[10]=e=>i.user.direccion.piso=e),name:"piso",label:"Piso"},null,8,["modelValue"]),(0,o.Wm)(d,{modelValue:i.user.direccion.departamento,"onUpdate:modelValue":l[11]||(l[11]=e=>i.user.direccion.departamento=e),name:"departamento",label:"Departamento"},null,8,["modelValue"])])),_:1})])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[(0,o._)("div",r,[(0,o._)("div",null,[(0,o.Wm)(p,{to:"/login"},{default:(0,o.w5)((()=>[u])),_:1})]),(0,o._)("div",null,[(0,o.Wm)(w,{onClick:n.onSubmit,color:"primary",label:"Register",loading:i.loadingBtn},null,8,["onClick","loading"])])])])),_:1})])),_:1})])),_:1})])),_:1})}var i=a(52),n=a.n(i);const d={name:"RegisterPage",data(){return{user:{nombre:"",email:"",password:"",confirmPassword:"",direccion:{calle:"",altura:"",cp:"",piso:"",departamento:""},telefono:""},loadingBtn:!1,isPwd:!0}},methods:{async onSubmit(){this.loadingBtn=!0,await n().post("/api/user/signup",this.user).then((e=>{this.$router.push("/login")})).catch((e=>{console.log(e)})),this.loadingBtn=!1}}};var t=a(4260),m=a(4379),c=a(5269),p=a(151),w=a(5589),V=a(4842),f=a(4554),b=a(5869),W=a(8240),g=a(7518),q=a.n(g);const _=(0,t.Z)(d,[["render",s]]),P=_;q()(d,"components",{QPage:m.Z,QForm:c.Z,QCard:p.Z,QCardSection:w.Z,QInput:V.Z,QIcon:f.Z,QSeparator:b.Z,QBtn:W.Z})}}]);