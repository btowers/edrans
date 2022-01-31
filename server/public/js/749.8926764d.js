"use strict";(self["webpackChunkedrans_client"]=self["webpackChunkedrans_client"]||[]).push([[749],{2749:(e,a,r)=>{r.r(a),r.d(a,{default:()=>V});var s=r(3673),l=r(2323);const o={class:"row justify-end q-py-md"},i={class:"q-mr-md"};function t(e,a,r,t,d,n){const u=(0,s.up)("q-input"),c=(0,s.up)("q-icon"),m=(0,s.up)("q-form"),p=(0,s.up)("q-card-section"),f=(0,s.up)("q-separator"),h=(0,s.up)("q-btn"),w=(0,s.up)("q-card"),b=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(b,{padding:"",class:"flex flex-center"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{class:"register"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{horizontal:""},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{style:{width:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(m,{autocomplete:"off"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{modelValue:d.user.nombre,"onUpdate:modelValue":a[0]||(a[0]=e=>d.user.nombre=e),readonly:"",name:"nombre",ref:"nombreRef",label:"Nombre","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>e.length>3||"Field must have at least 4 characters"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.email,"onUpdate:modelValue":a[1]||(a[1]=e=>d.user.email=e),readonly:"",type:"email",name:"email",ref:"emailRef",label:"Email","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>!!e.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)||"Invalid email"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.password,"onUpdate:modelValue":a[3]||(a[3]=e=>d.user.password=e),type:d.isPwd?"password":"text",name:"password",ref:"passwordRef",label:"Nueva Contraseña","lazy-rules":"",rules:[e=>!!e.match(/^\s*$|(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)||"La contraseña debe contener al menos 8 caracteres, 1 numero, 1 letra mayuscula y un símbolo"]},{append:(0,s.w5)((()=>[(0,s.Wm)(c,{name:d.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:a[2]||(a[2]=e=>d.isPwd=!d.isPwd)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,s.Uk)(" "+(0,l.zw)(d.user.password)+" ",1),(0,s.Wm)(u,{modelValue:d.user.confirmPassword,"onUpdate:modelValue":a[5]||(a[5]=e=>d.user.confirmPassword=e),type:d.isPwd?"password":"text",name:"passwordRepeat",ref:"passwordRef",label:"Repita Contraseña","lazy-rules":"",rules:[e=>e===d.user.password||"Las contraseñas no coinciden"]},{append:(0,s.w5)((()=>[(0,s.Wm)(c,{name:d.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:a[4]||(a[4]=e=>d.isPwd=!d.isPwd)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,s.Uk)(" "+(0,l.zw)(d.user.confirmPassword),1)])),_:1})])),_:1}),(0,s.Wm)(f,{vertical:""}),(0,s.Wm)(p,{style:{width:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{modelValue:d.user.identificador,"onUpdate:modelValue":a[6]||(a[6]=e=>d.user.identificador=e),"reverse-fill-mask":"",name:"identificador",ref:"identificadorRef",label:"DNI","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>!!e.match(/^[0-9]{7,8}$/)||"El DNI debe tener entre 7 y 8 digitos"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.direccion.calle,"onUpdate:modelValue":a[7]||(a[7]=e=>d.user.direccion.calle=e),name:"calle",ref:"calleRef",label:"Calle","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>!!e.match(/^[a-zA-Z0-9\s]{3,}$/)||"La calle debe tener al menos 3 caracteres"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.direccion.altura,"onUpdate:modelValue":a[8]||(a[8]=e=>d.user.direccion.altura=e),name:"altura",ref:"alturaRef",label:"Altura","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>!!e.match(/^[0-9]{1,4}$/)||"La altura debe tener entre 1 y 4 digitos"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.direccion.cp,"onUpdate:modelValue":a[9]||(a[9]=e=>d.user.direccion.cp=e),name:"cp",ref:"cpRef",label:"CP","lazy-rules":"",rules:[e=>!!e||"Campo requerido",e=>!!e.match(/^[0-9]{1,4}$/)||"El CP debe tener entre 1 y 4 digitos"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.direccion.piso,"onUpdate:modelValue":a[10]||(a[10]=e=>d.user.direccion.piso=e),name:"piso",ref:"pisoRef",label:"Piso","lazy-rules":"",rules:[e=>!!e.match(/^(\s*|\d+)$/)||"El piso debe tener entre 0 y 3 digitos"]},null,8,["modelValue","rules"]),(0,s.Wm)(u,{modelValue:d.user.direccion.departamento,"onUpdate:modelValue":a[11]||(a[11]=e=>d.user.direccion.departamento=e),name:"departamento",ref:"departamentoRef",label:"Departamento","lazy-rules":"",rules:[e=>!!e.match(/^[a-zA-Z]{0,3}$/)||"El departamento debe tener entre 0 y 3 letras"]},null,8,["modelValue","rules"])])),_:1})])),_:1}),(0,s.Wm)(p,null,{default:(0,s.w5)((()=>[(0,s._)("div",o,[(0,s._)("div",i,[(0,s.Wm)(h,{disable:d.loading,flat:"",onClick:a[12]||(a[12]=e=>this.$router.push("/")),color:"primary",label:"Cancelar"},null,8,["disable"])]),(0,s._)("div",null,[(0,s.Wm)(h,{disable:d.loading,loading:d.loading,onClick:n.updateUser,color:"primary",label:"Actualizar"},null,8,["disable","loading","onClick"])])])])),_:1})])),_:1})])),_:1})}const d={name:"RegisterPage",data(){return{loading:!1,user:{id:"",nombre:"",email:"",password:"",confirmPassword:"",direccion:{calle:"",altura:"",cp:"",piso:"",departamento:""},identificador:""},isPwd:!0}},created(){this.getUser()},methods:{updateUser(){if(this.isInvalidForm())return;const e={direccion:{calle:this.user.direccion.calle,altura:this.user.direccion.altura,cp:this.user.direccion.cp,piso:this.user.direccion.piso,departamento:this.user.direccion.departamento},identificador:this.user.identificador};this.user.password&&(e.password=this.user.password),this.user.confirmPassword&&(e.confirmPassword=this.user.confirmPassword),this.loading=!0,this.$axios({method:"PUT",url:"/api/user/"+this.user.id,headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")},data:e}).then((e=>{this.$q.notify({position:"bottom-right",color:"positive",message:"Usuario actualizado"}),this.loading=!1,this.$router.push("/")})).catch((e=>{this.$q.notify({position:"bottom-right",color:"negative",message:"Error al actualizar el usuario"}),this.loading=!1}))},getUser(){this.$axios({method:"GET",url:"/api/user",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+this.$q.cookies.get("token")}}).then((e=>{this.user=e.data.data,console.log(this.user)})).catch((e=>{this.$q.notify({position:"bottom-right",color:"negative",message:"Error al obtener los datos del usuario"})}))},isInvalidForm(){return this.$refs.passwordRef.validate(),this.$refs.identificadorRef.validate(),this.$refs.calleRef.validate(),this.$refs.alturaRef.validate(),this.$refs.cpRef.validate(),this.$refs.pisoRef.validate(),this.$refs.departamentoRef.validate(),!!(this.$refs.passwordRef.hasError||this.$refs.identificadorRef.hasError||this.$refs.calleRef.hasError||this.$refs.alturaRef.hasError||this.$refs.cpRef.hasError||this.$refs.pisoRef.hasError||this.$refs.departamentoRef.hasError)}}};var n=r(4260),u=r(4379),c=r(151),m=r(5589),p=r(5269),f=r(4842),h=r(4554),w=r(5869),b=r(8240),y=r(7518),$=r.n(y);const g=(0,n.Z)(d,[["render",t]]),V=g;$()(d,"components",{QPage:u.Z,QCard:c.Z,QCardSection:m.Z,QForm:p.Z,QInput:f.Z,QIcon:h.Z,QSeparator:w.Z,QBtn:b.Z})}}]);