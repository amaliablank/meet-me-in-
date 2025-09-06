import React from 'react'
export default function Layout({children}:{children:React.ReactNode}){ return (<div className="container"><header className="header"><h1>Meet me in</h1></header><main>{children}</main></div>) }
