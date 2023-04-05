import{S as Re,s as ce,n as qe,i as le,b as ae,t as He,f as $e,c as We,d as de,e as ze,g as U,h as fe,k as Ke,r as R,u as Ee,p as Ge,R as Je,l as H,j as h}from"./index-1f11ae64.js";import{z as O}from"./index-45b59163.js";class Oe extends Re{constructor(e,r){super(),this.client=e,this.options=r,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(r)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),he(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return te(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return te(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,r){const s=this.options,o=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),ce(s,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=s.queryKey),this.updateQuery();const i=this.hasListeners();i&&pe(this.currentQuery,o,this.options,s)&&this.executeFetch(),this.updateResult(r),i&&(this.currentQuery!==o||this.options.enabled!==s.enabled||this.options.staleTime!==s.staleTime)&&this.updateStaleTimeout();const u=this.computeRefetchInterval();i&&(this.currentQuery!==o||this.options.enabled!==s.enabled||u!==this.currentRefetchInterval)&&this.updateRefetchInterval(u)}getOptimisticResult(e){const r=this.client.getQueryCache().build(this.client,e);return this.createResult(r,e)}getCurrentResult(){return this.currentResult}trackResult(e){const r={};return Object.keys(e).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(s),e[s])})}),r}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...r}={}){return this.fetch({...r,meta:{refetchPage:e}})}fetchOptimistic(e){const r=this.client.defaultQueryOptions(e),s=this.client.getQueryCache().build(this.client,r);return s.isFetchingOptimistic=!0,s.fetch().then(()=>this.createResult(s,r))}fetch(e){var r;return this.executeFetch({...e,cancelRefetch:(r=e.cancelRefetch)!=null?r:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let r=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(r=r.catch(qe)),r}updateStaleTimeout(){if(this.clearStaleTimeout(),le||this.currentResult.isStale||!ae(this.options.staleTime))return;const r=He(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},r)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(le||this.options.enabled===!1||!ae(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||$e.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,r){const s=this.currentQuery,o=this.options,i=this.currentResult,u=this.currentResultState,a=this.currentResultOptions,v=e!==s,d=v?e.state:this.currentQueryInitialState,y=v?this.currentResult:this.previousQueryResult,{state:c}=e;let{dataUpdatedAt:m,error:S,errorUpdatedAt:j,fetchStatus:D,status:Q}=c,I=!1,k=!1,C;if(r._optimisticResults){const n=this.hasListeners(),l=!n&&he(e,r),f=n&&pe(e,s,r,o);(l||f)&&(D=We(e.options.networkMode)?"fetching":"paused",m||(Q="loading")),r._optimisticResults==="isRestoring"&&(D="idle")}if(r.keepPreviousData&&!c.dataUpdatedAt&&y!=null&&y.isSuccess&&Q!=="error")C=y.data,m=y.dataUpdatedAt,Q=y.status,I=!0;else if(r.select&&typeof c.data<"u")if(i&&c.data===(u==null?void 0:u.data)&&r.select===this.selectFn)C=this.selectResult;else try{this.selectFn=r.select,C=r.select(c.data),C=de(i==null?void 0:i.data,C,r),this.selectResult=C,this.selectError=null}catch(n){this.selectError=n}else C=c.data;if(typeof r.placeholderData<"u"&&typeof C>"u"&&Q==="loading"){let n;if(i!=null&&i.isPlaceholderData&&r.placeholderData===(a==null?void 0:a.placeholderData))n=i.data;else if(n=typeof r.placeholderData=="function"?r.placeholderData():r.placeholderData,r.select&&typeof n<"u")try{n=r.select(n),this.selectError=null}catch(l){this.selectError=l}typeof n<"u"&&(Q="success",C=de(i==null?void 0:i.data,n,r),k=!0)}this.selectError&&(S=this.selectError,C=this.selectResult,j=Date.now(),Q="error");const T=D==="fetching",L=Q==="loading",E=Q==="error";return{status:Q,fetchStatus:D,isLoading:L,isSuccess:Q==="success",isError:E,isInitialLoading:L&&T,data:C,dataUpdatedAt:m,error:S,errorUpdatedAt:j,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>d.dataUpdateCount||c.errorUpdateCount>d.errorUpdateCount,isFetching:T,isRefetching:T&&!L,isLoadingError:E&&c.dataUpdatedAt===0,isPaused:D==="paused",isPlaceholderData:k,isPreviousData:I,isRefetchError:E&&c.dataUpdatedAt!==0,isStale:ue(e,r),refetch:this.refetch,remove:this.remove}}updateResult(e){const r=this.currentResult,s=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,ce(s,r))return;this.currentResult=s;const o={cache:!0},i=()=>{if(!r)return!0;const{notifyOnChangeProps:u}=this.options;if(u==="all"||!u&&!this.trackedProps.size)return!0;const a=new Set(u??this.trackedProps);return this.options.useErrorBoundary&&a.add("error"),Object.keys(this.currentResult).some(v=>{const d=v;return this.currentResult[d]!==r[d]&&a.has(d)})};(e==null?void 0:e.listeners)!==!1&&i()&&(o.listeners=!0),this.notify({...o,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const r=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(r==null||r.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const r={};e.type==="success"?r.onSuccess=!e.manual:e.type==="error"&&!ze(e.error)&&(r.onError=!0),this.updateResult(r),this.hasListeners()&&this.updateTimers()}notify(e){U.batch(()=>{if(e.onSuccess){var r,s,o,i;(r=(s=this.options).onSuccess)==null||r.call(s,this.currentResult.data),(o=(i=this.options).onSettled)==null||o.call(i,this.currentResult.data,null)}else if(e.onError){var u,a,v,d;(u=(a=this.options).onError)==null||u.call(a,this.currentResult.error),(v=(d=this.options).onSettled)==null||v.call(d,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(y=>{y(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function Xe(t,e){return e.enabled!==!1&&!t.state.dataUpdatedAt&&!(t.state.status==="error"&&e.retryOnMount===!1)}function he(t,e){return Xe(t,e)||t.state.dataUpdatedAt>0&&te(t,e,e.refetchOnMount)}function te(t,e,r){if(e.enabled!==!1){const s=typeof r=="function"?r(t):r;return s==="always"||s!==!1&&ue(t,e)}return!1}function pe(t,e,r,s){return r.enabled!==!1&&(t!==e||s.enabled===!1)&&(!r.suspense||t.state.status!=="error")&&ue(t,r)}function ue(t,e){return t.isStaleByTime(e.staleTime)}class Ye extends Re{constructor(e,r){super(),this.client=e,this.queries=[],this.result=[],this.observers=[],this.observersMap={},r&&this.setQueries(r)}onSubscribe(){this.listeners.length===1&&this.observers.forEach(e=>{e.subscribe(r=>{this.onUpdate(e,r)})})}onUnsubscribe(){this.listeners.length||this.destroy()}destroy(){this.listeners=[],this.observers.forEach(e=>{e.destroy()})}setQueries(e,r){this.queries=e,U.batch(()=>{const s=this.observers,o=this.findMatchingObservers(this.queries);o.forEach(d=>d.observer.setOptions(d.defaultedQueryOptions,r));const i=o.map(d=>d.observer),u=Object.fromEntries(i.map(d=>[d.options.queryHash,d])),a=i.map(d=>d.getCurrentResult()),v=i.some((d,y)=>d!==s[y]);s.length===i.length&&!v||(this.observers=i,this.observersMap=u,this.result=a,this.hasListeners()&&(fe(s,i).forEach(d=>{d.destroy()}),fe(i,s).forEach(d=>{d.subscribe(y=>{this.onUpdate(d,y)})}),this.notify()))})}getCurrentResult(){return this.result}getQueries(){return this.observers.map(e=>e.getCurrentQuery())}getObservers(){return this.observers}getOptimisticResult(e){return this.findMatchingObservers(e).map(r=>r.observer.getOptimisticResult(r.defaultedQueryOptions))}findMatchingObservers(e){const r=this.observers,s=e.map(c=>this.client.defaultQueryOptions(c)),o=s.flatMap(c=>{const m=r.find(S=>S.options.queryHash===c.queryHash);return m!=null?[{defaultedQueryOptions:c,observer:m}]:[]}),i=o.map(c=>c.defaultedQueryOptions.queryHash),u=s.filter(c=>!i.includes(c.queryHash)),a=r.filter(c=>!o.some(m=>m.observer===c)),v=c=>{const m=this.client.defaultQueryOptions(c),S=this.observersMap[m.queryHash];return S??new Oe(this.client,m)},d=u.map((c,m)=>{if(c.keepPreviousData){const S=a[m];if(S!==void 0)return{defaultedQueryOptions:c,observer:S}}return{defaultedQueryOptions:c,observer:v(c)}}),y=(c,m)=>s.indexOf(c.defaultedQueryOptions)-s.indexOf(m.defaultedQueryOptions);return o.concat(d).sort(y)}onUpdate(e,r){const s=this.observers.indexOf(e);s!==-1&&(this.result=Ke(this.result,s,r),this.notify())}notify(){U.batch(()=>{this.listeners.forEach(e=>{e(this.result)})})}}var re={},Ze={get exports(){return re},set exports(t){re=t}},xe={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F=R;function et(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var tt=typeof Object.is=="function"?Object.is:et,rt=F.useState,st=F.useEffect,nt=F.useLayoutEffect,it=F.useDebugValue;function ot(t,e){var r=e(),s=rt({inst:{value:r,getSnapshot:e}}),o=s[0].inst,i=s[1];return nt(function(){o.value=r,o.getSnapshot=e,G(o)&&i({inst:o})},[t,r,e]),st(function(){return G(o)&&i({inst:o}),t(function(){G(o)&&i({inst:o})})},[t]),it(r),r}function G(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!tt(t,r)}catch{return!0}}function ut(t,e){return e()}var ct=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?ut:ot;xe.useSyncExternalStore=F.useSyncExternalStore!==void 0?F.useSyncExternalStore:ct;(function(t){t.exports=xe})(Ze);const we=re.useSyncExternalStore,je=R.createContext(!1),Qe=()=>R.useContext(je);je.Provider;function lt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}const at=R.createContext(lt()),Ce=()=>R.useContext(at);function dt(t,e){return typeof t=="function"?t(...e):!!t}const Me=(t,e)=>{(t.suspense||t.useErrorBoundary)&&(e.isReset()||(t.retryOnMount=!1))},Pe=t=>{R.useEffect(()=>{t.clearReset()},[t])},Ae=({result:t,errorResetBoundary:e,useErrorBoundary:r,query:s})=>t.isError&&!e.isReset()&&!t.isFetching&&dt(r,[t.error,s]),De=t=>{t.suspense&&typeof t.staleTime!="number"&&(t.staleTime=1e3)},Ie=(t,e)=>t.isLoading&&t.isFetching&&!e,se=(t,e,r)=>(t==null?void 0:t.suspense)&&Ie(e,r),ne=(t,e,r)=>e.fetchOptimistic(t).then(({data:s})=>{t.onSuccess==null||t.onSuccess(s),t.onSettled==null||t.onSettled(s,null)}).catch(s=>{r.clearReset(),t.onError==null||t.onError(s),t.onSettled==null||t.onSettled(void 0,s)});function ft({queries:t,context:e}){const r=Ee({context:e}),s=Qe(),o=R.useMemo(()=>t.map(c=>{const m=r.defaultQueryOptions(c);return m._optimisticResults=s?"isRestoring":"optimistic",m}),[t,r,s]),[i]=R.useState(()=>new Ye(r,o)),u=i.getOptimisticResult(o);we(R.useCallback(c=>s?()=>{}:i.subscribe(U.batchCalls(c)),[i,s]),()=>i.getCurrentResult(),()=>i.getCurrentResult()),R.useEffect(()=>{i.setQueries(o,{listeners:!1})},[o,i]);const a=Ce();o.forEach(c=>{Me(c,a),De(c)}),Pe(a);const d=u.some((c,m)=>se(o[m],c,s))?u.flatMap((c,m)=>{const S=o[m],j=i.getObservers()[m];if(S&&j){if(se(S,c,s))return ne(S,j,a);Ie(c,s)&&ne(S,j,a)}return[]}):[];if(d.length>0)throw Promise.all(d);const y=u.find((c,m)=>{var S,j;return Ae({result:c,errorResetBoundary:a,useErrorBoundary:(S=(j=o[m])==null?void 0:j.useErrorBoundary)!=null?S:!1,query:i.getQueries()[m]})});if(y!=null&&y.error)throw y.error;return u}function ht(t,e){const r=Ee({context:t.context}),s=Qe(),o=Ce(),i=r.defaultQueryOptions(t);i._optimisticResults=s?"isRestoring":"optimistic",i.onError&&(i.onError=U.batchCalls(i.onError)),i.onSuccess&&(i.onSuccess=U.batchCalls(i.onSuccess)),i.onSettled&&(i.onSettled=U.batchCalls(i.onSettled)),De(i),Me(i,o),Pe(o);const[u]=R.useState(()=>new e(r,i)),a=u.getOptimisticResult(i);if(we(R.useCallback(v=>s?()=>{}:u.subscribe(U.batchCalls(v)),[u,s]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),R.useEffect(()=>{u.setOptions(i,{listeners:!1})},[i,u]),se(i,a,s))throw ne(i,u,o);if(Ae({result:a,errorResetBoundary:o,useErrorBoundary:i.useErrorBoundary,query:u.getCurrentQuery()}))throw a.error;return i.notifyOnChangeProps?a:u.trackResult(a)}function ke(t,e,r){const s=Ge(t,e,r);return ht(s,Oe)}let pt=0;function vt(t,e){const r=`atom${++pt}`,s={toString:()=>r};return typeof t=="function"?s.read=t:(s.init=t,s.read=o=>o(s),s.write=(o,i,u)=>i(s,typeof u=="function"?u(o(s)):u)),e&&(s.write=e),s}const J=t=>"init"in t,X=t=>!!t.write,z=new WeakMap,yt=(t,e)=>{z.set(t,e),t.catch(()=>{}).finally(()=>z.delete(t))},ve=(t,e)=>{const r=z.get(t);r&&(z.delete(t),r(e))},ye=(t,e)=>{t.status="fulfilled",t.value=e},me=(t,e)=>{t.status="rejected",t.reason=e},$=(t,e)=>"v"in t&&"v"in e&&Object.is(t.v,e.v),ge=(t,e)=>"e"in t&&"e"in e&&Object.is(t.e,e.e),Y=t=>"v"in t&&t.v instanceof Promise,W=t=>{if("e"in t)throw t.e;return t.v},mt=()=>{const t=new WeakMap,e=new WeakMap,r=new Map;let s,o,i;({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&(s=new Set,o=new Set,i=new Set);const u=n=>t.get(n),a=(n,l)=>{({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&Object.freeze(l);const f=t.get(n);if(t.set(n,l),r.has(n)||r.set(n,f),f&&Y(f)){const p="v"in l?l.v instanceof Promise?l.v:Promise.resolve(l.v):Promise.reject(l.e);ve(f.v,p)}},v=(n,l,f)=>{const p=new Map;let g=!1;f.forEach(b=>{const x=b===n?l:u(b);x?(p.set(b,x),l.d.get(b)!==x&&(g=!0)):({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[Bug] atom state not found")}),(g||l.d.size!==p.size)&&(l.d=p)},d=(n,l,f)=>{const p=u(n),g={d:(p==null?void 0:p.d)||new Map,v:l};return f&&v(n,g,f),p&&$(p,g)&&p.d===g.d?p:(a(n,g),g)},y=(n,l,f)=>{const p=u(n),g={d:(p==null?void 0:p.d)||new Map,e:l};return f&&v(n,g,f),p&&ge(p,g)&&p.d===g.d?p:(a(n,g),g)},c=n=>{const l=u(n);if(l&&(l.d.forEach((w,P)=>{P!==n&&!e.has(P)&&c(P)}),Array.from(l.d).every(([w,P])=>w===n||u(w)===P)))return l;const f=new Set;let p=!0;const g=w=>{if(f.add(w),w===n){const M=u(w);if(M)return W(M);if(J(w))return w.init;throw new Error("no atom init")}const P=c(w);return W(P)};let b,x;const q={get signal(){return b||(b=new AbortController),b.signal},get setSelf(){return({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&!X(n)&&console.warn("setSelf function cannot be used with read-only atom"),!x&&X(n)&&(x=(...w)=>{if(({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&p&&console.warn("setSelf function cannot be called in sync"),!p)return k(n,...w)}),x}};try{const w=n.read(g,q);if(w instanceof Promise){let P;const M=new Promise((V,Ve)=>{let N=!1;w.then(_=>{N||(N=!0,d(n,M,f),ye(M,_),V(_))},_=>{N||(N=!0,d(n,M,f),me(M,_),Ve(_))}),P=_=>{N||(N=!0,_.then(K=>ye(M,K),K=>me(M,K)),V(_))}});return M.status="pending",yt(M,V=>{V&&P(V),b==null||b.abort()}),d(n,M,f)}return d(n,w,f)}catch(w){return y(n,w,f)}finally{p=!1}},m=n=>W(c(n)),S=n=>{let l=e.get(n);return l||(l=C(n)),l},j=(n,l)=>!l.l.size&&(!l.t.size||l.t.size===1&&l.t.has(n)),D=n=>{const l=e.get(n);l&&j(n,l)&&T(n)},Q=n=>{const l=e.get(n);l==null||l.t.forEach(f=>{if(f!==n){const p=u(f),g=c(f);(!p||!$(p,g))&&Q(f)}})},I=(n,...l)=>{let f=!0;const p=x=>W(c(x)),g=(x,...q)=>{let w;if(x===n){if(!J(x))throw new Error("atom not writable");const P=u(x),M=d(x,q[0]);(!P||!$(P,M))&&Q(x)}else w=I(x,...q);return f||E(),w},b=n.write(p,g,...l);return f=!1,b},k=(n,...l)=>{const f=I(n,...l);return E(),f},C=(n,l)=>{const f={t:new Set(l&&[l]),l:new Set};if(e.set(n,f),({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&i.add(n),c(n).d.forEach((p,g)=>{const b=e.get(g);b?b.t.add(n):g!==n&&C(g,n)}),c(n),X(n)&&n.onMount){const p=n.onMount((...g)=>k(n,...g));p&&(f.u=p)}return f},T=n=>{var l;const f=(l=e.get(n))==null?void 0:l.u;f&&f(),e.delete(n),({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&i.delete(n);const p=u(n);p?(Y(p)&&ve(p.v),p.d.forEach((g,b)=>{if(b!==n){const x=e.get(b);x&&(x.t.delete(n),j(b,x)&&T(b))}})):({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[Bug] could not find atom state to unmount",n)},L=(n,l,f)=>{const p=new Set(l.d.keys());f==null||f.forEach((g,b)=>{if(p.has(b)){p.delete(b);return}const x=e.get(b);x&&(x.t.delete(n),j(b,x)&&T(b))}),p.forEach(g=>{const b=e.get(g);b?b.t.add(n):e.has(n)&&C(g,n)})},E=()=>{for(;r.size;){const n=Array.from(r);r.clear(),n.forEach(([l,f])=>{const p=u(l);if(p){p.d!==(f==null?void 0:f.d)&&L(l,p,f==null?void 0:f.d);const g=e.get(l);g&&!(f&&!Y(f)&&($(f,p)||ge(f,p)))&&g.l.forEach(b=>b())}else({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[Bug] no atom state to flush")})}({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&(s.forEach(n=>n()),o.forEach(n=>n("state")))},A=(n,l)=>{const f=S(n);E();const p=f.l;return p.add(l),({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&o.forEach(g=>g("sub")),()=>{p.delete(l),D(n),({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&o.forEach(g=>g("unsub"))}};return({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"?{get:m,set:k,sub:A,dev_subscribe_state:n=>(console.warn("[DEPRECATED] dev_subscribe_state is deprecated and will be removed in the next minor version. use dev_subscribe_store instead."),s.add(n),()=>{s.delete(n)}),dev_subscribe_store:n=>(o.add(n),()=>{o.delete(n)}),dev_get_mounted_atoms:()=>i.values(),dev_get_atom_state:n=>t.get(n),dev_get_mounted:n=>e.get(n),dev_restore_atoms:n=>{for(const[l,f]of n)J(l)&&(d(l,f),Q(l));E()}}:{get:m,set:k,sub:A}};let Z;const gt=()=>(Z||(Z=mt()),Z),bt=R.createContext(void 0),Te=t=>{const e=R.useContext(bt);return(t==null?void 0:t.store)||e||gt()},St=t=>t instanceof Promise,Rt=Je.use||(t=>{if(t.status==="pending")throw t;if(t.status==="fulfilled")return t.value;throw t.status==="rejected"?t.reason:(t.status="pending",t.then(e=>{t.status="fulfilled",t.value=e},e=>{t.status="rejected",t.reason=e}),t)});function Et(t,e){const r=Te(e),[[s,o,i],u]=R.useReducer(d=>{const y=r.get(t);return Object.is(d[0],y)&&d[1]===r&&d[2]===t?d:[y,r,t]},void 0,()=>[r.get(t),r,t]);let a=s;(o!==r||i!==t)&&(u(),a=r.get(t));const v=e==null?void 0:e.delay;return R.useEffect(()=>{const d=r.sub(t,()=>{if(typeof v=="number"){setTimeout(u,v);return}u()});return u(),d},[r,t,v]),R.useDebugValue(a),St(a)?Rt(a):a}function Ot(t,e){const r=Te(e);return R.useCallback((...o)=>{if(({BASE_URL:"/react-playground/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&!("write"in t))throw new Error("not writable atom");return r.set(t,...o)},[r,t])}function Le(t,e){return[Et(t,e),Ot(t,e)]}const xt=O.array(O.number()).default([]),wt=O.object({id:O.number(),deleted:O.boolean().optional().default(!1),type:O.string(),by:O.string().optional().default(""),time:O.number().optional(),dead:O.boolean().optional().default(!1),kids:O.array(O.number()).optional().default([]),descendants:O.number().optional(),score:O.number().optional(),title:O.string().optional().default(""),url:O.string().optional().default("")}),jt=O.object({id:O.number(),deleted:O.boolean().optional().default(!1),type:O.string(),by:O.string().optional().default(""),time:O.number().optional(),kids:O.array(O.number()).optional().default([]),parent:O.number().optional(),text:O.string().optional().default("")}),Qt=wt.merge(jt),Ct=async()=>{const t=await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");return t.status!==200?Promise.reject(`Failed to fetch top stories res.status:${t.status}`):t.json().then(e=>{const r=xt.safeParse(e);return r.success?r.data:Promise.reject(`Failed to parse top stories json:${e}`)})},_e=async t=>{const e=await fetch(`https://hacker-news.firebaseio.com/v0/item/${t}.json`);return e.status!==200?Promise.reject(`Failed to fetch item ${t} res.status:${e.status}`):e.json().then(r=>{const s=Qt.safeParse(r);return s.success?s.data:Promise.reject(`Failed to parse item itemID:${t} json:${r}`)})},B={maxPageItems:9,maxCommentsPerPage:20,hackerNewsStoryContentAtom:vt({})},Mt=({data:t,page:e})=>{const r=Dt(t.id),[s,o]=Ne(e,B.maxCommentsPerPage,t.kids);return{totalPages:s,originPostData:r,kidsQueries:o}},Pt=({page:t})=>{const e=At(),[r,s]=Ne(t,B.maxPageItems,e.data);return[r,s]},At=()=>ke({queryKey:["topStories"],queryFn:Ct,cacheTime:12*5*60*1e3,staleTime:6*5*60*1e3}),Dt=(t,e=!1)=>ke({queryKey:["item",t],queryFn:()=>_e(t),cacheTime:6*5*60*1e3,staleTime:3*5*60*1e3,suspense:e,enabled:!!t}),Ue=(t=[])=>ft({queries:t.map(e=>({queryKey:["item",e],queryFn:()=>_e(e),cacheTime:6*5*60*1e3,staleTime:3*5*60*1e3}))}),Ne=(t,e,r=[])=>{const s=Math.floor(r.length/e),o=r.length%e,i=o===0?s:s+1;let u=e;t>i?u=0:t==i&&(u=o);const a=r.slice(0,(t-1)*e+u);return[i,Ue(a)]};function Fe(t){if(t===void 0)return"";const e=Date.now();return It(e,t)}function It(t,e){const r=Math.floor(t/1e3-e);let s=r/31536e3;return s>1?Math.floor(s)+" years":(s=r/2592e3,s>1?Math.floor(s)+" months":(s=r/86400,s>1?Math.floor(s)+" days":(s=r/3600,s>1?Math.floor(s)+" hrs":(s=r/60,s>1?Math.floor(s)+" mins":Math.floor(r)+" secs"))))}var kt="Expected a function",be=0/0,Tt="[object Symbol]",Lt=/^\s+|\s+$/g,_t=/^[-+]0x[0-9a-f]+$/i,Ut=/^0b[01]+$/i,Nt=/^0o[0-7]+$/i,Ft=parseInt,Bt=typeof H=="object"&&H&&H.Object===Object&&H,Vt=typeof self=="object"&&self&&self.Object===Object&&self,qt=Bt||Vt||Function("return this")(),Ht=Object.prototype,$t=Ht.toString,Wt=Math.max,zt=Math.min,ee=function(){return qt.Date.now()};function Kt(t,e,r){var s,o,i,u,a,v,d=0,y=!1,c=!1,m=!0;if(typeof t!="function")throw new TypeError(kt);e=Se(e)||0,ie(r)&&(y=!!r.leading,c="maxWait"in r,i=c?Wt(Se(r.maxWait)||0,e):i,m="trailing"in r?!!r.trailing:m);function S(E){var A=s,n=o;return s=o=void 0,d=E,u=t.apply(n,A),u}function j(E){return d=E,a=setTimeout(I,e),y?S(E):u}function D(E){var A=E-v,n=E-d,l=e-A;return c?zt(l,i-n):l}function Q(E){var A=E-v,n=E-d;return v===void 0||A>=e||A<0||c&&n>=i}function I(){var E=ee();if(Q(E))return k(E);a=setTimeout(I,D(E))}function k(E){return a=void 0,m&&s?S(E):(s=o=void 0,u)}function C(){a!==void 0&&clearTimeout(a),d=0,s=v=o=a=void 0}function T(){return a===void 0?u:k(ee())}function L(){var E=ee(),A=Q(E);if(s=arguments,o=this,v=E,A){if(a===void 0)return j(v);if(c)return a=setTimeout(I,e),S(v)}return a===void 0&&(a=setTimeout(I,e)),u}return L.cancel=C,L.flush=T,L}function ie(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function Gt(t){return!!t&&typeof t=="object"}function Jt(t){return typeof t=="symbol"||Gt(t)&&$t.call(t)==Tt}function Se(t){if(typeof t=="number")return t;if(Jt(t))return be;if(ie(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=ie(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(Lt,"");var r=Ut.test(t);return r||Nt.test(t)?Ft(t.slice(2),r?2:8):_t.test(t)?be:+t}var Xt=Kt,Yt=function(e,r,s){return e?Xt(r,e,s):r};function Be(t,e){var r=R.useMemo(function(){var y,c,m,S;return{offset:(y=e==null?void 0:e.offset)!=null?y:0,debounce:(c=e==null?void 0:e.debounce)!=null?c:200,debounceOptions:(m=e==null?void 0:e.debounceOptions)!=null?m:{leading:!0},triggerOnNoScroll:(S=e==null?void 0:e.triggerOnNoScroll)!=null?S:!1}},[e==null?void 0:e.offset,e==null?void 0:e.debounce,e==null?void 0:e.debounceOptions,e==null?void 0:e.triggerOnNoScroll]),s=r.offset,o=r.triggerOnNoScroll,i=r.debounce,u=r.debounceOptions,a=R.useMemo(function(){return Yt(i,t,u)},[i,t]),v=R.useRef(null),d=R.useCallback(function(){if(v.current!=null){var y=v.current,c=Math.round(y.scrollTop+y.clientHeight),m=Math.round(y.scrollHeight-s);m<=c&&a()}else{var S=document.scrollingElement||document.documentElement,j=Math.round(S.scrollTop+window.innerHeight),D=Math.round(S.scrollHeight-s);D<=j&&a()}},[s,t,v.current]);return R.useEffect(function(){var y=v.current;return y!=null?y.addEventListener("scroll",d):window.addEventListener("scroll",d),o&&d(),function(){y!=null?y.removeEventListener("scroll",d):window.removeEventListener("scroll",d)}},[d,i]),v}function Zt(){const[t,e]=R.useState(1),[r,s]=Pt({page:t}),o=Be(()=>{e(i=>i<r?i+1:i)},{offset:20,debounce:300,triggerOnNoScroll:!0});return h.jsxs("div",{ref:o,className:"list-scroller w-full h-full overflow-y-scroll",children:[s.map((i,u)=>h.jsx(er,{item:i},u)),h.jsx("div",{className:"bottom-1 w-full h-[1px]"})]})}function er({item:t}){const e=Le(B.hackerNewsStoryContentAtom)[1],{status:r,error:s,data:o}=t;return r==="loading"?h.jsx("div",{className:"bg-gray-900 text-gray-200 pl-8 pr-2",children:"Item Loading..."}):r==="error"?h.jsxs("div",{children:["Item Error: ",JSON.stringify(s)]}):(o==null?void 0:o.type)==="story"?h.jsx(tr,{item:o,onClick:()=>e(o)}):h.jsx(h.Fragment,{})}function tr(t){const{item:e,onClick:r}=t,s=e.kids;let o=Math.floor(s.length/B.maxCommentsPerPage)+(s.length%B.maxCommentsPerPage>0?1:0);const i=o<=1?"1 page":`${o} pages`;return h.jsxs("div",{className:"bg-gray-900 text-gray-200 pl-8 pr-2 cursor-pointer",onClick:r,children:[h.jsxs("div",{className:"w-full inline-block py-2",children:[h.jsxs("div",{className:"float-left",children:[h.jsxs("span",{className:"text-blue-400",children:[e.by," "]}),h.jsxs("span",{className:"",children:[Fe(e.time)," "]}),h.jsxs("span",{children:["🖒",e.score??""]})]}),h.jsxs("span",{className:"float-right",children:[" ",i]})]}),h.jsx("div",{className:"pb-4 border-b-2 border-gray-200",children:h.jsxs("span",{className:"inline-block w-full text-left text-xl text-gray-100",children:[e.title," ",h.jsx("a",{href:`${e.url}`,target:"_blank",title:`${e.url}`,children:"🔗"})]})})]})}function rr(){const[t,e]=R.useState(1),r=Le(B.hackerNewsStoryContentAtom)[0],{totalPages:s,originPostData:o,kidsQueries:i}=Mt({data:r,page:t}),u=Be(()=>{e(a=>a<s?a+1:a)},{offset:20,debounce:300,triggerOnNoScroll:!0});return h.jsx("div",{ref:u,className:"bg-gray-900 text-gray-200 p-2 h-full overflow-y-scroll",children:h.jsxs("div",{children:[h.jsx(oe,{queryResult:o,floor:1},1),i.map((a,v)=>h.jsx(oe,{queryResult:a,floor:v+2},v+2))]})})}function oe(t){const[e,r]=R.useState(!1),{queryResult:s,floor:o}=t;if(s.status==="loading")return h.jsx("div",{children:"Loading..."});if(s.status==="error")return h.jsxs("div",{children:["Error: ",JSON.stringify(s.error)]});const{by:i,time:u,text:a,kids:v}=s.data;return i===""?h.jsx("div",{}):h.jsxs("div",{className:"bg-gray-800 text-gray-200 px-2 my-2 py-1",children:[h.jsxs("div",{className:"flex",children:[o!=null?h.jsxs("div",{children:["#",o," "]}):h.jsx("div",{}),h.jsx("div",{className:"text-blue-400",children:i})," ",h.jsx("div",{children:Fe(u)}),h.jsx("div",{children:o!=1&&v!=null&&v.length>0&&h.jsx("button",{className:"px-2",onClick:()=>r(!e),children:" ▾"})})]}),h.jsxs("div",{children:[h.jsx("div",{className:"text-left mb-3",dangerouslySetInnerHTML:{__html:a}}),h.jsx("div",{className:"pl-4",children:o!=1&&h.jsx(R.Suspense,{fallback:h.jsx(h.Fragment,{}),children:e&&h.jsx(sr,{kids:v})})})]})]})}function sr({kids:t}){const e=Ue(t);return h.jsx(h.Fragment,{children:e.map((r,s)=>h.jsx(oe,{queryResult:r},s))})}const nr="_sideBarList_7scrz_2",ir={sideBarList:nr};function cr(){const[t,e]=R.useState(!1);return h.jsxs("div",{children:[h.jsx("div",{className:"w-full mb-2",children:h.jsx("div",{className:"cursor-pointer select-none py-2 px-2 text-center border-solid border-2 rounded-md bg-transparent border-violet-500",onClick:()=>e(!t),children:"Toggle Sidebar"})}),h.jsxs("div",{className:"flex w-full h-screen relative overflow-hidden",children:[h.jsx("div",{className:`shrink-0 ${t?"":"absolute left-[-100%]"} ${ir.sideBarList} h-full`,children:h.jsx(Zt,{})}),h.jsx("div",{className:"grow w-full",children:h.jsx(rr,{})})]})]})}export{cr as default};