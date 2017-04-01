import React from 'react'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    tabs: {
        backgroundColor: '#0d678c',
        textColor: '#FAFAFF',
        selectedTextColor: '#FFF',
    },
    inkBar: {
        backgroundColor: '#ffcb00'
    },

})

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="main-app">
                    <header className="main-header">
                        <Link to="/" className="bold">React GitHub Search API</Link>
                    </header>
                    <main className="main-content">
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App
