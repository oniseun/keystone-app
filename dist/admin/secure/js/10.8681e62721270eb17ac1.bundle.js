(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{195:function(t,s,e){"use strict";e.r(s);var a=e(7),i=(e(28),e(180),e(181));class r extends i.a{constructor(){super(...arguments),Object(a.a)(this,"getFilterGraphQL",t=>{let{type:s,value:e}=t;return"".concat(this.path,"_").concat(s,": ").concat(e?"true":"false")}),Object(a.a)(this,"getFilterLabel",()=>"".concat(this.label)),Object(a.a)(this,"formatFilter",t=>{let{value:s}=t;return"".concat(this.label," ").concat(s?"is set":"is not set")}),Object(a.a)(this,"getQueryFragment",()=>"".concat(this.path,"_is_set")),Object(a.a)(this,"getFilterTypes",()=>[{type:"is_set",label:"Is Set",getInitialValue:()=>!0}]),Object(a.a)(this,"serialize",t=>t[this.path]?t[this.path].inputPassword:void 0),Object(a.a)(this,"validateInput",t=>{let{originalInput:s,addFieldValidationError:e}=t;const{isRequired:a,minLength:i}=this.config;if(a){if(!s[this.path]||!s[this.path].inputPassword)return e("Password is required")}else if(!s[this.path]||!s[this.path].inputPassword)return;return s[this.path].inputPassword.length<i?e("Password must be at least ".concat(i," characters")):s[this.path].inputPassword!==s[this.path].inputConfirm?e("Passwords do not match"):void 0})}}s.default=r}}]);