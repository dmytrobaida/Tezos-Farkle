(this["webpackJsonptezos-farkle"]=this["webpackJsonptezos-farkle"]||[]).push([[0],{120:function(n,e){},124:function(n,e){},125:function(n,e){},146:function(n,e){},148:function(n,e){},173:function(n,e,t){"use strict";t.r(e);var c,r,o,a,i=t(0),s=t.n(i),l=t(30),u=t.n(l),b=t(17),d=t(18),h=t(31),j=t(42),f=t.n(j),x=t(74),p=t(75),O=t(5),g=t(45),m=function(){function n(){Object(h.a)(this,n),this.address="",this.balance=0,Object(O.d)(this,{},{autoBind:!0})}return Object(p.a)(n,[{key:"connect",value:function(){var n=Object(x.a)(f.a.mark((function n(){var e,t,c,r,o=this;return f.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g.a.isAvailable();case 2:if(n.sent){n.next=5;break}throw new Error("Temple Wallet not installed");case 5:return e=new g.a("Farkle"),n.next=8,e.connect("granadanet");case 8:return t=e.toTezos(),n.next=11,t.wallet.pkh();case 11:return c=n.sent,n.next=14,t.tz.getBalance(c);case 14:r=n.sent,Object(O.g)((function(){o.address=c,o.balance=r.toNumber()}));case 16:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()}]),n}(),v=function n(){Object(h.a)(this,n),this.tezosStore=new m},k=Object(i.createContext)(new v),w=v,y=t(83),z=d.b.div(c||(c=Object(b.a)(["\n  line-height: 50px;\n  padding: 0 15px 0 15px;\n  color: black;\n  border-radius: 5px;\n  border: 1px solid black;\n  width: auto;\n  background-color: red;\n  text-align: center;\n  cursor: pointer;\n\n  :hover {\n    color: white;\n  }\n"]))),C=d.b.div(r||(r=Object(b.a)(["\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n"]))),F=d.b.div(o||(o=Object(b.a)(["\n  margin-bottom: 10px;\n  cursor: pointer;\n  \n  :hover {\n    color: red;\n  }\n"]))),S=t(6),B=Object(y.a)((function(){var n=Object(i.useContext)(k).tezosStore;return Object(S.jsxs)(C,{children:[Object(S.jsxs)(F,{children:["Address: ",n.address]}),Object(S.jsxs)(F,{children:["Balance: ",n.balance]}),Object(S.jsx)(z,{onClick:n.connect,children:"Connect"})]})})),T=Object(d.a)(a||(a=Object(b.a)(["\n  body {\n    margin: 0;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n"]))),I=new w,P=function(){return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(T,{}),Object(S.jsx)(k.Provider,{value:I,children:Object(S.jsx)(B,{})})]})},A=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,176)).then((function(e){var t=e.getCLS,c=e.getFID,r=e.getFCP,o=e.getLCP,a=e.getTTFB;t(n),c(n),r(n),o(n),a(n)}))};u.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(P,{})}),document.getElementById("root")),A()},94:function(n,e){},96:function(n,e){}},[[173,1,2]]]);
//# sourceMappingURL=main.f3c035ce.chunk.js.map