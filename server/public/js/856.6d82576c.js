"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[856],{2856:(t,o,a)=>{a.r(o),a.d(o,{default:()=>W});var e=a(3673),l=a(2323);const i=t=>((0,e.dD)("data-v-facf09a8"),t=t(),(0,e.Cn)(),t),n={class:"base-width"},r=i((()=>(0,e._)("div",{class:"q-mb-md"},[(0,e._)("div",{class:"text-h5 text-weight-light"},"Carrito")],-1))),s={class:"cartTable"},d=["src"],c=i((()=>(0,e._)("b",null,"Total:",-1))),u={style:{width:"100% flex justify-right"}};function m(t,o,a,i,m,p){const g=(0,e.up)("q-avatar"),h=(0,e.up)("q-td"),w=(0,e.up)("q-truncate"),b=(0,e.up)("q-btn"),f=(0,e.up)("q-tr"),_=(0,e.up)("sapn"),q=(0,e.up)("q-table"),y=(0,e.up)("q-page");return(0,e.wg)(),(0,e.j4)(y,{padding:"",class:"flex justify-center"},{default:(0,e.w5)((()=>[(0,e._)("div",n,[r,(0,e._)("div",s,[(0,e.Wm)(q,{rows:m.rows,columns:m.columns,"row-key":"name",loading:m.loading,"no-data-label":"No se encontraron productos en el carrito..."},{body:(0,e.w5)((t=>[(0,e.Wm)(f,null,{default:(0,e.w5)((()=>[(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Wm)(g,null,{default:(0,e.w5)((()=>[(0,e._)("img",{src:"https://coderhouse-ecommerce.s3.amazonaws.com/"+t.row.product.fotos[0]},null,8,d)])),_:2},1024)])),_:2},1024),(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Wm)(w,null,{default:(0,e.w5)((()=>[(0,e.Uk)((0,l.zw)(t.row.product.nombre),1)])),_:2},1024)])),_:2},1024),(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Wm)(w,null,{default:(0,e.w5)((()=>[(0,e.Uk)((0,l.zw)(t.row.product.descripcion),1)])),_:2},1024)])),_:2},1024),(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Uk)((0,l.zw)(t.row.qty),1)])),_:2},1024),(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Uk)((0,l.zw)("$ "+t.row.product.precio),1)])),_:2},1024),(0,e.Wm)(h,null,{default:(0,e.w5)((()=>[(0,e.Wm)(b,{onClick:o=>p.removeItem(t.row),flat:"",round:"",color:"red",icon:"delete"},null,8,["onClick"])])),_:2},1024)])),_:2},1024)])),"bottom-row":(0,e.w5)((()=>[m.rows.length>0?((0,e.wg)(),(0,e.j4)(f,{key:0},{default:(0,e.w5)((()=>[(0,e.Wm)(h,{colspan:"100%"},{default:(0,e.w5)((()=>[(0,e.Wm)(_,null,{default:(0,e.w5)((()=>[c,(0,e.Uk)(" $ "+(0,l.zw)(m.total),1)])),_:1})])),_:1})])),_:1})):(0,e.kq)("",!0)])),_:1},8,["rows","columns","loading"]),(0,e._)("div",u,[(0,e.Wm)(b,{class:"q-mt-md",onClick:p.buy,color:"primary",label:"Comprar",disable:m.btnLoading},null,8,["onClick","disable"])])])])])),_:1})}const p={name:"Cart",data(){return{btnLoading:!1,loading:!1,total:0,rows:[],columns:[{name:"imagen",required:!0,label:"",align:"left",sortable:!1},{name:"nombre",required:!0,label:"Nombre",align:"left"},{name:"descripcion",label:"Descripción",align:"left"},{name:"qty",label:"Cantidad",field:"qty",align:"left"},{name:"precio",label:"Precio",align:"left"},{name:"remove",label:""}]}},created(){this.getProducts()},methods:{async getProducts(){this.loading=!0,this.$axios.get("/api/cart").then((t=>{this.rows=t.data.data.products,this.total=t.data.data.products.reduce(((t,o)=>t+o.product.precio*o.qty),0),this.loading=!1})).catch((t=>{this.rows=[],this.loading=!1}))},buy(){this.btnLoading=!0,this.$axios.post("/api/cart/submit",{products:"brian"}).then((()=>{this.$q.notify({position:"bottom-right",color:"positive",message:"Compra realizada con éxito"}),this.btnLoading=!1,this.getProducts()})).catch((t=>{console.log(t),this.$q.notify({position:"bottom-right",color:"negative",message:"Error al realizar la compra"}),this.btnLoading=!1}))},removeItem(t){this.btnLoading=!0;const o={product:t.product.id,qty:t.qty};this.$axios.post("/api/cart/delete",o).then((()=>{this.$q.notify({position:"bottom-right",color:"positive",message:"Producto eliminado con éxito"}),this.btnLoading=!1,this.getProducts()})).catch((t=>{console.log(t),this.$q.notify({position:"bottom-right",color:"negative",message:"Error al eliminar el producto"}),this.btnLoading=!1}))}}};var g=a(4260),h=a(4379),w=a(8468),b=a(8186),f=a(3884),_=a(5096),q=a(8240),y=a(7518),v=a.n(y);const k=(0,g.Z)(p,[["render",m],["__scopeId","data-v-facf09a8"]]),W=k;v()(p,"components",{QPage:h.Z,QTable:w.Z,QTr:b.Z,QTd:f.Z,QAvatar:_.Z,QBtn:q.Z})}}]);