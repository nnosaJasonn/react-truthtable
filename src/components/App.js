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
    render() {
        return (
                <div className="ui" style={{marginTop: "10px"}}>
                    <div className="ui message" style={{marginBottom: '20px'}}>
                        <div className="header">
                            <h1>Truth Table!</h1>
                        </div>
                            <p>I built this to begin learning React, but also because I love
                            logic and would like to build a set of tools for learning symbolic logic.
                            </p>
                            <h3>To Dos:</h3>
                            <ul>
                                <li>Refactor to use Hooks and Context</li>
                                <li>Style Style Style</li>
                                <li>Refactor truth evaluation</li>
                                <li>Fix issues with validation (e.g. connective, negation, parentheses next to eachother throw error</li>
                            </ul>
                            
                            <h3>To use:</h3> 
                            <ul>
                                <li>choose a number of names</li>
                                <li>using the buttons provided on the calculator, enter a proposition e.g. ( A & B ) & ~ C</li>
                                <li>Click "Truthify it!!" to generate a table</li>
                            </ul>
                    </div>

                        <Board onTruth={this.handleTruth}/>

                        
                        <Table proposition={this.state.proposition} names={this.state.names}/>
                </div>
                
        )
    }
}

export default App;