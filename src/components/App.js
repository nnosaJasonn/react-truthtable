import React from 'react';
import Board from './Board';
import Table from './Table';
class App extends React.Component 
{
    state = { proposition: [], names: [], openCount: 0, closeCount: 0, text: '' }
   handleTruth =(proposition, names, openCount, closeCount, text)=> 
   {
      this.setState({proposition, names, openCount, closeCount, text})
   }
    render() 
    {
        return (
            <div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                    <Board onTruth={this.handleTruth}/>
                    
                    <Table proposition={this.state.proposition} text={this.state.text} closeCount={this.state.closeCount} openCount={this.state.openCount} names={this.state.names}/>
                </div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                </div>
            </div>
        )
    }
}

export default App;