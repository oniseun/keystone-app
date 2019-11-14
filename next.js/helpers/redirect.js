import Router from 'next/router'

export default (context, target) => {
  if (context.res) {
    
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {

    if(window) {
       window.location.replace(target)
   }
    Router.replace(target)
  }
}
