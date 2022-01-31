"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[674],{9674:(t,e,o)=>{o.r(e),o.d(e,{default:()=>T});var i=o(3673);const r={class:"productList"},a=(0,i.Uk)(" Crear producto ");function n(t,e,o,n,s,c){const d=(0,i.up)("q-btn"),l=(0,i.up)("product-card"),u=(0,i.up)("q-table"),p=(0,i.up)("q-page");return(0,i.wg)(),(0,i.j4)(p,{padding:"",class:"flex justify-center"},{default:(0,i.w5)((()=>[(0,i._)("div",r,[(0,i.Wm)(u,{grid:"",rows:s.items,columns:s.columns,"row-key":"name","hide-header":"",pagination:s.pagination,loading:s.loading,"no-data-label":"No se encontraron productos..."},(0,i.Nv)({item:(0,i.w5)((t=>[(0,i.Wm)(l,{item:t,onReloadProducts:c.getProducts},null,8,["item","onReloadProducts"])])),_:2},[t.user.isAdmin?{name:"top-left",fn:(0,i.w5)((()=>[(0,i.Wm)(d,{dense:"",flat:"",color:"primary",onClick:c.newProduct},{default:(0,i.w5)((()=>[a])),_:1},8,["onClick"])]))}:void 0]),1032,["rows","columns","pagination","loading"])])])),_:1})}o(71);var s=o(2323);const c={class:"flex flex-center"},d={class:"text-subtitle1"},l={class:"text-caption text-grey"},u={class:"row justify-end",style:{width:"100%"}},p={class:"col-auto"},m={class:"col-auto"};function h(t,e,o,r,a,n){const h=(0,i.up)("q-img"),g=(0,i.up)("q-item-label"),w=(0,i.up)("q-item-section"),f=(0,i.up)("q-card-section"),k=(0,i.up)("q-separator"),P=(0,i.up)("q-btn"),b=(0,i.up)("q-card-actions"),_=(0,i.up)("q-card");return(0,i.wg)(),(0,i.j4)(_,{class:"product-card q-ma-sm"},{default:(0,i.w5)((()=>[(0,i._)("div",{class:"cursor-pointer",onClick:e[0]||(e[0]=(...t)=>n.openProduct&&n.openProduct(...t))},[(0,i._)("div",c,[(0,i.Wm)(h,{src:"https://coderhouse-ecommerce.s3.amazonaws.com/"+o.item.row.fotos[0],style:{width:"300px",height:"300px"},fit:"contain"},null,8,["src"])]),(0,i.Wm)(f,null,{default:(0,i.w5)((()=>[(0,i.Wm)(w,null,{default:(0,i.w5)((()=>[(0,i.Wm)(g,{class:"text-h6"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(o.item.row.nombre),1)])),_:1}),(0,i.Wm)(g,{caption:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(o.item.row.stock+" un."),1)])),_:1})])),_:1})])),_:1}),(0,i.Wm)(f,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",d,(0,s.zw)(n.formattedPrice),1),(0,i._)("div",l,(0,s.zw)(o.item.row.descripcion),1)])),_:1})]),(0,i.Wm)(k),t.user.isAdmin?((0,i.wg)(),(0,i.j4)(b,{key:0},{default:(0,i.w5)((()=>[(0,i._)("div",u,[(0,i._)("div",p,[(0,i.Wm)(P,{flat:"",round:"",icon:"mode_edit",color:"primary",onClick:n.editProduct},null,8,["onClick"])]),(0,i._)("div",m,[(0,i.Wm)(P,{flat:"",round:"",icon:"delete",color:"red",onClick:n.deleteDialog},null,8,["onClick"])])])])),_:1})):(0,i.kq)("",!0)])),_:1})}var g=o(3617);const w={name:"ProductCard",props:["item"],data(){return{stars:4}},computed:{...(0,g.rn)(["user"]),formattedPrice(){return this.item.row.precio.toLocaleString("es-AR",{style:"currency",currency:"ARS"})}},methods:{openProduct(){this.$router.push({name:"ProductDetailPage",params:{id:this.item.row.id}})},editProduct(){this.$router.push(`/product/edit/${this.item.row.id}`)},deleteDialog(){this.$q.dialog({title:"Eliminar producto",message:"¿Está seguro de eliminar este producto?",ok:"Eliminar",cancel:"Cancelar",persistent:!0,persistentHint:"Presione ESC para cancelar"}).onOk(this.deleteProduct)},deleteProduct(){this.$axios({method:"DELETE",url:"/api/products/"+this.item.row.id,headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")}}).then((()=>{this.$q.notify({position:"bottom-right",color:"positive",message:"Producto eliminado"}),this.$emit("reloadProducts")})).catch((t=>{this.$q.notify({position:"bottom-right",color:"negative",message:"Error al eliminar el producto"})}))}}};var f=o(4260),k=o(151),P=o(4027),b=o(5589),_=o(2035),q=o(2350),C=o(5869),v=o(9367),y=o(8240),$=o(7518),Z=o.n($);const W=(0,f.Z)(w,[["render",h]]),x=W;Z()(w,"components",{QCard:k.Z,QImg:P.Z,QCardSection:b.Z,QItemSection:_.Z,QItemLabel:q.Z,QSeparator:C.Z,QCardActions:v.Z,QBtn:y.Z});const Q={name:"ProductListPage",components:{ProductCard:x},data(){return{pagination:{rowsPerPage:50},priceFilter:"Todos",priceOptions:["Todos","0 - 500","500 - 2000"],stockFilter:"Todos",stockOptions:["Todos","0 - 500","500 - 2000"],loading:!1,columns:[{name:"nombre",label:"Nombre",field:"nombre",align:"left",required:!0,sortable:!0},{name:"descripcion",align:"center",label:"Descripción",field:"descripcion",sortable:!0},{name:"precio",label:"Precio",field:"precio",format:t=>`$ ${t}`,sortable:!0},{name:"stock",label:"Stock",field:"stock",format:t=>`${t} un.`,sortable:!0}],items:[]}},computed:{...(0,g.rn)(["user"])},mounted(){this.getProducts()},methods:{getProducts(){this.loading=!0,this.$axios({method:"GET",url:"/api/products/",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")}}).then((t=>{this.items=t.data.data,this.loading=!1}))},newProduct(){this.$router.push("/product/new")}}};var j=o(4379),A=o(740);const E=(0,f.Z)(Q,[["render",n],["__scopeId","data-v-526d7fa9"]]),T=E;Z()(Q,"components",{QPage:j.Z,QTable:A.Z,QBtn:y.Z})}}]);