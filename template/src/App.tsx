import React from "react"
import GlobalStyle from "./style/global"

const App: React.FC<{}> = () => {
  return (
    <>
      <GlobalStyle />
      <div children="App" />
    </>
  )
}

export default App
