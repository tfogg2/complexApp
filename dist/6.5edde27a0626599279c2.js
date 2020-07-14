(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{236:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),l=a(21),r=a(19),c=a(4),s=a(8),i=a(5),u=a.n(i),f=a(20),m=a(13);var p=function(e){const{username:t}=Object(c.f)(),[a,l]=Object(o.useState)(!0),[r,i]=Object(o.useState)([]),p=Object(o.useContext)(m.a);return Object(o.useEffect)(()=>{const a=u.a.CancelToken.source();return async function(){try{const o=await u.a.get(`/profile/${t}/${e.action}`,{cancelToken:a.token});i(o.data),l(!1)}catch(e){console.log("There was an error.")}}(),()=>{a.cancel()}},[t,e.action]),a?n.a.createElement(f.a,null):n.a.createElement("div",{className:"list-group"},r.length>0&&r.map((e,t)=>n.a.createElement(s.b,{key:t,to:"/profile/"+e.username,className:"list-group-item list-group-item-action"},n.a.createElement("img",{className:"avatar-tiny",src:e.avatar})," ",e.username)),0==r.length&&p.user.username==t&&n.a.createElement("p",{className:"lead text-muted text-center"},"You don’t have any followers yet."),0==r.length&&p.user.username!=t&&n.a.createElement("p",{className:"lead text-muted text-center"},t," doesn’t have any followers yet.",p.user.loggedIn&&n.a.createElement(n.a.Fragment,null," Be the first to follow them! "),!p.user.loggedIn&&n.a.createElement(n.a.Fragment,null," Create an account to be the first to follow ",t," ")),r.length>1&&!p.user.loggedIn&&n.a.createElement("p",{className:"lead text-muted text-center"},"Create an account to follow ",t))},w=a(85),g=a(15);const d=Object(l.a)(e=>({exampleStyle:{height:e.x}}));t.default=function(){d();const{username:e}=Object(c.f)(),[t,a]=Object(g.a)({followActionLoading:!1,startFollowingRequestCount:0,stopFollowingRequestCount:0,profileData:{profileUsername:"...",profileAvatar:"https://gravatar.com/avatar/placeholder?s=128",isFollowing:"false",counts:{postCount:"",followerCount:"",followingCount:""}}}),l=Object(o.useContext)(m.a);return Object(o.useEffect)(()=>{const t=u.a.CancelToken.source();return async function(){try{const o=await u.a.post("/profile/"+e,{token:l.user.token},{cancelToken:t.token});a(e=>{e.profileData=o.data})}catch(e){console.log("There was a problem.")}}(),()=>{t.cancel()}},[e]),Object(o.useEffect)(()=>{if(t.startFollowingRequestCount){a(e=>{e.followActionLoading=!0});const e=u.a.CancelToken.source();return async function(){try{await u.a.post("/addFollow/"+t.profileData.profileUsername,{token:l.user.token},{cancelToken:e.token});a(e=>{e.profileData.isFollowing=!0,e.profileData.counts.followerCount++,e.followActionLoading=!1})}catch(e){console.log("There was a problem.")}}(),()=>{e.cancel()}}},[t.startFollowingRequestCount]),Object(o.useEffect)(()=>{if(t.stopFollowingRequestCount){a(e=>{e.followActionLoading=!0});const e=u.a.CancelToken.source();return async function(){try{await u.a.post("/removeFollow/"+t.profileData.profileUsername,{token:l.user.token},{cancelToken:e.token});a(e=>{e.profileData.isFollowing=!1,e.profileData.counts.followerCount--,e.followActionLoading=!1})}catch(e){console.log("There was a problem.")}}(),()=>{e.cancel()}}},[t.stopFollowingRequestCount]),n.a.createElement(r.a,{title:"Profile Screen"},n.a.createElement("h2",null,n.a.createElement("img",{className:"avatar-small",src:t.profileData.profileAvatar})," ",t.profileData.profileUsername,l.loggedIn&&!t.profileData.isFollowing&&l.user.username!=t.profileData.profileUsername&&"..."!=t.profileData.profileUsername&&n.a.createElement("button",{onClick:function(){a(e=>{e.startFollowingRequestCount++})},disabled:t.followActionLoading,className:"btn btn-primary btn-sm ml-2"},"Follow ",n.a.createElement("i",{className:"fas fa-user-plus"})),l.loggedIn&&t.profileData.isFollowing&&l.user.username!=t.profileData.profileUsername&&"..."!=t.profileData.profileUsername&&n.a.createElement("button",{onClick:function(){a(e=>{e.stopFollowingRequestCount++})},disabled:t.followActionLoading,className:"btn btn-danger btn-sm ml-2"},"Unfollow ",n.a.createElement("i",{className:"fas fa-user-times"}))),n.a.createElement("div",{className:"profile-nav nav nav-tabs pt-2 mb-4"},n.a.createElement(s.c,{exact:!0,to:"/profile/"+t.profileData.profileUsername,className:"nav-item nav-link"},t.profileData.counts.postCount),n.a.createElement(s.c,{to:`/profile/${t.profileData.profileUsername}/followers`,className:"nav-item nav-link"},t.profileData.counts.followerCount),n.a.createElement(s.c,{to:`/profile/${t.profileData.profileUsername}/following`,className:"nav-item nav-link"},t.profileData.counts.followingCount)),n.a.createElement(c.c,null,n.a.createElement(c.a,{path:"/profile/:username",exact:!0},n.a.createElement(w.a,null)),n.a.createElement(c.a,{path:"/profile/:username/followers"},n.a.createElement(p,{action:"followers",followerCount:t.profileData.counts.followerCount})),n.a.createElement(c.a,{path:"/profile/:username/following"},n.a.createElement(p,{action:"following",followingCount:t.profileData.counts.followerCount}))))}},85:function(e,t,a){"use strict";var o=a(0),n=a.n(o),l=(a(21),a(4)),r=a(20),c=a(5),s=a.n(c),i=a(26);t.a=function(e){const{username:t}=Object(l.f)(),[a,c]=Object(o.useState)(!0),[u,f]=Object(o.useState)([]);return Object(o.useEffect)(()=>{const e=s.a.CancelToken.source();return async function(){try{const a=await s.a.get(`/profile/${t}/posts`,{cancelToken:e.token});f(a.data),c(!1)}catch(e){console.log("There was an error.")}}(),()=>{e.cancel()}},[t]),a?n.a.createElement(r.a,null):n.a.createElement("div",{className:"list-group"},u.map(e=>n.a.createElement(i.a,{noAuthor:!0,post:e,key:e._id})))}}}]);