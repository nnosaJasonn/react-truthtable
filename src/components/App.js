import React from 'react';
import Board from './Board';
import Table from './Table';
class App extends React.Component {
    state = { proposition: [], names: 0 }
   handleTruth =(proposition, names)=> {
        this.setState({proposition, names})
    }
    render() {
        return (
            <div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                    <Board onTruth={this.handleTruth}/>
                    
                </div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                    <Table proposition={this.state.proposition} names={this.state.names}/>
                </div>
            </div>
        )
    }
}

export default App;