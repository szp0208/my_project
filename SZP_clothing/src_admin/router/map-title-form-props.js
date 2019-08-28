import React from 'react'
import Helmet from 'react-helmet'

const mapTitleFromProps = WrappedComponent => props => {
  let definedTitle
  if (typeof props.route.title === 'function') {
    definedTitle = props.route.title(props)
  } else if (typeof props.route.title === 'string') {
    definedTitle = props.route.title
  }

  const title = definedTitle ? `${definedTitle} | Nomos` : 'Nomos'

  return (
      <WrappedComponent {...props}><Helmet title={title} /></WrappedComponent>
  )
}

export default mapTitleFromProps
