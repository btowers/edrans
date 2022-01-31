"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[117],{2117:(e,t,a)=>{a.r(t),a.d(t,{default:()=>z});var o=a(3673),i=a(2323);const r=e=>((0,o.dD)("data-v-1283c09a"),e=e(),(0,o.Cn)(),e),l={class:"base-width"},s=r((()=>(0,o._)("div",{class:"q-mb-md"},[(0,o._)("div",{class:"text-h5 text-weight-light"},"Crear Producto")],-1))),d={class:"q-pa-md"},c=["src"],n={class:"column justify-between",style:{height:"600px"}},u={class:"col"},p={class:"col-auto"},m={class:"row justify-end q-gutter-sm"},h=(0,o.Uk)(" Cancelar ");function f(e,t,a,r,f,g){const b=(0,o.up)("q-item-label"),_=(0,o.up)("q-item-section"),w=(0,o.up)("q-btn"),k=(0,o.up)("q-item"),y=(0,o.up)("q-list"),q=(0,o.up)("q-uploader"),v=(0,o.up)("q-card-section"),$=(0,o.up)("q-separator"),x=(0,o.up)("q-input"),D=(0,o.up)("q-card"),C=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(C,{padding:"",class:"flex justify-center"},{default:(0,o.w5)((()=>[(0,o._)("div",l,[s,(0,o.Wm)(D,{class:"q-pa-md"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{horizontal:""},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{style:{width:"100%"}},{default:(0,o.w5)((()=>[(0,o._)("div",d,[(0,o.Wm)(q,{filter:e=>(f.counter++,!0),onUploaded:g.goHome,factory:g.factoryFn,ref:"uploader",label:"Seleccionar imagenes",multiple:"","hide-upload-btn":"","max-file-size":"5000000","max-files":4,accept:".jpg, image/*",style:{width:"100%","max-width":"453px","max-height":"500px"}},{list:(0,o.w5)((e=>[(0,o.Wm)(y,{separator:""},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.files,(t=>((0,o.wg)(),(0,o.j4)(k,{key:t.__key},{default:(0,o.w5)((()=>[(0,o.Wm)(_,null,{default:(0,o.w5)((()=>[(0,o.Wm)(b,{class:"full-width ellipsis"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(t.name),1)])),_:2},1024),(0,o.Wm)(b,{caption:""},{default:(0,o.w5)((()=>[(0,o.Uk)(" Status: "+(0,i.zw)(t.__status),1)])),_:2},1024),(0,o.Wm)(b,{caption:""},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(t.__sizeLabel)+" / "+(0,i.zw)(t.__progressLabel),1)])),_:2},1024)])),_:2},1024),t.__img?((0,o.wg)(),(0,o.j4)(_,{key:0,thumbnail:"",class:"gt-xs"},{default:(0,o.w5)((()=>[(0,o._)("img",{src:t.__img.src},null,8,c)])),_:2},1024)):(0,o.kq)("",!0),(0,o.Wm)(_,{top:"",side:""},{default:(0,o.w5)((()=>[(0,o.Wm)(w,{class:"gt-xs",size:"12px",flat:"",dense:"",round:"",icon:"delete",onClick:a=>e.removeFile(t)},null,8,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:2},1024)])),_:1},8,["filter","onUploaded","factory"])])])),_:1}),(0,o.Wm)($,{vertical:""}),(0,o.Wm)(v,{style:{width:"100%"}},{default:(0,o.w5)((()=>[(0,o._)("div",n,[(0,o._)("div",u,[(0,o.Wm)(x,{disable:f.loadingBtn,modelValue:f.productDetails.nombre,"onUpdate:modelValue":t[0]||(t[0]=e=>f.productDetails.nombre=e),name:"nombre",ref:"nombreRef",label:"Nombre","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>e.length>3||"El nombre debe tener al menos 4 caracteres",e=>e.length<50||"El nombre debe tener menos de 50 caracteres"]},null,8,["disable","modelValue","rules"]),(0,o.Wm)(x,{disable:f.loadingBtn,class:"my-input",modelValue:f.productDetails.precio,"onUpdate:modelValue":t[1]||(t[1]=e=>f.productDetails.precio=e),prefix:"$",type:"precio",name:"precio",ref:"precioRef",label:"Precio","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>e>0||"El precio debe ser mayor a 0",e=>e<1e6||"El precio debe ser menor a 1.000.000"]},null,8,["disable","modelValue","rules"]),(0,o.Wm)(x,{disable:f.loadingBtn,class:"my-input",modelValue:f.productDetails.stock,"onUpdate:modelValue":t[2]||(t[2]=e=>f.productDetails.stock=e),suffix:"un.",type:"stock",name:"stock",ref:"stockRef",label:"Stock","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>e>0||"El stock debe ser mayor a 0",e=>e<1e3||"El stock debe ser menor a 1.000"]},null,8,["disable","modelValue","rules"]),(0,o.Wm)(x,{disable:f.loadingBtn,modelValue:f.productDetails.categoria,"onUpdate:modelValue":t[3]||(t[3]=e=>f.productDetails.categoria=e),type:"categoria",name:"categoria",ref:"categoriaRef",label:"Categoría",rules:[e=>!!e||"Campo requerido"]},null,8,["disable","modelValue","rules"]),(0,o.Wm)(x,{disable:f.loadingBtn,modelValue:f.productDetails.descripcion,"onUpdate:modelValue":t[4]||(t[4]=e=>f.productDetails.descripcion=e),type:"textarea",name:"descripcion",ref:"descripcionRef",label:"Descripción",rules:[e=>!!e||"Campo requerido",e=>e.length>3||"La descripción debe tener más de 3 caracteres",e=>e.length<500||"La descripción debe tener menos de 500 caracteres"]},null,8,["disable","modelValue","rules"])]),(0,o._)("div",p,[(0,o._)("div",m,[(0,o._)("div",null,[(0,o.Wm)(w,{disable:f.loadingBtn,flat:"",color:"primary",onClick:t[5]||(t[5]=e=>this.$router.push("/"))},{default:(0,o.w5)((()=>[h])),_:1},8,["disable"])]),(0,o._)("div",null,[(0,o.Wm)(w,{disable:f.loadingBtn,loading:f.loadingBtn,color:"primary",label:"Guardar",onClick:g.createProduct},null,8,["disable","loading","onClick"])])])])])])),_:1})])),_:1})])),_:1})])])),_:1})}const g={name:"NewProductPage",data(){return{counter:0,loadingBtn:!1,loading:!1,slide:1,qty:1,productDetails:{nombre:"",descripcion:"",categoria:"",precio:"",stock:"",fotos:[],id:""}}},methods:{createProduct(){if(this.isInvalidForm())return;this.loadingBtn=!0;const e={nombre:this.productDetails.nombre,descripcion:this.productDetails.descripcion,categoria:this.productDetails.categoria,precio:this.productDetails.precio,stock:this.productDetails.stock};this.$axios({method:"POST",url:"/api/products/",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")},data:e}).then((e=>{console.log("respondido"),this.productDetails=e.data.data,this.counter>0?this.$refs.uploader.upload():(this.$q.notify({position:"bottom-right",color:"positive",message:"Producto creado con éxito"}),this.loadingBtn=!1,this.$router.push("/"))})).catch((e=>{console.log(e),this.loadingBtn=!1,this.$q.notify({position:"bottom-right",color:"negative",message:`Error al crear el producto: ${e}`})}))},goHome(){counter--,0==counter&&(this.loadingBtn=!1,this.$router.push("/"),this.$q.notify({position:"bottom-right",color:"positive",message:"Producto creado con éxito"}))},isInvalidForm(){return this.$refs.nombreRef.validate(),this.$refs.precioRef.validate(),this.$refs.stockRef.validate(),this.$refs.categoriaRef.validate(),this.$refs.descripcionRef.validate(),!!(this.$refs.nombreRef.hasError||this.$refs.precioRef.hasError||this.$refs.stockRef.hasError||this.$refs.categoriaRef.hasError||this.$refs.descripcionRef.hasError)},factoryFn(e){const t=/(?:\.([^.]+))?$/,a=t.exec(e[0].name)[1];return new Promise(((e,t)=>{this.$axios({method:"POST",url:"api/image/presignedurl",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")},data:{productId:this.productDetails.id,type:a}}).then((t=>{const a=t.data.data;console.log(a),e({url:a,method:"PUT",sendRaw:!0})})).catch((e=>{t(e)}))}))}}};var b=a(4260),_=a(4379),w=a(151),k=a(5589),y=a(3768),q=a(7011),v=a(3414),$=a(2035),x=a(2350),D=a(8240),C=a(5869),W=a(4842),B=a(7518),R=a.n(B);const V=(0,b.Z)(g,[["render",f],["__scopeId","data-v-1283c09a"]]),z=V;R()(g,"components",{QPage:_.Z,QCard:w.Z,QCardSection:k.Z,QUploader:y.Z,QList:q.Z,QItem:v.Z,QItemSection:$.Z,QItemLabel:x.Z,QBtn:D.Z,QSeparator:C.Z,QInput:W.Z})}}]);