(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(13),c=n.n(u),o=n(2),l=n(14),i=n(3),s=n.n(i),m="http://localhost:3001/api/persons",f=function(){return s.a.get(m).then((function(e){return e.data}))},h=function(e){return s.a.post(m,e).then((function(e){return e.data}))},d=function(e){return s.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=function(e){return s.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},b=function(e){var t=e.text,n=e.value,a=e.onChange;return r.a.createElement("div",null,t,": ",r.a.createElement("input",{value:n,onChange:a}))},v=function(e){var t=e.numbers,n=e.setNumbers,u=e.setMessage,c=Object(a.useState)(""),i=Object(o.a)(c,2),s=i[0],m=i[1],f=Object(a.useState)(""),d=Object(o.a)(f,2),v=d[0],E=d[1],g=function(e){return function(t){return e(t.target.value)}};return r.a.createElement("div",null,r.a.createElement("h2",null,"Add new person"),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),v.match(/^[0-9+][0-9 -]+$/)){var a=t.find((function(e){return e.name===s}));if(a)if(!0===window.confirm("Do you want to change ".concat(s,"'s number?"))){var r=Object(l.a)({},a,{phone:v});p(r).then((function(e){n(t.map((function(e){return e.id===r.id?r:e})))})).catch((function(e){u({text:"not on server",type:"error"}),setTimeout((function(){return u(null)}),3e3)})),u({text:"".concat(s," has a new phone number"),type:"success"}),setTimeout((function(){return u(null)}),3e3)}else u({text:"".concat(s," is already taken"),type:"error"}),setTimeout((function(){return u(null)}),3e3);else h({name:s,phone:v}).then((function(e){n(t.concat(e))})),u({text:"".concat(s," has been added to phone list"),type:"success"}),setTimeout((function(){return u(null)}),3e3);m(""),E("")}else u({text:"No valid phone number has been given",type:"error"}),setTimeout((function(){return u(null)}),3e3)}},r.a.createElement(b,{text:"name",value:s,onChange:g(m)}),r.a.createElement(b,{text:"phone",value:v,onChange:g(E)}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},E=function(e){var t=e.number,n=e.handleDelete;return r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("strong",null,t.name),": ",t.phone),r.a.createElement("button",{onClick:n},"delete"))},g=function(e){var t=e.value,n=e.onChange;return r.a.createElement("div",null,"Filter: ",r.a.createElement("input",{value:t,onChange:n}))},y=(n(37),function(e){var t=e.message;return t?r.a.createElement("div",{className:t.type},r.a.createElement("p",null,t.text)):null}),j=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(null),l=Object(o.a)(c,2),i=l[0],s=l[1],m=Object(a.useState)(""),h=Object(o.a)(m,2),p=h[0],b=h[1];Object(a.useEffect)((function(){f().then((function(e){return u(e)}))}),[]);var j=p?n.filter((function(e){return e.name.toLowerCase().includes(p)})):n;return r.a.createElement("div",null,r.a.createElement(y,{message:i}),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{value:p,onChange:function(e){return b(e.target.value.toLowerCase())}}),r.a.createElement(v,{numbers:n,setNumbers:u,setMessage:s}),r.a.createElement("h2",null,"Numbers"),j.map((function(e){return r.a.createElement(E,{key:e.id,number:e,handleDelete:(t=e,function(){d(t.id).then((function(e){s({text:"".concat(t.name," deleted"),type:"warning"}),setTimeout((function(){return s(null)}),3e3),u(n.filter((function(e){return e.id!==t.id})))})).catch((function(e){s({text:"not on server",type:"error"}),setTimeout((function(){s(null),u(n.filter((function(e){return e.id!==t.id})))}),3e3)}))})});var t})))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.77a28d66.chunk.js.map