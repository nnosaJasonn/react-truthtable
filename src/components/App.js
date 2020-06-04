import React from 'react';
import Board from './Board';
import Table from './Table';
class App extends React.Component 
{
    state = { proposition: [], names: [] }
   handleTruth =(proposition, names)=> 
   {
      this.setState({proposition, names})
   }
    render() 
    {
        return (
            <div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                    <Board onTruth={this.handleTruth}/>
                    
                    <Table proposition={this.state.proposition} names={this.state.names}/>
                </div>
                <div className="ui  centered  container" style={{marginTop: "10px"}}>
                </div>
            </div>
        )
    }
}

export default App;