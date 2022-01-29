"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[60],{4060:(e,t,o)=>{o.r(t),o.d(t,{default:()=>$});var a=o(3673);const i=e=>((0,a.dD)("data-v-c5b302d0"),e=e(),(0,a.Cn)(),e),l={class:"base-width"},s=i((()=>(0,a._)("div",{class:"q-mb-md"},[(0,a._)("div",{class:"text-h5 text-weight-light"},"Editar Producto")],-1))),r={class:"column justify-between",style:{height:"600px"}},c={class:"row justify-start q-gutter-md"},d={key:0,class:"col-auto"},n={class:"row justify-end"},u={class:"column justify-between",style:{height:"600px"}},p={class:"col"},m={class:"col-auto"},g={class:"row justify-end q-gutter-sm"},h=(0,a.Uk)(" Cancelar ");function f(e,t,o,i,f,y){const D=(0,a.up)("q-btn"),b=(0,a.up)("q-img"),w=(0,a.up)("q-uploader"),v=(0,a.up)("q-card-section"),q=(0,a.up)("q-separator"),_=(0,a.up)("q-input"),k=(0,a.up)("q-card"),x=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(x,{padding:"",class:"flex justify-center"},{default:(0,a.w5)((()=>[(0,a._)("div",l,[s,(0,a.Wm)(k,{class:"q-pa-md"},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{horizontal:""},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a._)("div",r,[(0,a._)("div",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(f.productDetails.fotos,(e=>((0,a.wg)(),(0,a.iD)("div",{key:e,style:{width:"150px"}},[(0,a.Wm)(b,{src:"https://coderhouse-ecommerce.s3.amazonaws.com/"+e,style:{height:"140px","max-width":"150px"},fit:"contain","no-native-menu":""},{default:(0,a.w5)((()=>[(0,a.Wm)(D,{class:"absolute all-pointer-events",style:{top:"8",right:"8"},icon:"close",color:"red",round:"",onClick:t=>y.removeImage(e)},null,8,["onClick"])])),_:2},1032,["src"])])))),128))]),f.productDetails.fotos.length<5?((0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("div",n,[(0,a.Wm)(w,{label:"Agregar imagen","no-thumbnails":"",factory:y.factoryFn,onUploaded:y.getProductDetails,style:{width:"100%"},accept:".jpg, image/*","max-files":1},null,8,["factory","onUploaded"])])])):(0,a.kq)("",!0)])])),_:1}),(0,a.Wm)(q,{vertical:""}),(0,a.Wm)(v,{style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a._)("div",u,[(0,a._)("div",p,[(0,a.Wm)(_,{modelValue:f.productDetails.nombre,"onUpdate:modelValue":t[0]||(t[0]=e=>f.productDetails.nombre=e),name:"nombre",label:"Nombre",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"]),(0,a.Wm)(_,{class:"my-input",modelValue:f.productDetails.precio,"onUpdate:modelValue":t[1]||(t[1]=e=>f.productDetails.precio=e),prefix:"$",type:"precio",name:"precio",label:"Precio",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"]),(0,a.Wm)(_,{class:"my-input",modelValue:f.productDetails.stock,"onUpdate:modelValue":t[2]||(t[2]=e=>f.productDetails.stock=e),suffix:"un.",type:"stock",name:"stock",label:"Stock",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"]),(0,a.Wm)(_,{modelValue:f.productDetails.categoria,"onUpdate:modelValue":t[3]||(t[3]=e=>f.productDetails.categoria=e),type:"categoria",name:"categoria",label:"Categoría",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"]),(0,a.Wm)(_,{modelValue:f.productDetails.descripcion,"onUpdate:modelValue":t[4]||(t[4]=e=>f.productDetails.descripcion=e),type:"textarea",name:"descripcion",label:"Descripción",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"])]),(0,a._)("div",m,[(0,a._)("div",g,[(0,a._)("div",null,[(0,a.Wm)(D,{flat:"",color:"primary",onClick:y.cancel},{default:(0,a.w5)((()=>[h])),_:1},8,["onClick"])]),(0,a._)("div",null,[(0,a.Wm)(D,{color:"primary",label:"Guardar",loading:f.loadingBtn,onClick:y.updateProduct},null,8,["loading","onClick"])])])])])])),_:1})])),_:1})])),_:1})])])),_:1})}const y={name:"EditProductPage",data(){return{loadingBtn:!1,loading:!1,qty:1,productDetails:{nombre:"",descripcion:"",categoria:"",precio:0,stock:0,fotos:[],id:""}}},created(){this.getProductDetails()},methods:{getProductDetails(){this.loading=!0,this.$axios.get("/api/products/"+this.$route.params.id).then((e=>{this.productDetails=e.data.data,this.loading=!1})).catch((e=>{console.log(e)}))},updateProduct(){this.loadingBtn=!0;const e={nombre:this.productDetails.nombre,descripcion:this.productDetails.descripcion,categoria:this.productDetails.categoria,precio:this.productDetails.precio,stock:this.productDetails.stock};this.$axios.put("/api/products/"+this.$route.params.id,e).then((()=>{this.loadingBtn=!1,this.$router.push("/"),this.$q.notify({position:"bottom-right",color:"positive",message:"Producto actualizado"})})).catch((e=>{console.log(e),this.loadingBtn=!1,this.$q.notify({position:"bottom-right",color:"negative",message:"Error al actualizar el producto"})}))},removeImage(e){console.log(e),console.log(this.productDetails.id),this.$axios.put("api/image",{filename:e,productId:this.productDetails.id}).then((()=>{this.getProductDetails(),this.$q.notify({position:"bottom-right",color:"positive",message:"Se eliminó la imagen"})})).catch((e=>{console.log(e),this.$q.notify({position:"bottom-right",color:"negative",message:"Error al eliminar la imagen"})}))},cancel(){this.$router.push("/")},factoryFn(e){const t=/(?:\.([^.]+))?$/,o=t.exec(e[0].name)[1];return new Promise(((e,t)=>{this.$axios.post("api/image/presignedurl",{productId:this.productDetails.id,type:o}).then((t=>{const o=t.data.data;console.log(o),e({url:o,method:"PUT",sendRaw:!0})})).catch((e=>{t(e)}))}))}}};var D=o(4260),b=o(4379),w=o(151),v=o(5589),q=o(4027),_=o(8240),k=o(3768),x=o(5869),C=o(4842),V=o(7518),W=o.n(V);const P=(0,D.Z)(y,[["render",f],["__scopeId","data-v-c5b302d0"]]),$=P;W()(y,"components",{QPage:b.Z,QCard:w.Z,QCardSection:v.Z,QImg:q.Z,QBtn:_.Z,QUploader:k.Z,QSeparator:x.Z,QInput:C.Z})}}]);